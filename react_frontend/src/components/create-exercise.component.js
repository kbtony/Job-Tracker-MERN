// this component will allow us to add exercises to the DB

import React, { Component } from 'react';
import axios from 'axios';
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
    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
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
      company: '', // '' is called empty string
      jobTitle: '',
      description: '',
      duration: 0,
      status: '',
      date: new Date(),
      // we are going to something right just for this component called 'companies'
      // because there is a drop down menu that you can select all the companies that
      // are already in the DB
      companies: []
    }
  }

  /*
  // initial version, for testing, 先hard-code a single user
  componentDidMount() {
    this.setState({ 
      companies: ['test user'],
      company: 'test user'
    });
  }
  */

  // it's a react lifecycle method that react will automatically call at different point
  // componentDidMount will automatically be called right before anything display on the page
  // i.e. when the create exercise component is about to load the page, 會先執行此code
  // p.s. username會有下拉選單(從DB抓資料)給user選
  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        // check if there is at least one user in the DB
        if (response.data.length > 0) {
          this.setState({
            // data is going to be an array and we're going to map the array which will allow
            // us to return something (user.company) for every element (user) in the array
            // p.s. 在MongoDB, user還有很多其他資料(e.g. id, createdAt, updatedAt)
            // 11/26 小心！！！ 這裏的username是user.model.js中定義的，之後應該要改成company!!!
            companies: response.data.map(user => user.username),
            // so company is automatically set to the first user in the DB
            company: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }
  

  //we need to add methods which can be used to update the state properties 
  onChangeCompany(e) {
    // never do this.state.company = "Tom"
    // always use the setState method 
    this.setState({
      // set just the item we want to change
      // there's going to be a textbox for user to enter the company, whenever 
      // enter, it's going to call the onChangeCompany method
      // the target is the textbox, the value is the value of the textbox
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

  // the onChangeDate method looks a little different than the others 
  // because of the date picker library we will be adding later. (can click on the date)
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
      company: this.state.company,
      jobTitle: this.state.jobTitle,
      description: this.state.description,
      duration: this.state.duration,
      status: this.state.status,
      date: this.state.date
      
    }

    console.log(exercise);

    // Connecting Front to Back by causing our frontend to send HTTP request 
    // to the server endpoints on the backend
    axios.post('http://localhost:5000/exercises/add', exercise)
      // log the result to the console (這樣在chome的console就可以看到log)
      .then(res => console.log(res.data));

    // take the person back to our home page which is going to be the list of exercises
    window.location = '/';
  }

  render() {
    return (
    // pretty standard HTML form code
    <div>
      <h3>Create New Job Log</h3>
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