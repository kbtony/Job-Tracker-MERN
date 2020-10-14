const express = require('express');
const cors = require('cors');

//connect to our database on MongoDB Atlas (1)
const mongoose = require('mongoose');

//video 15:50
//so we could have our environment variables in the .env file
require('dotenv').config();

//this is how we going to create the Express server
//make the server listen on port 5000
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors()); // CORS middleware
app.use(express.json()); // allows us to parse JSON 

//testing point by Tony
console.log('testing point 1')



//(1)
//uri is our database URI (get from MongoDB dashboard)
//ATLAS_URI這名字是自訂的(可命名為MONGO_URI)
const uri = process.env.ATLAS_URI;
//pass in the uri that is where our database is stored
//we have some flags here: useNewUrlParser & useCreateIndex 
//詳見blog~雖有點不太理解...in sum, put these flags to deal with 
//some of the update to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,}
);
const connection = mongoose.connection;
//once the connection is open, it's going to log "establish successfully"
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


/*
//寫法二，這感覺比較好。連線成功會print connected...,失敗會catch error
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //下面這行不確定有沒有必要
  useCreateIndex: true
})
.then(() => {console.log('MongoDB Connected…')})
.catch(err => console.log(err))
*/






/*
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
*/


//server starts to listen on a certain port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});