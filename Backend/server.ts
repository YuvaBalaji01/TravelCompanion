import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import "./src/config/db";

import authRoutes from "./src/routes/authRoutes";
import tripRoutes from "./src/routes/tripRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});