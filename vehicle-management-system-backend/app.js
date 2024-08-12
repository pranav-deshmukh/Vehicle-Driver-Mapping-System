const express = require("express");
const driverRouter = require("./routes/DriverRoutes");

const app = express();

app.use(express.json());
app.use("/api/v1/manager", driverRouter);
module.exports = app;
