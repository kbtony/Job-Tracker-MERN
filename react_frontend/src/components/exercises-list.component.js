
// the homepage that shows every applied job

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// fontawsome icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'


// a functional react component 
const Exercise = props => (
  <tr>
    <td style={{color: "white"}}>{props.exercise.company}</td>
    <td>{props.exercise.jobTitle}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.status}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div className="btn-group mr-3" id="tableButton" role="group" >
          <Link to={"/edit1/"+props.exercise._id} >
            <FontAwesomeIcon icon={faPencilAlt} />
          </Link>
        </div>
        <div className="btn-group" id="tableButton" role="group">
          <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }} style={{color:'red'}}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </a>
        </div>
      </div>
    </td>
  </tr>
)

// a class component
export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)
    // intialize the state to an empry exercise array
    this.state = {exercises: []};
  }

  // get the exercise form the DB
  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        // get all the fields of the exercise (id, discription, duration, ...) 
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    // after the delete operation, automatically update the page with that new state
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  // return the rows of the table
  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      // the body will call the exerciseList() method
      <div>
        <h3>Logged Jobs</h3>
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
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}


