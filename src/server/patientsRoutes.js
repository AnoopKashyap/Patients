const Patient = require('./models/patient');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
  const patients = await Patient.find();
  res.send(patients);
});

router.get('/:id', async(req, res) => {
	const patient = await Patient.findById(req.params.id);

	if(!patient) res.status(404).send('The patient with given ID was not found.');
  res.send(patient);
});

router.post('/', async (req,res) => {
	let patient =	new Patient({
		name: req.body.name,
		age: req.body.age,
		gender: req.body.gender,
		bloodGroup: req.body.bloodGroup,
		hasBp: req.body.hasBp
	});
	patient = await patient.save();
	res.send(patient);
});

router.put('/:id', async (req, res) => {
	const patient = await Patient.findByIdAndUpdate(req.params.id,
		{
			name: req.body.name,
			age: req.body.age,
			gender: req.body.gender,
			bloodGroup: req.body.bloodGroup,
			hasBp: req.body.hasBp
		}, { new: true });

	res.send(patient);
});

router.delete('/:id', async (req, res) => {
	const patient = await Patient.findByIdAndRemove(req.params.id);
	res.send(patient);
});

module.exports = router;
