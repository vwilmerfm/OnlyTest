import { z } from 'zod';

const userRegistrationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const userLoginSchema = z.object({
  usuario: z.string(),
  contrasenia: z.string().min(2),
});

export function validateUser(input) {
  return userLoginSchema.safeParse(input)
}
export function validatePartial(input) {
  return userLoginSchema.partial().safeParse(input)
}