//前兩行這是固定寫法
const mongoose = require('mongoose');
//a schema is a method we get from mongoose
const Schema = mongoose.Schema;

//two ways to set up key value pairs
// 1. username: String,  <- implicitly sets the data type to String
// 2. 如下所示
// userSchema(自訂) = the name of the schema
const userSchema = new Schema({
  //this schema has a single field 'username'(自訂)  
  username: {
    //we have some validation to the user name
    type: String,
    //the followings are optional fields
    //this field(指username吧？！) is required in order for this model to be saved
    required: true,
    //e.g.一個email只能註冊一次
    unique: true,
    //trim whitespace off the end if someone types in some spaces
    trim: true,
    //at least three charaters long
    minlength: 3
  },
}, {
  //include timestamps to automatically create fields for when it was created/modified
  timestamps: true,
});

//exporting our model for usage in other files
//'User' is just the name we gonna use(自訂)
const User = mongoose.model('User', userSchema);
module.exports = User;

//寫法二, where User= , userSchema=
//module.exports = mongoose.model('User', userSchema);

