// this will be the homepage of our app and show every exercise
// this file has two components: Exercise & ExercisesList

import React, { Component } from 'react';
// navbar.component.js也有Link, 在此是為了Exercise component
import { Link } from 'react-router-dom';
import axios from 'axios';

// 1:40:00
// This component is implemented as a functional react component
// The key thing that makes this type of component different from a class component 
// is the lack of state and lifecycle methods. If all you need to do is to accept props 
// and return JSX, use a functional component instead of a class component.
// p.s. the date is a full day/time string (includes day time, time zoon,..) and we
// just want the date part (so we use substring())
// it Link to another URL which will load another component on the page
// the v=best practice here (指a href="#"...?!?!?) is to use a button style it as a link
const Exercise = props => (
  <tr>
    <td>{props.exercise.company}</td>
    <td>{props.exercise.jobTitle}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.status}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

// This is implemented as a class component
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
        // and put it in the 'exercises' array
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    // after the user delete the exercise, we want to also delete the element
    // from what has displayed to the user
    // whenever you do setState, react will automatically update the page with that new state
    this.setState({
      // for every element in the 'exercises' array (el), we'll gonna return if the el._id !== id
      // p.s. in MongoDB, the _id is automatically created when we create the object
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  // This method going to return the rows of the table,
  // iterating through the list of exercise items by using the map function. 
  // Each exercise item (currentexercise) is output with the Exercise component.
  // The Exercise component is basically a row of table, and we're going to pass in 
  // three props:exercise, deleteExercise, key (think of exercise as variable anf {}內的是value)
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
          <thead className="thead-light">
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


