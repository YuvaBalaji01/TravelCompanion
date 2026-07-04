import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import type { LoginResponse, ErrorResponse } from "../types/auth";


const Login = (): React.JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      const res = await API.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      alert(err.response?.data?.message ?? "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

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