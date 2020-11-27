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

// 11/25 for react bootstrap navbar collapse hamburger button -> navbar-toggler in navbar.componment.js
// https://stackoverflow.com/questions/61177287/react-bootstrap-navbar-collapse-hamburger-button-does-not-show-nav-items
// 只安裝了jQuery, 測試後下面這兩個import好像用不到
//import $ from 'jquery';
//import Popper from 'popper.js';
import "bootstrap/dist/js/bootstrap.bundle.min";

// 1127 這行註掉就有原本的style
import './App.css';


// because we implement these components in saperated file
import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import EditCompany from "./components/edit-company.component";
import CompaniesList from './components/companies-list.component';


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
    // 7. 'exact'的作用在此 https://stackoverflow.com/questions/49162311/react-difference-between-route-exact-path-and-route-path
    // 8. 但不知為何要放在component 前而不是exact path="/"
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ExercisesList} />
        <Route path="/company" component={CompaniesList} />
        <Route path="/edit1/:id" component={EditExercise} />
        <Route path="/edit2/:id" component={EditCompany} />
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
