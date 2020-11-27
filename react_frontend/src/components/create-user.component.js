import React, { Component } from 'react';
import axios from 'axios';


export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //1126
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeContact1 = this.onChangeContact1.bind(this);
    this.onChangeContact2 = this.onChangeContact2.bind(this);


    this.state = {
      username: '',
      //1126
      location: '',
      contact1: '',
      contact2: ''

    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  //1126
  onChangeLocation(e) {
    this.setState({
      location: e.target.value
    })
  }

  onChangeContact1(e) {
    this.setState({
      contact1: e.target.value
    })
  }

  onChangeContact2(e) {
    this.setState({
      contact2: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      //1126
      location: this.state.location,
      contact1: this.state.contact1,
      contact2: this.state.contact2
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
      username: '',
      //1126
      location: '',
      contact1: '',
      contact2: ''
    })
  }

  render() {
    return (
      // what we gonna render here is a very simple web form that has one field
      // 可在input裡加上 placeholder="e.g. Google"
      <div>
        <h3>Create New Company</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Company </label>
            <label style={{color:'red'}}>＊ </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group">
            <label>Location</label> 
            <label style={{color:'red'}}>＊ </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.location}
                onChange={this.onChangeLocation}
                />
          </div>
          <div className="form-group">
            <label>Contact1</label> 
            <input  type="text"
                className="form-control"
                value={this.state.contact1}
                onChange={this.onChangeContact1}
                />
          </div>
          <div className="form-group">
            <label>Contact2</label> 
            <input  type="text"
                className="form-control"
                value={this.state.contact2}
                onChange={this.onChangeContact2}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Company" className="btn btn-outline-primary btn-sm" />
          </div>
        </form>
      </div>
    )
  }
}