import { NextFunction, Router } from "express";
import { ApiError } from "../utility/Error/ApiError";
import { ErrorCode } from "../utility/Error/ErrorCode";
import { BinaryConverterResponse, numberToConvertRO, numberToConvertSchema } from "../model/BinaryConverter";
import { convertToBinary } from "../formula/BinaryConverter";

const routerBinaryConverter = Router({ mergeParams: true });

routerBinaryConverter.post<{}, BinaryConverterResponse, numberToConvertRO>("",
async (request, response, next: NextFunction) => {

    try {
        
        const numberToConvert = request.body
        const parse = numberToConvertSchema.safeParse(numberToConvert);

        if(!parse.success) {
            throw new ApiError(ErrorCode.BadRequest, "validation/failed", "Format is wrong, can only convert a positive integer into a binary")
        }

        const res:BinaryConverterResponse = {
            integer: numberToConvert.number,
            binary: convertToBinary(numberToConvert.number)
        }

        response.json(res);

    }   catch (err: any) {
        next(err);
    }

  }
)

export const ROUTE_BIN_CONVERTER = routerBinaryConverter;