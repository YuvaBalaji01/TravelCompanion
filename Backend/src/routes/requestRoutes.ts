import { Router } from "express";
import { sendConnectionRequest,acceptRequest,getConnections,rejectRequest,getIncomingRequests,getOutgoingRequests } from "../controllers/requestController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post( "/", authMiddleware, sendConnectionRequest);
router.get("/incoming",authMiddleware,getIncomingRequests);
router.get("/outgoing",authMiddleware,getOutgoingRequests);
router.put("/:id/accept", authMiddleware, acceptRequest);
router.put("/:id/reject", authMiddleware, rejectRequest);
router.get("/connections",authMiddleware,getConnections);

export default router;