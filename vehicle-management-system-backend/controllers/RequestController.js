const Driver = require("../models/DriverModel");

exports.sendAssignmentRequest = async (req, res, next) => {
  try {
    const { vehicleId, driverIds } = req.body;

    for (const driverId of driverIds) {
      await Driver.updateOne(
        { driverId },
        {
          $push: {
            assignmentRequests: { vehicleId },
          },
        }
      );
    }

    res.status(200).json({
      status: "success",
      message: "Assignment requests sent successfully",
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
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
