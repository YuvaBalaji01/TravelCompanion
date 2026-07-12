import { Router } from "express";
import { sendConnectionRequest,getIncomingRequests,getOutgoingRequests } from "../controllers/requestController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post( "/", authMiddleware, sendConnectionRequest);
router.get("/incoming",authMiddleware,getIncomingRequests);
router.get("/outgoing",authMiddleware,getOutgoingRequests);

export default router;