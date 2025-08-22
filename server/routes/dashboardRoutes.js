const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// definisi route pakai controller
router.get("/summary", dashboardController.getSummary);
router.get("/series", dashboardController.getSeries);

module.exports = router;
