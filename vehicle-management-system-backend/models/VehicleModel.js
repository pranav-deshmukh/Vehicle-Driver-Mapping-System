const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: String,
      required: [true, "Please provide a vehicle ID"],
      unique: true,
    },
    makeAndModel: {
      type: String,
      required: [true, "Please provide the vehicle's make and model"],
    },
    licensePlate: {
      type: String,
      required: [true, "Please provide the vehicle's license plate"],
      unique: true,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
