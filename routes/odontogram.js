const User = require('../models/user'); // Import User Model Schema
const Patient = require('../models/patient'); // Import Patient Model Schema
const Odontogram = require('../models/odontogram'); // Import Patient Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {

  /* ===============================================================
  Route to check if user's username is available for registration
  =============================================================== */
  router.get('/checkCedula/:cedula', (req, res) => {
    // Check if username was provided in paramaters
    if (!req.params.cedula) {
      res.json({ success: false, message: 'Cedula was not provided' }); // Return error
    } else {
      // Look for username in database
      Patient.findOne({ cedula: req.params.cedula }, (err, patient) => { // Check if connection error was found
        if (err) {
          res.json({ success: false, message: "C mamut" }); // Return connection error
        } else {
          // Check if user's username was found
          if (patient) {
            res.json({ success: false, message: 'Cedula is already taken' }); // Return as taken username
          } else {
            res.json({ success: true, message: 'Cedula is available' }); // Return as vailable username
          }
        }
      });
    }
  });
  router.post('/newOdontogram', (req, res) => {
    const odontogram = new odontogram({
      cedula: req.body.cedula,
      caries: req.body.caries,
      mal_estado: req.body.mal_estado,
      buen_estado: req.body.buen_estado,
      pieza: req.body.pieza,
    });
    // Save history into database
    odontogram.save((err) => {
      // Check if error
      if (err) {
          res.json({ success: false, message: err}); // Return general error message
      } else {
        res.json({ success: true, message: 'Registrado' }); // Return success message
    }
  });
  });

router.get('/odontogram/:cedula', (req, res) => {
  // Search database for all treatment posts
  Odontogram.findOne({ cedula: req.params.cedula }, (err, odontogram) => {
    // Check if error was found or not
    if (err) {
      res.json({ success: false, message: err }); // Return error message
    } else {
      // Check if treatment were found in database
      if (!odontogram) {
        res.json({ success: false, message: 'No odontogram found.' }); // Return error of no treatment found
      } else {
        res.json({ success: true, odontogram: odontogram }); // Return success and treatment array
      }
    }
  });
});

router.get('/allOdontogram/:cedula', (req, res) => {
  // Search database for all treatment posts
  Odontogram.find({ cedula: req.params.cedula }, (err, odontogram) => {
    // Check if error was found or not
    if (err) {
      res.json({ success: false, message: err }); // Return error message
    } else {
      // Check if treatment were found in database
      if (!odontogram) {
        res.json({ success: false, message: 'No odontogram found.' }); // Return error of no treatment found
      } else {
        res.json({ success: true, odontogram: odontogram }); // Return success and treatment array
      }
    }
  });
});

router.put('/updateOdontogram', (req, res) => {
// Check if id was provided
if (!req.body._id) {
  res.json({ success: false, message: 'No odontogram id provided' }); // Return error message
} else {
  // Check if id exists in database
  Odontogram.findOne({ _id: req.body._id }, (err, odontogram) => {
    // Check if id is a valid ID
    if (err) {
      res.json({ success: false, message: 'Not a valid odontogram id' }); // Return error message
    } else {
      // Check if id was found in the database
      if (!odontogram) {
        res.json({ success: false, message: 'Patient id was not found.' }); // Return error message
      } else {
        odontogram.caries = req.body.caries;
        odontogram.mal_estado = req.body.mal_estado;
        odontogram.buen_estado = req.body.buen_estado;
        odontogram.pieza = req.body.pieza;

        odontogram.save((err) => {
          if (err) {
            if (err.errors) {
              res.json({ success: false, message: 'Please ensure form is filled out properly' });
            } else {
              res.json({ success: false, message: err }); // Return error message
            }
          } else {
            res.json({ success: true, message: 'Actualizado!' }); // Return success message
          }
        });
      }
    }
  });
}
});
return router;
};
