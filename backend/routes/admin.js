const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const moment = require('moment');

// Get appointment stats
router.get('/appointment-stats', async (req, res) => {
  try {
    const today = moment().format('YYYY-MM-DD');
    const weekStart = moment().startOf('week').format('YYYY-MM-DD');
    const monthStart = moment().startOf('month').format('YYYY-MM-DD');

    const allAppointments = await Appointment.find();

    const stats = {
      total: allAppointments.length,
      today: allAppointments.filter(a => moment(a.appointmentDate).format('YYYY-MM-DD') === today).length,

      week: allAppointments.filter(a => moment(a.appointmentDate).isSameOrAfter(weekStart)).length,
      month: allAppointments.filter(a => moment(a.appointmentDate).isSameOrAfter(monthStart)).length,
    };

    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching appointment stats' });
  }
});

module.exports = router;
