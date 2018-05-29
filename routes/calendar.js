const Calendar = require('../models/calendar'); // Import Patient Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {

  router.post('/add', (req, res) => {
    const calendar = new Calendar({
      paciente: req.body.paciente,
      color: req.body.color,
      color1: req.body.color1,
      inicio: req.body.inicio,
      final: req.body.final
    });
    // Save patient into database
    calendar.save((err) => {
      // Check if error
    }if (err.code === 11000) {
          res.json({ success: false, message: err}); // Return general error message
        }
   else {
        res.json({ success: true, message: 'Cita Registrada!' }); // Return success message
      }
    });
  });

  return router;
};
