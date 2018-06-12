const Calendar = require('../models/calendar'); // Import Patient Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {

  router.post('/newCalendar', (req, res) => {
    const calendar = new Calendar({
      title: req.body.title,
      start: req.body.start
    });
    // Save history into database
    calendar.save((err) => {
      // Check if error
      if (err) {
          // console.log(err);
          res.json({ success: false, message: err}); // Return general error message
      } else {
        // console.log('exito');
        res.json({ success: true, message: 'Cita Registrada' }); // Return success message
    }
  });
  });
  return router;
};
