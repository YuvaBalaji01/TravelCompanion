import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware";

import {
  addTrip,
  getMyTrips,
  searchTrips,
} from "../controllers/tripController";

const router = Router();

router.post("/add", authMiddleware, addTrip);

router.get("/my", authMiddleware, getMyTrips);

router.post("/search", authMiddleware, searchTrips);

export default router;