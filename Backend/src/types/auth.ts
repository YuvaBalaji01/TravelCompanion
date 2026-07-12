export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export interface JwtUser {
  id: number;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}