
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    // trim whitespace off the end if someone types in some spaces
    trim: true,
    // at least three charaters long
    minlength: 3
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  contact1: {
    type: String,
    required: false,
    trim: true
  },
  contact2: {
    type: String,
    required: false,
    trim: true
  },
}, {
  // include timestamps to automatically create fields for when it was created/modified
  timestamps: true,
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;

// Another way to code:
//module.exports = mongoose.model('Company', companySchema);

