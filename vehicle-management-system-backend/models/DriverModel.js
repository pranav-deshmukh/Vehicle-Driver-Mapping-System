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
      required: false,
    },
    workHours: {
      start: {
        type: String,
        required: false,
      },
      end: {
        type: String,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Driver", driverSchema);
