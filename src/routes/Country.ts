import { NextFunction, Router } from "express";
import { OkPacket, RowDataPacket } from 'mysql2';
import { ICountry, ICountryCreate, ICountryCreateSchema, ICountryRO } from "../model/ICountry";
import { ICreateResponse } from '../types/ICreateResponse';
import { IDeleteResponse } from "../types/IDeleteResponse";
import { IIndexQuery, IIndexResponse, ITableCount } from '../types/IIndexQuery';
import { IUpdateResponse } from "../types/IUpdateResponse";
import { DB } from '../utility/DB';
import { CountryController } from "../controllers/CountryController";
import { ApiError } from "../utility/Error/ApiError";
import { ErrorCode } from "../utility/Error/ErrorCode";


/// Pour tous les endpoints /
/// GET /
/// POST /

const routerIndex = Router({ mergeParams: true });

routerIndex.get<{}, IIndexResponse<ICountryRO>, {}, IIndexQuery>('/',
  async (request, response, next: NextFunction) => {

    try {

      const db = DB.Connection;

      // On suppose que le params query sont en format string, et potentiellement
      // non-numérique, ou corrompu
      const page = parseInt(request.query.page || "0") || 0;
      const limit = parseInt(request.query.limit || "10") || 0;
      const offset = page * limit;

      // D'abord, récupérer le nombre total
      const count = await db.query<ITableCount[] & RowDataPacket[]>("select count(*) as total from COUNTRY");

      // Récupérer les lignes
      const data = await db.query<ICountryRO[] & RowDataPacket[]>("select id, name, capital, size, population from COUNTRY limit ? offset ?", [limit, offset]);

      // Construire la réponse
      const res: IIndexResponse<ICountryRO> = {
        page,
        limit,
        total: count[0][0].total,
        rows: data[0]
      }

      response.json(res);

    } catch (err: any) {
      next(err);
    }

  }
);


routerIndex.post<{}, ICreateResponse, ICountryCreate>('',
  async (request, response, next: NextFunction) => {

    try {
      const country = request.body;

      // ATTENTION ! Et si les données dans country ne sont pas valables ?
      // - colonnes qui n'existent pas ?
      // - données pas en bon format ?

      const parse = ICountryCreateSchema.safeParse(country);

      if(!parse.success) {
        throw new ApiError(ErrorCode.BadRequest, "validation/failed", "Invalid format")
      }

      const countryDB = new CountryController();

      const data = await countryDB.insert(country)

      response.json({
        id: data[0].insertId
      });

    } catch (err: any) {
      next(err);
    }

  }
);

/// Pour tous les endpoints /:countryId
/// GET /:countryId
/// PUT /:countryId
/// DELETE /:countryId

const routerSingle = Router({ mergeParams: true });

routerSingle.get<{ id_country: string }, ICountryRO, {}>('',
  async (request, response, next: NextFunction) => {

    try {
      const param = request.params.id_country;

      const countryId = Number(param);

      if(typeof countryId !== "number" || !Number.isInteger(countryId)) {
        throw new ApiError(ErrorCode.BadRequest, "validation/failed", "Param should be an integer")
      }

      const countryDB = new CountryController();

      const data = await countryDB.getById(countryId);

      const res = data[0][0];

      response.json(res);

    } catch (err: any) {
      next(err);
    }

  }
);

routerSingle.put<{ id_country: string }, IUpdateResponse, ICountry>('',
  async (request, response, next: NextFunction) => {
    try {
      // ATTENTION ! Valider que le countryId est valable ?
      const countryId = request.params.id_country;
      const body = request.body;

      const db = DB.Connection;
      // Récupérer les lignes
      const data = await db.query<OkPacket>(`update COUNTRY set ? where id = ?`, [body, countryId]);

      // Construire la réponse
      const res = {
        id: countryId,
        rows: data[0].affectedRows
      }

      response.json(res);

    } catch (err: any) {
      next(err);
    }
  }
);

routerSingle.delete<{ id_country: string }, IDeleteResponse, {}>('',
  async (request, response, next: NextFunction) => {
    try {
      // ATTENTION ! Valider que le countryId est valable ?
      const countryId = request.params.id_country;
      const db = DB.Connection;

      // Récupérer les lignes
      const data = await db.query<OkPacket>(`delete from COUNTRY where id = ?`, [countryId]);

      // Construire la réponse
      const res = {
        id: countryId,
        rows: data[0].affectedRows
      }

      response.json(res);

    } catch (err: any) {
      next(err);
    }
  }
);


/// Rassembler les 2 sous-routes 
const routerUser = Router({ mergeParams: true });
routerUser.use(routerIndex);
routerUser.use('/:id_country', routerSingle);

export const ROUTES_COUNTRY = routerUser;