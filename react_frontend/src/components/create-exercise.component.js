// this component will allow us to add exercises to the DB

import React, { Component } from 'react';
//import axios from 'axios';
import DatePicker from 'react-datepicker';
// the styling for DatePicker
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  /*
  In JavaScript classes, you need to always call super when defining 
  the constructor of a subclass. All React component classes that have 
  a constructor should start it with a super(props) call.
  */
  constructor(props) {
    super(props);

    // we want 'this' to refer to the whole class, bind every methods
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    /*
    set the initial state of the component by assigning an object to this.state. 
    The properties of state will correspond to the fields in the MongoDB document.
    States are basically how you create variabe in react ?!
    p.s. 
    1. MongoDB document == DB的row ~~, 不是documentation XD
    2. Never gonna do something like let name = "Tom", in react, you gonna create 
    everything in state, so whenever you update the state, it will automatically 
    update your page with the new value
    */
    this.state = {
      // these are all the parts of the database
      username: '', // '' is called empty string
      description: '',
      duration: 0,
      date: new Date(),
      // we are going to something right just for this component called 'users'
      // because there is a drop down menu that you can select all the users that
      // are already in the DB
      users: []
    }
  }

  componentDidMount() {
    this.setState({ 
      users: ['test user'],
      username: 'test user'
    });
  }

  /*
  // it's a react lifecycle method that react will automatically call at different point
  // componentDidMount will automatically be called right before anything display on the page
  // i.e. when the create exercise component is about to load the page, 會先執行此code
  // p.s. 原本username會有下拉選單(從DB抓資料)給user選，但這裡好像要先hard-code a single user
  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }
  */
  

  //we need to add methods which can be used to update the state properties 
  onChangeUsername(e) {
    // never do this.state.username = "Tom"
    // always use the setState method 
    this.setState({
      // set just the item we want to change
      // there's going to be a textbox for user to enter the username, whenever 
      // enter, it's going to call the onChangeUsername method
      // the target is the textbox, the value is the value of the textbox
      username: e.target.value
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

  // the onChangeDate method looks a little different than the others 
  // because of the date picker library we will be adding later. (can click on the date)
  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  // After those methods, we’ll add one to handle the submit event of the form
  // when click on the submit button, it will call this method
  onSubmit(e) {
    // this prevents the default HTML form submit behavior from taking place
    // a preventDefault is called on the event when submitting the form to prevent a browser reload/refresh.?!
    // 自己測試一下上面這句話
    e.preventDefault();

    // you never just create variables normally in react, well, that's inside a 
    // single method you can create variables if they'll be used only within that method
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    /*
    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));
      */

    // take the person back to our home page which is going to be the list of exercises
    window.location = '/';
  }

  render() {
    return (
    // pretty standard HTML form code
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                // we can put javascript in the curly bracses
                // this.state.users is an array of all the users which come from our MongoDB
                // .map allows us to return something for each element in an array
                // for each 'user', it will return an 'option', which is an option of the select box
                // The DatePicker component is going to pop out a calendar (by installing a package)
                // p.s. map(), ()內的could be an arrow function if we want to refactor, now it's 
                // just a regular function
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}


/*
// 最一開始的原型長這樣，點到使頁面只會秀出下面兩行字
export default class CreateExercise extends Component {
  render() {
    return (
      <div>
        <p>You are on the Create Exercise component! Tony testing!</p>
        <p>Hello Everyone!</p>
      </div>
    )
  }
}
*/