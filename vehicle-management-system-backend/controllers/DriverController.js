const Driver = require("../models/DriverModel");

exports.createDriver = async (req, res) => {
  try {
    const newDriver = await Driver.create({
      driverId: req.body.driverId,
      driverName: req.body.driverName,
      driverEmail: req.body.driverEmail,
      phone: req.body.phone,
      location: req.body.location,
      workHours: req.body.workHours,
    });

    res.status(201).json({
      status: "success",
      message: "driver created successfully",
      data: {
        driver: newDriver,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({});

    res.status(200).json({
      status: "success",
      results: drivers.length,
      data: {
        drivers,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
