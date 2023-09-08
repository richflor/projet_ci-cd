import { z } from "zod";

export type BinaryConverterResponse = {
    integer:number,
    binary:string
}

export const numberToConvertSchema = z.object({
    number: z.number().int().min(0),
})


export type numberToConvert = z.infer<typeof numberToConvertSchema>;

export type numberToConvertRO = Readonly<numberToConvert>;