import { z } from 'zod';

/**
 * Esquema de validación para el formulario de login
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El correo electrónico es requerido')
    .email('Ingresa un correo electrónico válido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

/**
 * Esquema de validación para recuperación de contraseña
 */
export const passwordRecoverySchema = z.object({
  email: z
    .string()
    .min(1, 'El correo electrónico es requerido')
    .email('Ingresa un correo electrónico válido'),
});

/**
 * Tipos inferidos de los esquemas
 */
export type LoginFormData = z.infer<typeof loginSchema>;
export type PasswordRecoveryFormData = z.infer<typeof passwordRecoverySchema>;
