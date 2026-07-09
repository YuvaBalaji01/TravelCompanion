import type { User } from "./user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface ErrorResponse {
  message: string;
}