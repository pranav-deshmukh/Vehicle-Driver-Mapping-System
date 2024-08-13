const Driver = require("../models/DriverModel");
const Vehicle = require("../models/VehicleModel");

exports.assignOrRequestDriverToVehicle = async (req, res) => {
  try {
    const { driverId, vehicleId, startTime, endTime } = req.body;

    // Find the driver by driverId
    const driver = await Driver.findOne({ driverId });
    if (!driver) {
      return res
        .status(404)
        .json({ status: "fail", message: "Driver not found" });
    }

    // Find the vehicle by vehicleId
    const vehicle = await Vehicle.findOne({ vehicleId });
    if (!vehicle) {
      return res
        .status(404)
        .json({ status: "fail", message: "Vehicle not found" });
    }

    // Convert the provided times to Date objects
    const newStartTime = new Date(startTime);
    const newEndTime = new Date(endTime);

    // Check for schedule conflicts
    if (hasConflict(driver.schedule, newStartTime, newEndTime)) {
      // If a conflict exists, create an assignment request instead
      await Driver.updateOne(
        { driverId },
        {
          $push: {
            assignmentRequests: {
              vehicleId,
              startTime: newStartTime,
              endTime: newEndTime,
            },
          },
        }
      );

      return res.status(400).json({
        status: "fail",
        message:
          "Driver is already assigned to another vehicle during this time period. Assignment request has been created.",
      });
    }

    // Assign the driver to the vehicle if no conflict exists
    await Driver.updateOne(
      { driverId },
      {
        $push: {
          assignmentRequests: {
            vehicleId,
            startTime: newStartTime,
            endTime: newEndTime,
          },
        },
      }
    );
    // driver.schedule.push({
    //   vehicle: vehicle._id,
    //   startTime: newStartTime,
    //   endTime: newEndTime,
    // });

    await driver.save();

    res.status(200).json({
      status: "success",
      data: {
        driver,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Function to check for schedule conflicts
const hasConflict = (schedule, newStartTime, newEndTime) => {
  return schedule.some(
    (slot) => newStartTime < slot.endTime && newEndTime > slot.startTime
  );
};

exports.getPendingRequests = async (req, res, next) => {
  try {
    const driver = await Driver.findOne({ driverId: req.body.driverId });

    if (!driver) {
      return res.status(404).json({
        status: "fail",
        message: "Driver not found",
      });
    }

    const pendingRequests = driver.assignmentRequests.filter(
      (request) => request.status === "pending"
    );

    res.status(200).json({
      status: "success",
      data: {
        pendingRequests,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
    next();
  }
};

exports.respondToRequest = async (req, res, next) => {
  try {
    const { vehicleId, response, driverId } = req.body;

    const driver = await Driver.findOne({ driverId });
    console.log(response);

    if (response === "accepted") {
      await Driver.updateMany(
        { "assignmentRequests.vehicleId": vehicleId },
        { $set: { "assignmentRequests.$.status": "rejected" } }
      );

      const requestIndex = driver.assignmentRequests.findIndex(
        (req) => req.vehicleId.toString() === vehicleId
      );
      driver.assignmentRequests[0].status = "accepted";
      driver.assignmentRequests[0].assignedAt = new Date();

      driver.schedule.push({
        vehicle: vehicleId,
        startTime: new Date(),
        endTime: new Date(),
      });
    } else if (response === "rejected") {
      const requestIndex = driver.assignmentRequests.findIndex(
        (req) => req.vehicleId.toString() === vehicleId
      );
      driver.assignmentRequests[0].status = "rejected";
    }

    await driver.save();

    res.status(200).json({
      status: "success",
      message: `Assignment ${response} successfully`,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
