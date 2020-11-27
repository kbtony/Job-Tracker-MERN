// very similar to the create-exercise.componet
// 之後refactoring 可以把create-exercise componet & edit-exercise component 合併
// just update thing with the props based on what's going on 

import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

//1126 cancel button
import { Link } from 'react-router-dom';


export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      company: '',
      jobTitle: '',
      description: '',
      duration: 0,
      status: '',
      date: new Date(),
      companies: []
    }
  }

  componentDidMount() {
    // this.props.match.params.id <- we are getting the id directly from the URL
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          // we'll set the company from the exercise we are editing 
          company: response.data.company,
          jobTitle: response.data.jobTitle,
          description: response.data.description,
          duration: response.data.duration,
          // current date
          status: response.data.status,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            companies: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeCompany(e) {
    this.setState({
      company: e.target.value
    })
  }

  //1126
  onChangeJobTitle(e) {
    this.setState({
      jobTitle: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  //1126
  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      company: this.state.company,
      jobTitle: this.state.jobTitle,
      description: this.state.description,
      duration: this.state.duration,
      status: this.state.status,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    // pretty standard HTML form code
    <div>
      <h3>Edit Job Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Company </label>
          <label style={{color:'red'}}>＊ </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.company}
              onChange={this.onChangeCompany}>
              {
                // we can put javascript in the curly bracses
                // this.state.companies is an array of all the companies which come from our MongoDB
                // .map allows us to return something for each element in an array
                // for each 'user', it will return an 'option', which is an option of the select box
                // The DatePicker component is going to pop out a calendar (by installing a package)
                // p.s. map(), ()內的could be an arrow function if we want to refactor, now it's 
                // just a regular function
                this.state.companies.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Job Title </label>
          <label style={{color:'red'}}>＊ </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.jobTitle}
              onChange={this.onChangeJobTitle}
              />
        </div>
        <div className="form-group"> 
          <label>Description </label>
          <label style={{color:'red'}}>＊ </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes) </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group"> 
          <label>Status </label>
          <input  type="text"
              className="form-control"
              value={this.state.status}
              onChange={this.onChangeStatus}
              />
        </div>
        <div className="form-group">
          <label>Date </label>
          <label style={{color:'red'}}>＊ </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div className="input-group mr-2">
              <input type="submit" value="Edit Job Log" className="btn btn-primary" /> 
            </div>
            <div className="btn-group" role="group">
              <Link to="/">
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