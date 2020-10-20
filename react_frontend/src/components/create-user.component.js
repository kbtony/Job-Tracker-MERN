import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);

    // send the HTTP post request to this backend endpoint(http://localhost:5000/users/add)
    // This endpoint is expecting a JSON object in the request body so we passed in 
    // the newUser object as a second argument.
    axios.post('http://localhost:5000/users/add', user)
      // this is going to be a promise, so after it's posted, we're gonna do something
      .then(res => console.log(res.data));

    // keep the user on this page(create-user) after submit 
    // so they can create multiple users at a time
    this.setState({
      username: ''
    })
  }

  render() {
    return (
      // what we gonna render here is a very simple web form that has one field
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}