const db = require("../config/db");

// ADD TRIP
exports.addTrip = async (req, res) => {
    const userId = req.user.id;
    const { destination, start_date, end_date } = req.body;

    if (!destination || !start_date || !end_date) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await db.promise().query(
            `INSERT INTO trips (user_id, destination, start_date, end_date) 
             VALUES (?, ?, ?, ?)`,
            [userId, destination, start_date, end_date]
        );

        res.json({ message: "Trip added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

// GET MY TRIPS
exports.getMyTrips = async (req, res) => {
    const userId = req.user.id;

    try {
        const [trips] = await db.promise().query(
            "SELECT * FROM trips WHERE user_id = ?",
            [userId]
        );

        res.json(trips);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

// SEARCH FOR COMPANIONS
exports.searchTrips = async (req, res) => {
    const userId = req.user.id;
    const { destination, start_date, end_date } = req.body;

    if (!destination || !start_date || !end_date) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const [results] = await db.promise().query(
            `
            SELECT u.id, u.name, u.email, u.bio, t.start_date, t.end_date
            FROM trips t
            JOIN users u ON u.id = t.user_id
            WHERE t.destination = ?
              AND t.user_id != ?
              AND t.start_date <= ?
              AND t.end_date >= ?
            `,
            [destination, userId, end_date, start_date]
        );

        res.json(results);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
