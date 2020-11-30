
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// react bootstrap navbar collapse hamburger button
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';

// components
import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import EditCompany from "./components/edit-company.component";
import CompaniesList from './components/companies-list.component';


function App() {
  return (
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
  );
}

export default App;
