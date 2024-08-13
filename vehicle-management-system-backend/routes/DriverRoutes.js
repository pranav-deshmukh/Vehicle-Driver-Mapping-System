const express = require("express");
const driverController = require("../controllers/DriverController");

const router = express.Router();

router.post("/createDriver", driverController.createDriver);
router.get("/getDrivers", driverController.getDrivers);

module.exports = router;
