
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      // navbar from bootstrap
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Job Tracker</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
            <Link to="/company" className="nav-link">Company</Link>
            </li>
            <li className="navbar-item">
            <Link to="/create" className="nav-link">Create Job Log</Link>
            </li>
            <li className="navbar-item">
            <Link to="/user" className="nav-link">Create Company</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}