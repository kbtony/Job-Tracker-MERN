// 標準寫法～
import React, { Component } from 'react';
// since we use react-router, we import Link which allows us to link to different routes
import { Link } from 'react-router-dom';

// ReactJS components
export default class Navbar extends Component {

  render() {
    return (
      // this code is just the navbar from the bootstrap documentation converted to work on our purposes
      // 1. In React, the attribute is className, not class.
      // 2. the Link (from react-router) instead of an anchor tag, but it just show up the same way
      //    show what we are going to link to (different URLs)
      // 3. we have special classes e.g. "navbar navbar-dark bg-dark navbar-expand-lg"
      //    just a style using bootstrap style (check documentation to learn more).
      // 4. 白字的ExcerTracker, Exercises, Create Exercise Log, Create User是UI的名字～～
      // 5. collapse navbar-collapse <- freecodecamp打錯字，沒發揮collapse的效果
      // 6. 自己參考bootstrap官網加上navbar-toggler來使collapse功能完善
      //    但是要搭配jquery (需$ npm install jquery並在App.js import)才可work
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Job Tracker</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item active">
            <Link to="/" className="nav-link">Company</Link>
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