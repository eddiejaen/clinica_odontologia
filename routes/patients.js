const User = require('../models/user'); // Import User Model Schema
const Patient = require('../models/patient'); // Import Patient Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {

  /* ===============================================================
  CREATE NEW BLOG
  =============================================================== */
  router.post('/newPatient', (req, res) => {
          const patient = new Patient({
            nombre: req.body.inputNombre,
            apellido: req.body.inputApellido,
            recomendado: req.body.inputRecomendado,
            direccion: req.body.inputDireccion,
            canton: req.body.inputCanton,
            provincia: req.body.inputProvincia,
            cedula: req.body.inputCedula,
            ocupacion: req.body.inputOcupacion,
            telefono_celular: req.body.inputCelular,
            telefono_oficina: req.body.inputOficina,
            ext_oficina: req.body.inputExt,
            telefono_habitacion: req.body.inputHabitacion,
            apdo_habitacion: req.body.inputApdo,
            medico: req.body.inputMedico,
            emergencia: req.body.inputAvisar,
            parentesco: req.body.inputParentesco,
            telefono_parentesco: req.body.inputTelParentesco
          });
          // Save patient into database
          patient.save((err) => {
            // Check if error
            if (err) {
              if (err.code === 11000) {
                res.json({ success: false, message: 'Cédula ya existe.' }); // Return error
              } else {
                res.json({ success: false, message: err}); // Return general error message
              }
              } else {
                res.json({ success: true, message: 'Paciente Registrado!' }); // Return success message
            }
          });
        //}
      //}
    //}
  });


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


    /* ===============================================================
    GET ALL BLOGS
    =============================================================== */
    router.get('/allPatients', (req, res) => {
      // Search database for all patient posts
      Patient.find({}, (err, patients) => {
        // Check if error was found or not
        if (err) {
          res.json({ success: false, message: err }); // Return error message
        } else {
          // Check if patients were found in database
          if (!patients) {
            res.json({ success: false, message: 'No patients found.' }); // Return error of no patients found
          } else {
            res.json({ success: true, patients: patients }); // Return success and patients array
          }
        }
      }).sort({ '_id': -1 }); // Sort patients from newest to oldest
    });

    /* ===============================================================
    GET SINGLE BLOG
    =============================================================== */
    router.get('/singlePatient/:id', (req, res) => {
      // Check if id is present in parameters
      if (!req.params.id) {
        res.json({ success: false, message: 'No patient ID was provided.' }); // Return error message
      } else {
        // Check if the patient id is found in database
        Patient.findOne({ _id: req.params.id }, (err, patient) => {
          // Check if the id is a valid ID
          if (err) {
            res.json({ success: false, message: 'Not a valid patient id' }); // Return error message
          } else {
            // Check if patient was found by id
            if (!patient) {
              res.json({ success: false, message: 'Patient not found.' }); // Return error message
            } else {
              // Find the current user that is logged in
              User.findOne({ _id: req.decoded.userId }, (err, user) => {
                // Check if error was found
                if (err) {
                  res.json({ success: false, message: err }); // Return error
                } else {
                  // Check if username was found in database
                  if (!user) {
                    res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
                  } else {
                    // Check if the user who requested single patient is the one who created it
                    if (user.username !== patient.createdBy) {
                      res.json({ success: false, message: 'You are not authorized to edit this patient.' }); // Return authentication reror
                    } else {
                      res.json({ success: true, patient: patient }); // Return success
                    }
                  }
                }
              });
            }
          }
        });
      }
    });

    /* ===============================================================
    UPDATE BLOG POST
    =============================================================== */
    router.put('/updatePatient', (req, res) => {
      // Check if id was provided
      if (!req.body._id) {
        res.json({ success: false, message: 'No patient id provided' }); // Return error message
      } else {
        // Check if id exists in database
        Patient.findOne({ _id: req.body._id }, (err, patient) => {
          // Check if id is a valid ID
          if (err) {
            res.json({ success: false, message: 'Not a valid patient id' }); // Return error message
          } else {
            // Check if id was found in the database
            if (!patient) {
              res.json({ success: false, message: 'Patient id was not found.' }); // Return error message
            } else {
              // Check who user is that is requesting patient update
              User.findOne({ _id: req.decoded.userId }, (err, user) => {
                // Check if error was found
                if (err) {
                  res.json({ success: false, message: err }); // Return error message
                } else {
                  // Check if user was found in the database
                  if (!user) {
                    res.json({ success: false, message: 'Unable to authenticate user.' }); // Return error message
                  } else {
                    // Check if user logged in the the one requesting to update patient post
                    if (user.username !== patient.createdBy) {
                      res.json({ success: false, message: 'You are not authorized to edit this patient post.' }); // Return error message
                    } else {
                      patient.title = req.body.title; // Save latest patient title
                      patient.body = req.body.body; // Save latest body
                      patient.save((err) => {
                        if (err) {
                          if (err.errors) {
                            res.json({ success: false, message: 'Please ensure form is filled out properly' });
                          } else {
                            res.json({ success: false, message: err }); // Return error message
                          }
                        } else {
                          res.json({ success: true, message: 'Patient Updated!' }); // Return success message
                        }
                      });
                    }
                  }
                }
              });
            }
          }
        });
      }
    });

    /* ===============================================================
    DELETE BLOG POST
    =============================================================== */
    router.delete('/deletePatient/:id', (req, res) => {
      // Check if ID was provided in parameters
      if (!req.params.id) {
        res.json({ success: false, message: 'No id provided' }); // Return error message
      } else {
        // Check if id is found in database
        Patient.findOne({ _id: req.params.id }, (err, patient) => {
          // Check if error was found
          if (err) {
            res.json({ success: false, message: 'Invalid id' }); // Return error message
          } else {
            // Check if patient was found in database
            if (!patient) {
              res.json({ success: false, messasge: 'Patient was not found' }); // Return error message
            } else {
              // Get info on user who is attempting to delete post
              User.findOne({ _id: req.decoded.userId }, (err, user) => {
                // Check if error was found
                if (err) {
                  res.json({ success: false, message: err }); // Return error message
                } else {
                  // Check if user's id was found in database
                  if (!user) {
                    res.json({ success: false, message: 'Unable to authenticate user.' }); // Return error message
                  } else {
                    // Check if user attempting to delete patient is the same user who originally posted the patient
                    if (user.username !== patient.createdBy) {
                      res.json({ success: false, message: 'You are not authorized to delete this patient post' }); // Return error message
                    } else {
                      // Remove the patient from database
                      patient.remove((err) => {
                        if (err) {
                          res.json({ success: false, message: err }); // Return error message
                        } else {
                          res.json({ success: true, message: 'Patient deleted!' }); // Return success message
                        }
                      });
                    }
                  }
                }
              });
            }
          }
        });
      }
    });

    /* ===============================================================
    LIKE BLOG POST
    =============================================================== */
    router.put('/likePatient', (req, res) => {
      // Check if id was passed provided in request body
      if (!req.body.id) {
        res.json({ success: false, message: 'No id was provided.' }); // Return error message
      } else {
        // Search the database with id
        Patient.findOne({ _id: req.body.id }, (err, patient) => {
          // Check if error was encountered
          if (err) {
            res.json({ success: false, message: 'Invalid patient id' }); // Return error message
          } else {
            // Check if id matched the id of a patient post in the database
            if (!patient) {
              res.json({ success: false, message: 'That patient was not found.' }); // Return error message
            } else {
              // Get data from user that is signed in
              User.findOne({ _id: req.decoded.userId }, (err, user) => {
                // Check if error was found
                if (err) {
                  res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                } else {
                  // Check if id of user in session was found in the database
                  if (!user) {
                    res.json({ success: false, message: 'Could not authenticate user.' }); // Return error message
                  } else {
                    // Check if user who liked post is the same user that originally created the patient post
                    if (user.username === patient.createdBy) {
                      res.json({ success: false, messagse: 'Cannot like your own post.' }); // Return error message
                    } else {
                      // Check if the user who liked the post has already liked the patient post before
                      if (patient.likedBy.includes(user.username)) {
                        res.json({ success: false, message: 'You already liked this post.' }); // Return error message
                      } else {
                        // Check if user who liked post has previously disliked a post
                        if (patient.dislikedBy.includes(user.username)) {
                          patient.dislikes--; // Reduce the total number of dislikes
                          const arrayIndex = patient.dislikedBy.indexOf(user.username); // Get the index of the username in the array for removal
                          patient.dislikedBy.splice(arrayIndex, 1); // Remove user from array
                          patient.likes++; // Increment likes
                          patient.likedBy.push(user.username); // Add username to the array of likedBy array
                          // Save patient post data
                          patient.save((err) => {
                            // Check if error was found
                            if (err) {
                              res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                            } else {
                              res.json({ success: true, message: 'Patient liked!' }); // Return success message
                            }
                          });
                        } else {
                          patient.likes++; // Incriment likes
                          patient.likedBy.push(user.username); // Add liker's username into array of likedBy
                          // Save patient post
                          patient.save((err) => {
                            if (err) {
                              res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                            } else {
                              res.json({ success: true, message: 'Patient liked!' }); // Return success message
                            }
                          });
                        }
                      }
                    }
                  }
                }
              });
            }
          }
        });
      }
    });

    /* ===============================================================
    DISLIKE BLOG POST
    =============================================================== */
    router.put('/dislikePatient', (req, res) => {
      // Check if id was provided inside the request body
      if (!req.body.id) {
        res.json({ success: false, message: 'No id was provided.' }); // Return error message
      } else {
        // Search database for patient post using the id
        Patient.findOne({ _id: req.body.id }, (err, patient) => {
          // Check if error was found
          if (err) {
            res.json({ success: false, message: 'Invalid patient id' }); // Return error message
          } else {
            // Check if patient post with the id was found in the database
            if (!patient) {
              res.json({ success: false, message: 'That patient was not found.' }); // Return error message
            } else {
              // Get data of user who is logged in
              User.findOne({ _id: req.decoded.userId }, (err, user) => {
                // Check if error was found
                if (err) {
                  res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                } else {
                  // Check if user was found in the database
                  if (!user) {
                    res.json({ success: false, message: 'Could not authenticate user.' }); // Return error message
                  } else {
                    // Check if user who disliekd post is the same person who originated the patient post
                    if (user.username === patient.createdBy) {
                      res.json({ success: false, messagse: 'Cannot dislike your own post.' }); // Return error message
                    } else {
                      // Check if user who disliked post has already disliked it before
                      if (patient.dislikedBy.includes(user.username)) {
                        res.json({ success: false, message: 'You already disliked this post.' }); // Return error message
                      } else {
                        // Check if user has previous disliked this post
                        if (patient.likedBy.includes(user.username)) {
                          patient.likes--; // Decrease likes by one
                          const arrayIndex = patient.likedBy.indexOf(user.username); // Check where username is inside of the array
                          patient.likedBy.splice(arrayIndex, 1); // Remove username from index
                          patient.dislikes++; // Increase dislikeds by one
                          patient.dislikedBy.push(user.username); // Add username to list of dislikers
                          // Save patient data
                          patient.save((err) => {
                            // Check if error was found
                            if (err) {
                              res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                            } else {
                              res.json({ success: true, message: 'Patient disliked!' }); // Return success message
                            }
                          });
                        } else {
                          patient.dislikes++; // Increase likes by one
                          patient.dislikedBy.push(user.username); // Add username to list of likers
                          // Save patient data
                          patient.save((err) => {
                            // Check if error was found
                            if (err) {
                              res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                            } else {
                              res.json({ success: true, message: 'Patient disliked!' }); // Return success message
                            }
                          });
                        }
                      }
                    }
                  }
                }
              });
            }
          }
        });
      }
    });

    /* ===============================================================
    COMMENT ON BLOG POST
    =============================================================== */
    router.post('/comment', (req, res) => {
      // Check if comment was provided in request body
      if (!req.body.comment) {
        res.json({ success: false, message: 'No comment provided' }); // Return error message
      } else {
        // Check if id was provided in request body
        if (!req.body.id) {
          res.json({ success: false, message: 'No id was provided' }); // Return error message
        } else {
          // Use id to search for patient post in database
          Patient.findOne({ _id: req.body.id }, (err, patient) => {
            // Check if error was found
            if (err) {
              res.json({ success: false, message: 'Invalid patient id' }); // Return error message
            } else {
              // Check if id matched the id of any patient post in the database
              if (!patient) {
                res.json({ success: false, message: 'Patient not found.' }); // Return error message
              } else {
                // Grab data of user that is logged in
                User.findOne({ _id: req.decoded.userId }, (err, user) => {
                  // Check if error was found
                  if (err) {
                    res.json({ success: false, message: 'Something went wrong' }); // Return error message
                  } else {
                    // Check if user was found in the database
                    if (!user) {
                      res.json({ success: false, message: 'User not found.' }); // Return error message
                    } else {
                      // Add the new comment to the patient post's array
                      patient.comments.push({
                        comment: req.body.comment, // Comment field
                        commentator: user.username // Person who commented
                      });
                      // Save patient post
                      patient.save((err) => {
                        // Check if error was found
                        if (err) {
                          res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                        } else {
                          res.json({ success: true, message: 'Comment saved' }); // Return success message
                        }
                      });
                    }
                  }
                });
              }
            }
          });
        }
      }
    });

    return router;
  };
