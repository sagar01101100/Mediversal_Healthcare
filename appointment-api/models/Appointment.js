const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    startDate: { type: Date, required: true }, 
    startTime: { type: String, required: true }, 
    endDate: { type: Date, required: true }, 
    endTime: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;
