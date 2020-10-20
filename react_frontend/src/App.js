// this is our manin component that we'll put all of 
// the code that will display on the page

import React from 'react';
/* 註掉，沒有要用這兩個，之後有寫CSS應該可用
import logo from './logo.svg';
import './App.css';
*/

/* 
Because we import Router from react-router-dom, we have to put everything that 
we want to be used with the router inside a router element: <Router> </Router>
*/
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// because we implement these components in saperated file
import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";


function App() {
  return (
    // 1. this is JSX
    // 2. change the className to container
    // 3. we have a router element for each route of the application
    // 4. we have several components (Navbar, ExercisesList, EditExercise, CreateExercise, CreateUser)
    // that need to be implemented 
    // 5. the path attribute is set to the URL path
    // e.g. if you go to the root URL with / at the end (i.e. http://localhost:5000/)
    // it will load the ExercisesList component
    // 6. 可以吧<div className="container">和</div>刪掉，依樣可正常運作，但畫面會沒有space on the side
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
    /* let's just return something basic
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
  );
}

export default App;
