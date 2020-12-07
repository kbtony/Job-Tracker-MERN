
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeContact1 = this.onChangeContact1.bind(this);
    this.onChangeContact2 = this.onChangeContact2.bind(this);

    this.state = {
      username: '',
      location: '',
      contact1: '',
      contact2: ''
    }
  }
  
  componentDidMount() {
    axios.get('http://localhost:5000/users/'+this.props.match.params.id)
    //axios.get('http://3.25.86.157:5000/users/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          location: response.data.location,
          contact1: response.data.contact1,
          contact2: response.data.contact2,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

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
      location: this.state.location,
      contact1: this.state.contact1,
      contact2: this.state.contact2
    }

    console.log(user);

    axios.post('http://localhost:5000/users/update/' + this.props.match.params.id, user)
    //axios.post('http://3.25.86.157:5000/users/update/' + this.props.match.params.id, user)
      .then(res => console.log(res.data));

    // redirection to '/company' after editing
    window.location = '/company';
  }

  render() {
    return (
      <div>
        <h3>Edit Company</h3>
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
            <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
              <div className="input-group mr-2">
                <input type="submit" value="Edit Company" className="btn btn-primary" /> 
              </div>
              <div className="btn-group" role="group">
                <Link to="/company">
                  <input type="button" value="Cancel" className="btn btn-danger" />
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}