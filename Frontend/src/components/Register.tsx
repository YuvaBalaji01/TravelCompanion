import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

import API from "../services/api";
import type { RegisterRequest, ErrorResponse } from "../types/auth";

const Register = (): React.JSX.Element => {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterRequest>({
    name: "",
    email: "",
    password: "",
    bio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);

      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;

      alert(err.response?.data?.message ?? "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleRegister}>
        <h2>Create Account</h2>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <textarea
          name="bio"
          placeholder="Short Bio (optional)"
          value={form.bio}
          onChange={handleChange}
          rows={3}
        />

        <button type="submit">Sign Up</button>

        <p className="auth-switch">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Register;