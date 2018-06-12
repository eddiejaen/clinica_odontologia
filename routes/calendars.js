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

  router.get('/allCalendar', (req, res) => {
    // Search database for all treatment posts
    Calendar.find({ }, (err, calendars) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if treatment were found in database
        if (!calendars) {
          res.json({ success: false, message: 'No calendar found.' }); // Return error of no treatment found
        } else {
          res.json({ success: true, calendars: calendars }); // Return success and treatment array
        }
      }
    });
  });

  router.delete('/deleteCalendar/:id', (req, res) => {
    // Check if ID was provided in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No id provided' }); // Return error message
    } else {
      // Check if id is found in database
      Calendar.findOne({ _id: req.params.id }, (err, calendar) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: 'Invalid id' }); // Return error message
        } else {
          // Check if patient was found in database
          if (!calendar) {
            res.json({ success: false, messasge: 'Calendar was not found' }); // Return error message
          } else {
            // Get info on user who is attempting to delete post
            calendar.remove((err) => {
              if (err) {
                res.json({ success: false, message: err }); // Return error message
              } else {
                res.json({ success: true, message: 'Calendar deleted!' }); // Return success message
              }
            });
          }
        }
      });
    }
  });

  return router;
};
