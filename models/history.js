/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

// // Validate Function to check patient title length
// let titleLengthChecker = (title) => {
//   // Check if patient title exists
//   if (!title) {
//     return false; // Return error
//   } else {
//     // Check the length of title
//     if (title.length < 5 || title.length > 50) {
//       return false; // Return error if not within proper length
//     } else {
//       return true; // Return as valid title
//     }
//   }
// };
//
// // Validate Function to check if valid title format
// let alphaNumericTitleChecker = (title) => {
//   // Check if title exists
//   if (!title) {
//     return false; // Return error
//   } else {
//     // Regular expression to test for a valid title
//     const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
//     return regExp.test(title); // Return regular expression test results (true or false)
//   }
// };
//
// // Array of Title Validators
// const titleValidators = [
//   // First Title Validator
//   {
//     validator: titleLengthChecker,
//     message: 'Title must be more than 5 characters but no more than 50'
//   },
//   // Second Title Validator
//   {
//     validator: alphaNumericTitleChecker,
//     message: 'Title must be alphanumeric'
//   }
// ];
//
// // Validate Function to check body length
// let bodyLengthChecker = (body) => {
//   // Check if body exists
//   if (!body) {
//     return false; // Return error
//   } else {
//     // Check length of body
//     if (body.length < 5 || body.length > 500) {
//       return false; // Return error if does not meet length requirement
//     } else {
//       return true; // Return as valid body
//     }
//   }
// };
//
// // Array of Body validators
// const bodyValidators = [
//   // First Body validator
//   {
//     validator: bodyLengthChecker,
//     message: 'Body must be more than 5 characters but no more than 500.'
//   }
// ];
//
// // Validate Function to check comment length
// let commentLengthChecker = (comment) => {
//   // Check if comment exists
//   if (!comment[0]) {
//     return false; // Return error
//   } else {
//     // Check comment length
//     if (comment[0].length < 1 || comment[0].length > 200) {
//       return false; // Return error if comment length requirement is not met
//     } else {
//       return true; // Return comment as valid
//     }
//   }
// };
//
// // Array of Comment validators
// const commentValidators = [
//   // First comment validator
//   {
//     validator: commentLengthChecker,
//     message: 'Comments may not exceed 200 characters.'
//   }
// ];

// Patient Model Definition
const historySchema = new Schema({
  cedula: { type: String, required: true },
  tratamiento: { type: Boolean, required: true },
  medicamento: { type: Boolean, required: true },
  diabetes: { type: Boolean, required: true },
  artritis: { type: Boolean, required: true },
  cardiacas: { type: Boolean, required: true },
  fiebre: { type: Boolean, required: true },
  hepatitis: { type: Boolean, required: true },
  ulceras: { type: Boolean, required: true },
  trastornos: { type: Boolean, required: true },
  nerviosas: { type: Boolean, required: true },
  otras_enfermedades: { type: String, required: true },
  internado: { type: Boolean, required: true },
  alteraciones: { type: Boolean, required: true },
  padecimiento: { type: Boolean, required: true },
  aspirina: { type: Boolean, required: true },
  penicilina: { type: Boolean, required: true },
  sulfas: { type: Boolean, required: true },
  otros_medicamentos: { type: String, required: true },
  anestesia: { type: Boolean, required: true },
  sangrado: { type: Boolean, required: true },
  desmayos: { type: Boolean, required: true },
  embarazada: { type: Boolean, required: true },
  lactancia: { type: Boolean, required: true },
  transtornos: { type: Boolean, required: true },
  observaciones: { type: String, required: true }
});

// Export Module/Schema
module.exports = mongoose.model('History', historySchema);
