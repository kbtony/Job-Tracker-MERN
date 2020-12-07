
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
  username: {
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

const User = mongoose.model('Company', companySchema);
module.exports = User;

// 寫法二
// module.exports = mongoose.model('User', userSchema);

