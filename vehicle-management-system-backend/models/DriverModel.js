const mongoose = require("mongoose");
const validator = require("validator");

const driverSchema = new mongoose.Schema(
  {
    driverId: {
      type: String,
      required: [true, "Please provide a driver ID"],
      unique: true,
    },
    driverName: {
      type: String,
      required: [true, "Please provide the driver's name"],
    },
    driverEmail: {
      type: String,
      required: [true, "Please provide the driver's email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Please provide the driver's phone number"],
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    location: {
      type: String,
    },
    workHours: {
      start: String,
      end: String,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    schedule: [
      {
        vehicle: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Vehicle",
          required: true,
        },
        startTime: {
          type: Date,
          required: true,
        },
        endTime: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Driver", driverSchema);
