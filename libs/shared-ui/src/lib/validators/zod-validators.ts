import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ZodSchema, ZodError } from 'zod';

/**
 * Convierte un esquema de Zod en un Angular ValidatorFn
 * @param schema - Esquema de Zod para validación
 * @returns ValidatorFn compatible con Angular Reactive Forms
 */
export function zodValidator(schema: ZodSchema): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    try {
      schema.parse(control.value);
      return null;
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: ValidationErrors = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          errors[path || 'unknown'] = err.message;
        });
        return errors;
      }
      return { zodError: 'Validation failed' };
    }
  };
}

/**
 * Valida un campo individual del formulario con un esquema Zod
 * @param schema - Esquema de Zod para el campo
 * @returns ValidatorFn para el campo específico
 */
export function zodFieldValidator(schema: ZodSchema): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    try {
      schema.parse(control.value);
      return null;
    } catch (error) {
      if (error instanceof ZodError) {
        // Retorna el primer error encontrado
        const firstError = error.errors[0];
        return { [firstError.code]: firstError.message };
      }
      return { validation: 'Invalid value' };
    }
  };
}

/**
 * Obtiene el mensaje de error de un control validado con Zod
 * @param control - AbstractControl de Angular
 * @returns Mensaje de error o null
 */
export function getZodErrorMessage(control: AbstractControl): string | null {
  if (!control.errors) {
    return null;
  }

  // Busca el primer error que tenga un mensaje
  const errorKey = Object.keys(control.errors)[0];
  return control.errors[errorKey] || null;
}

/**
 * Crea una configuración de FormControl para Angular con validación Zod
 * @param schema - Esquema de Zod para el campo
 * @param initialValue - Valor inicial del campo (por defecto '')
 * @returns Configuración del FormControl
 */
export function createZodControl(schema: ZodSchema, initialValue: any = '') {
  return [
    initialValue,
    {
      validators: zodFieldValidator(schema),
      updateOn: 'change',
    },
  ];
}
