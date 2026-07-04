export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}