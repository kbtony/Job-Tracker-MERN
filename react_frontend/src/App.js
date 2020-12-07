
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// react bootstrap navbar collapse hamburger button
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';

// components
import Navbar from "./components/navbar.component"
import JobList from "./components/jobs-list.component";
import CreateJob from "./components/create-job.component";
import EditJob from "./components/edit-job.component";
import CompaniesList from './components/companies-list.component';
import CreateCompany from "./components/create-company.component";
import EditCompany from "./components/edit-company.component";


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={JobList} />
        <Route path="/company-list" component={CompaniesList} />
        <Route path="/edit-job/:id" component={EditJob} />
        <Route path="/edit-company/:id" component={EditCompany} />
        <Route path="/create-job" component={CreateJob} />
        <Route path="/create-company" component={CreateCompany} />
      </div>
    </Router>
  );
}

export default App;
