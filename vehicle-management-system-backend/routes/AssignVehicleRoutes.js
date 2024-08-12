const express = require("express");
const router = express.Router();
const vehicleDriverController = require("../controllers/AssignVehicleController");

router.post("/assign", vehicleDriverController.assignDriverToVehicle);
router.post("/unassign", vehicleDriverController.unassignDriverFromVehicle);

module.exports = router;
