import { Request, Response } from "express";

import db from "../config/db";

import type { Trip, SearchTripResult, AddTripRequest } from "../types/trip";

interface JwtUser {
  id: number;
  email: string;
}

// ================= ADD TRIP =================

export const addTrip = async (
  req: Request<{}, {}, AddTripRequest>,
  res: Response
): Promise<void> => {
  const user = req.user as JwtUser;

  const { destination, start_date, end_date } = req.body;

  if (!destination || !start_date || !end_date) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }

  try {
    await db.query(
      `INSERT INTO trips
      (user_id, destination, start_date, end_date)
      VALUES (?, ?, ?, ?)`,
      [
        user.id,
        destination,
        start_date,
        end_date,
      ]
    );

    res.json({
      message: "Trip added successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ================= GET MY TRIPS =================

export const getMyTrips = async (
  req: Request,
  res: Response
): Promise<void> => {

  const user = req.user as JwtUser;

  try {
    const [rows] = await db.query(
      "SELECT * FROM trips WHERE user_id = ?",
      [user.id]
    );

    const trips = rows as Trip[];

    res.json(trips);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ================= SEARCH TRIPS =================

export const searchTrips = async (
  req: Request<{}, {}, AddTripRequest>,
  res: Response
): Promise<void> => {

  const user = req.user as JwtUser;

  const {
    destination,
    start_date,
    end_date,
  } = req.body;

  if (!destination || !start_date || !end_date) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }

  try {
    const [rows] = await db.query(
      `
      SELECT
        u.id,
        u.name,
        u.email,
        u.bio,
        t.start_date,
        t.end_date
      FROM trips t
      JOIN users u
        ON u.id = t.user_id
      WHERE t.destination = ?
        AND t.user_id != ?
        AND t.start_date <= ?
        AND t.end_date >= ?
      `,
      [
        destination,
        user.id,
        end_date,
        start_date,
      ]
    );

    const results = rows as SearchTripResult[];

    res.json(results);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};