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
