const express = require("express");
const router = express.Router();
const vehicleDriverController = require("../controllers/AssignVehicleController");
const requestController = require("../controllers/RequestController");
const { request } = require("../app");

router.post("/assign", vehicleDriverController.assignDriverToVehicle);
router.post("/unassign", vehicleDriverController.unassignDriverFromVehicle);
router.post(
  "/assign-with-schedule",
  vehicleDriverController.assignDriverToVehicle
);
router.post(
  "/sendAssignmentRequest",
  requestController.assignOrRequestDriverToVehicle
);
router.post("/respondToRequest", requestController.respondToRequest);
router.post("/getPendingRequests", requestController.getPendingRequests);

module.exports = router;
