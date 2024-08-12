const express = require("express");
const router = express.Router();
const vehicleDriverController = require("../controllers/AssignVehicleController");

router.post("/assign", vehicleDriverController.assignDriverToVehicle);
router.post("/unassign", vehicleDriverController.unassignDriverFromVehicle);
router.post(
  "/assign-with-schedule",
  vehicleDriverController.assignDriverToVehicle
);

module.exports = router;
