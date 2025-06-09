

const Appointment = require("../models/Appointment");

// Create Appointment
const createAppointment = async (req, res) => {
  const { name, dob, mobile, email, address, appointmentDate, appointmentTime } = req.body;

  try {
    const existing = await Appointment.findOne({ appointmentDate, appointmentTime });
    if (existing) {
      return res.status(409).json({ message: "Slot already booked" });
    }

    const appointment = new Appointment({ name, dob, mobile, email, address, appointmentDate, appointmentTime });
    await appointment.save();

    res.status(201).json({ message: "Appointment booked" });
  } catch (err) {
    console.error("Create appointment failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ appointmentDate: 1, appointmentTime: 1 });
    res.status(200).json(appointments);
  } catch (err) {
    console.error("Fetch appointments failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// GET appointments with pagination & filtering
const getAppointments = async (req, res) => {
  const { page = 1, limit = 5, name = "", date = "" } = req.query;

  const query = {
    ...(name && { name: new RegExp(name, 'i') }),
    ...(date && { appointmentDate: date }),
  };

  try {
    const appointments = await Appointment.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Appointment.countDocuments(query);
    res.json({ appointments, total });
  } catch (err) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

// DELETE
const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting appointment" });
  }
};

// UPDATE
const updateAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Appointment updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating appointment" });
  }
};


module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointments,
  deleteAppointment,
  updateAppointment
};
