// this file served as the router file

// we need a Express router because this is the router we are creating
const router = require('express').Router();
// User在user.model.js中定義好了
let User = require('../models/user.model');

// in real production app, we'll have a update and a delete (但在此省略了，exercises.js有～)

// the first end point handles incoming HTTP GET requests on the /users/ URL path
// i.e. 若https://localhost:5000/users/，且為get request，則由此處理
// 若https://localhost:5000/user/ 則會error, 是users不是user這件事定義在server.js裡
router.route('/').get((req, res) => {
  // We call Users.find() to get a list of all the users from the database. 
  // The find method returns a promise. The results are returned in JSON format with res.json(users).
  // 在此User是Model, Model.find()可參閱 http://thecodebarbarian.com/how-find-works-in-mongoose.html
  // ?? 什麼是promise ?? 見https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#Chaining
  User.find()
    // res.json = return something (i.e. the users we got from the db) in JSON
    // !!!如果前後不同名(e.g. users88 => res.json(users8))則會"Error: ReferenceError: users8 is not defined"
    // 這裡的users也是自訂的

    //.then(users => res.json(users)) <- 原本的寫法，下面的是測試用～

    .then(function(users){
      console.log(" find users !");
      console.log(users);
      console.log(" find types of users:");
      console.log("2020.11.17");
      console.log(typeof(users));
      //return res.json("happy");
      // 若沒有封裝成json，直接return users則另一邊會卡住永遠跑不出結果
      return res.json(users)
    })
    // return status(400) and the error message
    .catch(err => res.status(400).json('Error: ' + err));
});

// The second endpoint handles incoming HTTP POST requests on the /users/add/ URL path.
router.route('/add').post((req, res) => {
  // the new username is part of the request body 
  // so wrapped up body.username is going to be assigned to this username variable
  const username = req.body.username;

  // 1126
  const location = req.body.location;
  const contact1 = req.body.contact1;
  const contact2 = req.body.contact2;


  // use username to create a new instance of User
  // 1126 modified
  const newUser = new User({username, location, contact1, contact2});

  // save newUser to DB with save method
  newUser.save()
    // once saved, we'll return 'User added!' in JSON
    .then(() => res.json('Company added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// 1126 delete company
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('Company deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// standard thing for module file (i.e. module file都會這樣寫～)
module.exports = router;