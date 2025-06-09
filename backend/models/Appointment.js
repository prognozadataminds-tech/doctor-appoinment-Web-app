const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: String,
  dob: String,
  mobile: String,
  email: String,
  address: String,
  appointmentDate: String,
  appointmentTime: String,
});

appointmentSchema.index({ appointmentDate: 1, appointmentTime: 1 }, { unique: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
