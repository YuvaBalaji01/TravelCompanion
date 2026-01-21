const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { addTrip, getMyTrips, searchTrips } = require("../controllers/tripController");

router.post("/add", auth, addTrip);       // protected
router.get("/my", auth, getMyTrips);      // protected
router.post("/search", auth, searchTrips); // protected

module.exports = router;
