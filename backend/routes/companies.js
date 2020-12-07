
const router = require('express').Router();
let Company = require('../models/company.model');

router.route('/').get((req, res) => {

  Company.find()

    //.then(companies => res.json(companies))

    .then(function(companies){
      //console.log(" find companies !");
      //console.log(companies);
      //console.log(" find types of companies:" + typeof(companies));
      return res.json(companies)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const location = req.body.location;
  const contact1 = req.body.contact1;
  const contact2 = req.body.contact2;

  // create a new instance
  const newCompany = new Company({name, location, contact1, contact2});

  //console.log(newCompany);

  // save it to DB
  newCompany.save()
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
      company.name = req.body.name;
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