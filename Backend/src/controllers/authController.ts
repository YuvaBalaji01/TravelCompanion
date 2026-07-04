import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import db from "../config/db";

import type {
  LoginRequest,
  RegisterRequest,
} from "../types/auth";

import type { User } from "../types/user";

// ================= REGISTER =================

export const register = async (
  req: Request<{}, {}, RegisterRequest>,
  res: Response
): Promise<void> => {
  const { name, email, password, bio } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({
      message: "All required fields must be filled",
    });
    return;
  }

  try {
    const [rows] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    const existingUsers = rows as User[];

    if (existingUsers.length > 0) {
      res.status(409).json({
        message: "Email already registered",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, email, password, bio) VALUES (?, ?, ?, ?)",
      [
        name,
        email,
        hashedPassword,
        bio || null,
      ]
    );

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ================= LOGIN =================

export const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response
): Promise<void> => {

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "Email and password are required",
    });
    return;
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    const users = rows as User[];

    if (users.length === 0) {
      res.status(401).json({
        message: "Invalid credentials",
      });
      return;
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      res.status(401).json({
        message: "Invalid credentials",
      });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};