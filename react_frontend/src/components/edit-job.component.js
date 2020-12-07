
// update thing with the props based on what's going on 

import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

export default class EditJob extends Component {
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
    axios.get('http://localhost:5000/jobs/'+this.props.match.params.id)
    //axios.get('http://3.25.86.157:5000/jobs/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          company: response.data.company,
          jobTitle: response.data.jobTitle,
          description: response.data.description,
          duration: response.data.duration,
          status: response.data.status,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/companies/')
    //axios.get('http://3.25.86.157:5000/companies/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            companies: response.data.map(user => user.name),
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

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const job = {
      company: this.state.company,
      jobTitle: this.state.jobTitle,
      description: this.state.description,
      duration: this.state.duration,
      status: this.state.status,
      date: this.state.date
    }

    //console.log(job);

    axios.post('http://localhost:5000/jobs/update/' + this.props.match.params.id, job)
    //axios.post('http://3.25.86.157:5000/jobs/update/' + this.props.match.params.id, job)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
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