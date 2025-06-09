
const express = require("express");
const router = express.Router();
const { createAppointment,getAllAppointments, getAppointments, deleteAppointment, updateAppointment } = require("../controllers/appointmentController");

router.post("/appointments", createAppointment);
router.get("/appointments", getAllAppointments); // <== NEW route here

router.get("/appointments", getAppointments); // Add pagination & filter here
router.delete("/appointments/:id", deleteAppointment);
router.put("/appointments/:id", updateAppointment);
module.exports = router;
