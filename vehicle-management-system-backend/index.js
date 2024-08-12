const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");
const cron = require("node-cron");
const Driver = require("./models/DriverModel");

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connected successfully");

    cron.schedule("* * * * *", async () => {
      console.log("Cron job running at:", new Date().toISOString());

      try {
        const now = new Date();

        // Find all drivers with assignments that have ended
        const drivers = await Driver.find({
          "schedule.endTime": { $lte: now },
        });

        for (const driver of drivers) {
          // Log the driver's current schedule before update
          console.log(`Driver before update: ${JSON.stringify(driver)}`);

          // Remove expired assignments
          driver.schedule = driver.schedule.filter(
            (assignment) => assignment.endTime > now
          );

          // If there are no future assignments, unassign the vehicle and clear the schedule
          if (driver.schedule.length === 0) {
            driver.vehicle = null;
            driver.schedule = []; // Clear the schedule
          }

          // Save the updated driver data
          await driver.save();

          // Log the driver's new schedule after update
          console.log(`Driver after update: ${JSON.stringify(driver)}`);
        }

        console.log("Expired assignments processed successfully.");
      } catch (err) {
        console.error("Error processing expired assignments:", err);
      }
    });

    const port = 3000;
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
