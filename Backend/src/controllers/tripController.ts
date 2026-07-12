import { Request, Response } from "express";

import db from "../config/db";

import type {
  Trip,
  SearchTripResult,
  CreateTripRequest,
  UpdateTripRequest,
} from "../types/trip";

interface JwtUser {
  id: number;
  email: string;
}

// ================= CREATE TRIP =================

export const addTrip = async (
  req: Request<{}, {}, CreateTripRequest>,
  res: Response
): Promise<void> => {
  const user = req.user as JwtUser;

  const {
    destination,
    start_date,
    end_date,
    description,
  } = req.body;

  if (!destination || !start_date || !end_date) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }

  try {
    await db.query(
      `
      INSERT INTO trips
      (user_id, destination, start_date, end_date, description)
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        user.id,
        destination,
        start_date,
        end_date,
        description ?? null,
      ]
    );

    res.status(201).json({
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
      `
      SELECT *
      FROM trips
      WHERE user_id = ?
      ORDER BY start_date ASC
      `,
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

// ================= UPDATE TRIP =================

export const updateTrip = async (
  req: Request<{ id: string }, {}, UpdateTripRequest>,
  res: Response
): Promise<void> => {

  const user = req.user as JwtUser;

  const tripId = Number(req.params.id);

  const {
    destination,
    start_date,
    end_date,
    description,
  } = req.body;

  if (!destination || !start_date || !end_date) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }

  try {

    const [result] = await db.query(
      `
      UPDATE trips
      SET
        destination = ?,
        start_date = ?,
        end_date = ?,
        description = ?
      WHERE
        id = ?
        AND user_id = ?
      `,
      [
        destination,
        start_date,
        end_date,
        description ?? null,
        tripId,
        user.id,
      ]
    );

    res.json({
      message: "Trip updated successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }
};

//-- Delete trip ---

export const deleteTrip = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const user = req.user as JwtUser;
  const tripId = Number(req.params.id);

  try {
    await db.query(
      `
      DELETE FROM trips
      WHERE id = ?
      AND user_id = ?
      `,
      [tripId, user.id]
    );

    res.json({
      message: "Trip deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ================= SEARCH TRIPS =================

export const searchTrips = async (
  req: Request<{}, {}, CreateTripRequest>,
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
          t.id AS trip_id,
          u.id AS user_id,
          u.name,
          u.email,
          u.bio,
          t.destination,
          t.start_date,
          t.end_date
      FROM trips t
      INNER JOIN users u
        ON u.id = t.user_id
      WHERE
        t.destination = ?
        AND t.user_id <> ?
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


//--find Companion ---

export const findCompanions = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {

  const user = req.user as JwtUser;
  const tripId = Number(req.params.id);

  try {

    // Fetch the selected trip
    const [tripRows] = await db.query(
      `
      SELECT *
      FROM trips
      WHERE id = ?
      AND user_id = ?
      `,
      [tripId, user.id]
    );

    const trips = tripRows as Trip[];

    if (trips.length === 0) {
      res.status(404).json({
        message: "Trip not found",
      });
      return;
    }

    const trip = trips[0];

    // Find matching companions
    const [rows] = await db.query(
      `
      SELECT
      t.id AS trip_id,
      u.id AS user_id,
      u.name,
      u.email,
      u.bio,
      t.destination,
      t.start_date,
      t.end_date
      FROM trips t
      INNER JOIN users u
        ON u.id = t.user_id
      WHERE
        t.destination = ?
        AND t.user_id <> ?
        AND t.start_date <= ?
        AND t.end_date >= ?
      `,
      [
        trip.destination,
        user.id,
        trip.end_date,
        trip.start_date,
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