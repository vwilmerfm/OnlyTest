import { z } from "zod";

const adminRegistroShema = z.object({
  adm_login: z.string(),
  adm_pass: z.string(),
  rol_id: z.number()
});

export function validacionAdmin(input) {
  return adminRegistroShema.safeParse(input);
}
export function validacionParcial(input) {
  return adminRegistroShema.partial().safeParse(input);
}
