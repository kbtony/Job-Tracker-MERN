
// the homepage that shows every applied job

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// fontawsome icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'


// a functional react component 
const Job = props => (
  <tr>
    <td style={{color: "white"}}>{props.job.company}</td>
    <td>{props.job.jobTitle}</td>
    <td>{props.job.description}</td>
    <td>{props.job.duration}</td>
    <td>{props.job.status}</td>
    <td>{props.job.date.substring(0,10)}</td>
    <td>
      <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div className="btn-group mr-3" id="tableButton" role="group" >
          <Link to={"/edit-job/"+props.job._id} >
            <FontAwesomeIcon icon={faPencilAlt} />
          </Link>
        </div>
        <div className="btn-group" id="tableButton" role="group">
          <a href="#" onClick={() => { props.deleteJob(props.job._id) }} style={{color:'red'}}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </a>
        </div>
      </div>
    </td>
  </tr>
)

// a class component
export default class JobsList extends Component {
  constructor(props) {
    super(props);

    this.deleteJob = this.deleteJob.bind(this)
    // intialize the state to an empry job array
    this.state = {jobs: []};
  }

  // get the job form the DB
  componentDidMount() {
    axios.get('http://localhost:5000/jobs/')
    //axios.get('http://3.25.86.157:5000/jobs/')
      .then(response => {
        // get all the fields of the job (id, discription, duration, ...) 
        console.log(response.data);
        this.setState({ jobs: response.data });        
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteJob(id) {
    axios.delete('http://localhost:5000/jobs/'+id)
    //axios.delete('http://3.25.86.157:5000/jobs/'+id)
      .then(response => { console.log(response.data)});

    // after the delete operation, automatically update the page with that new state
    this.setState({
      jobs: this.state.jobs.filter(el => el._id !== id)
    })
  }

  // return the rows of the table
  jobList() {
    return this.state.jobs.map(currentjob => {
      return <Job job={currentjob} deleteJob={this.deleteJob} key={currentjob._id}/>;
    })
  }

  render() {
    return (
      // the body will call the jobList() method
      //<div style={"overflow-x:auto;"}>
      //<div style={{overflow-x: "auto"}}>
      <div className="rTable">
        <h3>Appliedsss Jobs</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Job Title</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.jobList() }
          </tbody>
        </table>
      </div>
    )
  }
}


