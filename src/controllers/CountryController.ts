import { OkPacket, RowDataPacket } from 'mysql2';
import { ICountry, ICountryCreate, ICountryRO } from "../model/ICountry";
import { ICreateResponse } from '../types/ICreateResponse';
import { IDeleteResponse } from "../types/IDeleteResponse";
import { IIndexQuery, IIndexResponse, ITableCount } from '../types/IIndexQuery';
import { IUpdateResponse } from "../types/IUpdateResponse";
import { DB } from '../utility/DB';
import { Pool } from 'mysql2/promise';

export class CountryController {

    private db:Pool;

    constructor() {
        this.db = DB.Connection;
    }

    async insert(country:ICountryCreate) {
        const data = await this.db.query<OkPacket>("insert into COUNTRY set ?", country);
        return data;
    }

    async getById(id:number){
        const data = await this.db.query<ICountryRO[] & RowDataPacket[]>("select id, name, capital, size, population from COUNTRY where id = ?", [id]);
        return data;
    }
}