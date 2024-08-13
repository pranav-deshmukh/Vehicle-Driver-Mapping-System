const express = require("express");
const vehicleController = require("../controllers/VehicleController");

const router = express.Router();

router.post("/registerVehicle", vehicleController.createVehicle);
router.get("/getVehicles", vehicleController.getVehicles);

module.exports = router;
