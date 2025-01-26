const express = require("express");
const moment = require("moment");
const Appointment = require("./models/Appointment");
const connectDB = require("./db");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

connectDB();

// Endpoint to Create Appointment
app.post("/api/appointments", async (req, res) => {
  const { customerName, startDate, startTime, endDate, endTime, description } = req.body;

  // Validate fields
  if (!customerName || typeof customerName !== "string") {
    return res.status(400).json({ message: "Invalid or missing customerName" });
  }
  if (!startDate || !moment(startDate, "YYYY-MM-DD", true).isValid()) {
    return res.status(400).json({ message: "Invalid or missing startDate" });
  }
  if (!startTime || !moment(startTime, "HH:mm", true).isValid()) {
    return res.status(400).json({ message: "Invalid or missing startTime" });
  }
  if (!endDate || !moment(endDate, "YYYY-MM-DD", true).isValid()) {
    return res.status(400).json({ message: "Invalid or missing endDate" });
  }
  if (!endTime || !moment(endTime, "HH:mm", true).isValid()) {
    return res.status(400).json({ message: "Invalid or missing endTime" });
  }

  // Generate dynamic customerId
  const customerId = uuidv4();

  // Treat only dates (discard the time part) for startDate and endDate
  const startMoment = moment(startDate, "YYYY-MM-DD").startOf("day").set({
    hour: moment(startTime, "HH:mm").hour(),
    minute: moment(startTime, "HH:mm").minute(),
  });

  const endMoment = moment(endDate, "YYYY-MM-DD").startOf("day").set({
    hour: moment(endTime, "HH:mm").hour(),
    minute: moment(endTime, "HH:mm").minute(),
  });

  // Ensure end time is after start time
  if (startMoment.isSameOrAfter(endMoment)) {
    return res.status(400).json({ message: "End time must be after start time" });
  }

  try {
    // Check for overlapping appointments by comparing the date range
    const overlappingAppointments = await Appointment.find({
      $or: [
        {
          $and: [
            { startDate: { $lte: endMoment.toDate() } },
            { endDate: { $gte: startMoment.toDate() } },
          ],
        },
        {
          $and: [
            { startDate: { $gte: startMoment.toDate() } },
            { endDate: { $lte: endMoment.toDate() } },
          ],
        },
      ],
    });

    if (overlappingAppointments.length > 0) {
      return res.status(400).json({
        message: "Time slot is already booked.",
        overlappingAppointments,
      });
    }

    // Save the appointment
    const appointment = new Appointment({
      customerId, // Dynamically assigned customerId
      customerName,
      startDate: startMoment.toDate(),
      startTime,
      endDate: endMoment.toDate(),
      endTime,
      description,
    });

    const savedAppointment = await appointment.save();
    return res.status(201).json(savedAppointment);
  } catch (error) {
    return res.status(500).json({ message: "Error creating appointment", error });
  }
});


// Endpoint to Retrieve Appointments by Date Range
app.get("/api/appointments", async (req, res) => {
  const { from, to } = req.query;

  try {
    let filter = {};

    if (from && to) {
      filter = {
        startDate: { $gte: new Date(from) },
        endDate: { $lte: new Date(to) },
      };
    }

    const appointments = await Appointment.find(filter).sort({ startDate: 1, startTime: 1 });
    return res.status(200).json(appointments);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving appointments", error });
  }
});

module.exports = app;
