
// this file served as the router file

const router = require('express').Router();
let Job = require('../models/job.model');

router.route('/').get((req, res) => {
  Job.find()
    .then(jobs => res.json(jobs))
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

  const newJob = new Job({
    company,
    jobTitle,
    description,
    duration,
    date,
    status,
  });

  newJob.save()
  .then(() => res.json('Job added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// add some more API endpoints
router.route('/:id').get((req, res) => {
  Job.findById(req.params.id)
    .then(job => res.json(job))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Job.findByIdAndDelete(req.params.id)
    .then(() => res.json('Job deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Job.findById(req.params.id)
    .then(job => {
      job.company = req.body.company;
      job.jobTitle = req.body.jobTitle;
      job.description = req.body.description;
      job.duration = Number(req.body.duration);
      job.date = Date.parse(req.body.date);
      job.status = req.body.status;

      job.save()
        .then(() => res.json('Job updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;