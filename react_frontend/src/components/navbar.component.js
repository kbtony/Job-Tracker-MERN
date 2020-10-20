// 標準寫法～
import React, { Component } from 'react';
// since we use react-router, we import Link which allows us to link to different routes
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      // this code is just the navbar from the bootstrap documentation converted to work on our purposes
      // 1. instead class we have className
      // 2. the Link (from react-router) instead of an anchor tag, but it just show up the same way
      //    show what we are going to link to (different URLs)
      // 3. we have special classes e.g. "navbar navbar-dark bg-dark navbar-expand-lg"
      //    just a style using bootstrap style (check documentation to learn more)
      // 4. 白字的ExcerTracker, Exercises, Create Exercise Log, Create User是UI的名字～～
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">ExcerTracker Yaa!</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}