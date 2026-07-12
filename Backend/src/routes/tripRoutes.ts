import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware";

import {
  addTrip,
  getMyTrips,
  //searchTrips,
  updateTrip,
  deleteTrip,
  findCompanions,
} from "../controllers/tripController";

const router = Router();

router.post("/add", authMiddleware, addTrip);
router.get("/my", authMiddleware, getMyTrips);
// router.post("/search", authMiddleware, searchTrips);
router.put("/:id", authMiddleware, updateTrip);
router.delete("/:id", authMiddleware, deleteTrip);
router.get("/:id/matches", authMiddleware, findCompanions);

export default router;