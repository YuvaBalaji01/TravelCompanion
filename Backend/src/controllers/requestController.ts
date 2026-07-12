import { Request, Response } from "express";
import db from "../config/db";
import { JwtUser } from "../types/auth";
import { SendConnectionRequest,IncomingRequest,OutgoingRequest  } from "../types/request";

export const sendConnectionRequest = async (
  req: Request<{}, {}, SendConnectionRequest>,
  res: Response
): Promise<void> => {

  const sender = req.user as JwtUser;

  const {
    tripId,
    receiverId,
  } = req.body;

  if (!tripId || !receiverId) {
    res.status(400).json({
      message: "Missing required fields",
    });
    return;
  }

  if (sender.id === receiverId) {
    res.status(400).json({
      message: "You cannot connect with yourself",
    });
    return;
  }

  try {

    // Already sent?
    const [existing] = await db.query(
      `
      SELECT id
      FROM connection_requests
      WHERE
          trip_id = ?
          AND sender_id = ?
          AND receiver_id = ?
      `,
      [
        tripId,
        sender.id,
        receiverId,
      ]
    );

    if ((existing as any[]).length > 0) {
      res.status(409).json({
        message: "Request already sent",
      });
      return;
    }

    // Insert request
    await db.query(
      `
      INSERT INTO connection_requests
      (
          trip_id,
          sender_id,
          receiver_id
      )
      VALUES (?, ?, ?)
      `,
      [
        tripId,
        sender.id,
        receiverId,
      ]
    );

    res.status(201).json({
      message: "Connection request sent successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};

export const getIncomingRequests = async (
  req: Request,
  res: Response
): Promise<void> => {

  const user = req.user as JwtUser;

  try {

    const [rows] = await db.query(
      `
      SELECT
          cr.id,
          cr.trip_id,
          cr.status,
          cr.created_at,

          u.id AS sender_id,
          u.name AS sender_name,
          u.email AS sender_email,
          u.bio,

          t.destination,
          t.start_date,
          t.end_date

      FROM connection_requests cr

      INNER JOIN users u
          ON cr.sender_id = u.id

      INNER JOIN trips t
          ON cr.trip_id = t.id

      WHERE cr.receiver_id = ?

      ORDER BY cr.created_at DESC
      `,
      [user.id]
    );

    const requests = rows as IncomingRequest[];

    res.json(requests);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};

export const getOutgoingRequests = async (
  req: Request,
  res: Response
): Promise<void> => {

  const user = req.user as JwtUser;

  try {

    const [rows] = await db.query(
      `
      SELECT
          cr.id,
          cr.trip_id,
          cr.status,
          cr.created_at,

          u.id AS receiver_id,
          u.name AS receiver_name,
          u.email AS receiver_email,
          u.bio,

          t.destination,
          t.start_date,
          t.end_date

      FROM connection_requests cr

      INNER JOIN users u
          ON cr.receiver_id = u.id

      INNER JOIN trips t
          ON cr.trip_id = t.id

      WHERE cr.sender_id = ?

      ORDER BY cr.created_at DESC
      `,
      [user.id]
    );

    const requests = rows as OutgoingRequest[];

    res.json(requests);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }

};