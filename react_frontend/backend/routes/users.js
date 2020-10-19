// this file served as the router file

// we need a Express router because this is the router we are creating
const router = require('express').Router();
// User在user.model.js中定義好了
let User = require('../models/user.model');

// in real production app, we'll have a update and a delete (但在此省略了，exercises.js有～)

// the first end point handles incoming HTTP GET requests on the /users/ URL path
// i.e. 若https://localhost:5000/users/，且為get request，則由此處理
router.route('/').get((req, res) => {
  // We call Users.find() to get a list of all the users from the database. 
  // The find method returns a promise. The results are returned in JSON format with res.json(users).
  // ?? 什麼是promise ??
  User.find()
    // res.json = return something (i.e. the users we got from the db) in JSON
    .then(users => res.json(users))
    // return status(400) and the error message
    .catch(err => res.status(400).json('Error: ' + err));
});

// The second endpoint handles incoming HTTP POST requests on the /users/add/ URL path.
router.route('/add').post((req, res) => {
  // the new username is part of the request body 
  // so wrapped up body.username is going to be assigned to this username variable
  const username = req.body.username;

  // use username to create a new instance of User
  const newUser = new User({username});

  // save newUser to DB with save method
  newUser.save()
    // once saved, we'll return 'User added!' in JSON
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// standard thing for module file (i.e. module file都會這樣寫～)
module.exports = router;