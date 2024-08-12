const express = require("express");
const driverRouter = require("./routes/DriverRoutes");
const vehicleRouter = require("./routes/VehicleRoutes");
const AssignVehicleRouter = require("./routes/AssignVehicleRoutes");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(express.json());
app.use("/api/v1/manager", driverRouter);
app.use("/api/v1/manager", vehicleRouter);
app.use("/api/v1/manager", AssignVehicleRouter);
module.exports = app;
