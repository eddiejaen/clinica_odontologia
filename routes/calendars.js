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

  router.get('/allCalendar/', (req, res) => {
    // Search database for all treatment posts
    Calendar.find({ }, (err, calendar) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if treatment were found in database
        if (!calendar) {
          res.json({ success: false, message: 'No calendar found.' }); // Return error of no treatment found
        } else {
          res.json({ success: true, calendar: calendar }); // Return success and treatment array
        }
      }
    });
  });
  return router;
};
