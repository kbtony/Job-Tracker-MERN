
const router = require('express').Router();
let Company = require('../models/user.model');

router.route('/').get((req, res) => {

  Company.find()

    //.then(users => res.json(users))

    .then(function(users){
      //console.log(" find users !");
      //console.log(users);
      //console.log(" find types of users:" + typeof(users));
      return res.json(users)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const location = req.body.location;
  const contact1 = req.body.contact1;
  const contact2 = req.body.contact2;

  // create a new instance
  const newUser = new Company({username, location, contact1, contact2});

  // save it to DB
  newUser.save()
    .then(() => res.json('Company added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Company.findById(req.params.id)
    .then(company => res.json(company))
    .catch(err => res.status(400).json('Error: ' + err));
});

// delete company
router.route('/:id').delete((req, res) => {
  Company.findByIdAndDelete(req.params.id)
    .then(() => res.json('Company deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// edit company
router.route('/update/:id').post((req, res) => {
  Company.findById(req.params.id)
    .then(company => {
      company.username = req.body.username;
      company.location = req.body.location;
      company.contact1 = req.body.contact1;
      company.contact2 = req.body.contact2;

      company.save()
        .then(() => res.json('Company updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;