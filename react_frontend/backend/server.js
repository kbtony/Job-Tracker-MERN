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

//(1)
//uri is our database URI (get from MongoDB dashboard)
const uri = process.env.ATLAS_URI;
//pass in the uri that is where our database is stored
//we have some flags here: useNewUrlParser & useCreateIndex 
//詳見blog~雖有點不太理解...in sum, put these flags to deal with 
//some of the update to MongoDB

console.log('testing point 1')

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
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