import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import type { LoginResponse, ErrorResponse } from "../types/auth";
import "../styles/login.css";

const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const res = await API.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      alert(err.response?.data?.message ?? "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-glow" />
      <form className="auth-box" onSubmit={handleLogin}>
        <div className="auth-header">
          <h2>Welcome back</h2>
          <p className="auth-subtitle">Log in to continue</p>
        </div>

        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="auth-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="auth-submit" disabled={isLoading}>
          {isLoading ? (
            <span className="auth-spinner" aria-hidden="true" />
          ) : (
            "Login"
          )}
        </button>

        <p className="auth-switch">
          New user?{" "}
          <span onClick={() => navigate("/register")}>
            Create an account
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;