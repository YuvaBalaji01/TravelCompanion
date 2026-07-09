import API from "./api";

import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
} from "../types/auth";

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {

  const res = await API.post<LoginResponse>(
    "/auth/login",
    credentials
  );

  return res.data;
};

export const register = async (
  user: RegisterRequest
): Promise<{ message: string }> => {

  const res = await API.post<{ message: string }>(
    "/auth/register",
    user
  );

  return res.data;
};