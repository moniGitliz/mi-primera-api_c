import { z } from "zod";

export const CrearPlatoEsquema = z.object({
  nombrePlato: z
    .string()
    .nonempty("El nombre del plato es obligatorio")
    .min(5)
    .max(20),
  ingredienteAdicional: z
    .string()
    .optional()
    .transform((val) => val ?? null),
});

export type PlatoDTO = z.infer<typeof CrearPlatoEsquema>;
