const express = require('express');
const cors = require('cors');
//const mongoose = require('mongoose');

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

/*
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
*/

//server starts to listen on a certain port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});