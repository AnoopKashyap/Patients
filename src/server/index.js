const mongoose = require('mongoose');
const express = require('express');
const patients = require('./patientsRoutes');
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost/patients')
  .then(() => console.log("connected to mongoDB..."))
  .catch(() => console.log("Error connecting to mongoDB.."))

app.use('/patients', patients);

app.listen(3000, () => console.log("Listening to port 3000.."));
