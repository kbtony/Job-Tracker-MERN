
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  // the information we are going to store for exercises
  company: { type: String, required: true },
  jobTitle: {type: String, required: true},
  description: { type: String, required: true },
  duration: { type: Number, required: false },
  // 如果不是required, 可有第二種寫法
  // date: { tupe: Date, default: Date.now}
  // default is used in case of the user hasn't input anything to the field or nothing 
  // has been generated. we can set a default key to make sure something is saved
  date: { type: Date, required: true },
  status: {type:String, required:false },
}, {
  // 注意！timestamps要和上面的entry分開放在不同大括號內
  timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;