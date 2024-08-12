const express = require("express");
const driverRouter = require("./routes/DriverRoutes");
const vehicleRouter = require("./routes/VehicleRoutes");
const AssignVehicleRouter = require("./routes/AssignVehicleRoutes");

const app = express();

app.use(express.json());
app.use("/api/v1/manager", driverRouter);
app.use("/api/v1/manager", vehicleRouter);
app.use("/api/v1/manager", AssignVehicleRouter);
module.exports = app;
