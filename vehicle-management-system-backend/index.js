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

        const drivers = await Driver.find({
          "schedule.endTime": { $lte: now },
        });

        for (const driver of drivers) {
          console.log(`Driver before update: ${JSON.stringify(driver)}`);

          driver.schedule = driver.schedule.filter(
            (assignment) => assignment.endTime > now
          );

          if (driver.schedule.length === 0) {
            driver.vehicle = null;
            driver.schedule = [];
          }

          await driver.save();

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
