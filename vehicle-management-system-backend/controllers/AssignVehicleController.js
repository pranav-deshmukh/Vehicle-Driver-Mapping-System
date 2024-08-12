const Driver = require("../models/DriverModel");
const Vehicle = require("../models/VehicleModel");

exports.assignDriverToVehicle = async (req, res) => {
  try {
    const { driverId, vehicleId } = req.body;

    const driver = await Driver.findOne({ driverId });
    if (!driver) {
      return res
        .status(404)
        .json({ status: "fail", message: "Driver not found" });
    }

    const vehicle = await Vehicle.findOne({ vehicleId });
    if (!vehicle) {
      return res
        .status(404)
        .json({ status: "fail", message: "Vehicle not found" });
    }

    if (driver.vehicle) {
      return res.status(400).json({
        status: "fail",
        message: "Driver is already assigned to a vehicle",
      });
    }

    if (vehicle.driver) {
      return res.status(400).json({
        status: "fail",
        message: "Vehicle is already assigned to a driver",
      });
    }

    driver.vehicle = vehicle._id;
    vehicle.driver = driver._id;

    await driver.save();
    await vehicle.save();

    res.status(200).json({
      status: "success",
      data: {
        driver,
        vehicle,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.unassignDriverFromVehicle = async (req, res) => {
  try {
    const { driverId } = req.body;

    const driver = await Driver.findOne({ driverId });
    if (!driver || !driver.vehicle) {
      return res.status(404).json({
        status: "fail",
        message: "Driver is not assigned to any vehicle",
      });
    }

    const vehicle = await Vehicle.findById(driver.vehicle);
    if (!vehicle) {
      return res
        .status(404)
        .json({ status: "fail", message: "Vehicle not found" });
    }

    driver.vehicle = null;
    vehicle.driver = null;

    await driver.save();
    await vehicle.save();

    res.status(200).json({
      status: "success",
      message: "Driver unassigned from vehicle successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
