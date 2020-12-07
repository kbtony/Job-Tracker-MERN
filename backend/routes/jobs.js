
// this file served as the router file

const router = require('express').Router();
let Job = require('../models/exercise.model');

router.route('/').get((req, res) => {
  Job.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  // assign information from req.body to sever variables
  const company = req.body.company;
  const jobTitle = req.body.jobTitle;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const status = req.body.status;

  const newExercise = new Job({
    company,
    jobTitle,
    description,
    duration,
    date,
    status,
  });

  newExercise.save()
  .then(() => res.json('Job added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// add some more API endpoints
router.route('/:id').get((req, res) => {
  Job.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Job.findByIdAndDelete(req.params.id)
    .then(() => res.json('Job deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Job.findById(req.params.id)
    .then(exercise => {
      exercise.company = req.body.company;
      exercise.jobTitle = req.body.jobTitle;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);
      exercise.status = req.body.status;

      exercise.save()
        .then(() => res.json('Job updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;