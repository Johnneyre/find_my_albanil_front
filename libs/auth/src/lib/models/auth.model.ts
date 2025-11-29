export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id_user: number;
  nombre_completo: string;
  token: string;
}

export interface PasswordRecoveryRequest {
  email: string;
}

export interface PasswordRecoveryResponse {
  message: string;
  success: boolean;
}
