const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  bloodGroup: String,
  hasBp: Boolean
});

const Patient = new mongoose.model('Patient', patientSchema);

module.exports = Patient;
