import { z } from "zod";

export const ICountrySchema = z.object({
    id: z.number().int(),
    name: z.string().max(256),
    capital: z.string().max(256),
    size: z.number().int().min(0),
    population: z.number().int().min(0)
})

export const ICountryCreateSchema = z.object({
    name: z.string().max(256),
    capital: z.string().max(256),
    size: z.number().int().min(0),
    population: z.number().int().min(0)
})

export type ICountry = z.infer<typeof ICountrySchema>;

export type ICountryRO = Readonly<ICountry>;

export type ICountryCreate = Omit<ICountry, 'id'>;

export type ICountryUpdate = Partial<ICountryCreate>;