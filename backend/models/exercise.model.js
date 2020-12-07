
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  company: { type: String, required: true },
  jobTitle: {type: String, required: true},
  description: { type: String, required: true },
  duration: { type: Number, required: false },
  date: { type: Date, required: true },
  status: {type:String, required:false },
}, {
  timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;