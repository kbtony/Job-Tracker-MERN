// 前兩行這是固定寫法
const mongoose = require('mongoose');
// a schema is a method we get from mongoose
const Schema = mongoose.Schema;

// With Mongoose, everything is derived from a Schema. 
// Let's get a reference to it and define our 'userSchema'
// https://mongoosejs.com/docs/index.html

// Each schema maps to a MongoDB collection and defines the shape 
// of the documents within that collection.
// https://mongoosejs.com/docs/guide.html

// two ways to set up key value pairs
// 1. username: String,  <- implicitly sets the data type to String
// 2. 如下所示
// userSchema(自訂) = the name of the schema
const userSchema = new Schema({
  // this schema has a single field 'username'(自訂)  
  username: {
    // we have some validation to the user name
    type: String,
    // the followings are optional fields
    // this field(指username吧？！) is required in order for this model to be saved
    required: true,
    // e.g.一個email只能註冊一次
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
  }
}, {
  // include timestamps to automatically create fields for when it was created/modified
  timestamps: true,
});

// FreeCodeCamp: exporting our model for usage in other files
// 官網: To use our schema definition, we need to convert our blogSchema 
//      into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema)
//      A model is a class with which we construct documents.
//      https://mongoosejs.com/docs/index.html
// 橘色＆綠色的'User'都是自訂的名字，綠色的就是單純這兩行code要用，不會跟其他檔案有連結 (若用第二種寫法則沒有綠色的'User')
// 重要的是橘色的User是the singular (單數) name of the collection your model is for
// https://mongoosejs.com/docs/models.html
// https://mongoosejs.com/docs/index.html
// mongodb會根據橘色名字在db創一個以此為名的collection(會lowercase並加上s變複數)
// 且Mongoose automatically looks for the plural, lowercased version of your model name.
// 故 the model 'User' is for the 'users' collection in the database
// 橘色User和綠色User不一定要相同 (雖然官網給的範例都是相同的)
const User = mongoose.model('Company', userSchema);
module.exports = User;

// 寫法二
// module.exports = mongoose.model('User', userSchema);

