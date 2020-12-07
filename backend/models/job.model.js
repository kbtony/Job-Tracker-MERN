
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  company: { type: String, required: true },
  jobTitle: {type: String, required: true},
  description: { type: String, required: true },
  duration: { type: Number, required: false },
  date: { type: Date, required: true },
  status: {type:String, required:false },
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;