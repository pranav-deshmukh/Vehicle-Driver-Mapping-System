const Vehicle = require("../models/VehicleModel");

exports.createVehicle = async (req, res) => {
  try {
    const newVehicle = await Vehicle.create({
      vehicleId: req.body.vehicleId,
      makeAndModel: req.body.makeAndModel,
      licensePlate: req.body.licensePlate,
    });

    res.status(201).json({
      status: "success",
      data: {
        vehicle: newVehicle,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.status(200).json({
      status: "success",
      results: vehicles.length,
      data: {
        vehicles,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
