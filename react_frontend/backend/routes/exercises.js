// this file served as the router file
const router = require('express').Router();
// Exercise在exercise.model.js中定義好了
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  // assign information from req.body to sever variables
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  // converting date to a Date data type
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// add some more API endpoints

// this :/id is like a variable, this is an object ID 
// that is created automatically by MongoDB
// e.g. do a get request with id=5f8bf9a06c5d683fcec965ac (the objectID of an exercise data)
// http://localhost:5000/exercises/5f8bf9a06c5d683fcec965ac
// we'll return the information just about that exercise
router.route('/:id').get((req, res) => {
  // getting the id directly from the url
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      // update the information from the JSON object we receive
      // e.g. set the old username (exercise.username) to the new username
      // p.s. the post request cannot send just the field we want to update
      // need to send all the fields or there will be an error
      // 改進 -> 可修改code使 can receive one of the item instead of all of them 
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;