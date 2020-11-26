// 1126 show all companyies

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// 因為下面companyList()中return <Company company=...., 所以這裡是props.company......
// 1126 未完成！！少一個 edit-company.component.js!!!!
const Company = props => (
  <tr>
    <td>{props.company.username}</td>
    <td>{props.company.location}</td>
    <td>{props.company.contact1}</td>
    <td>{props.company.contact2}</td>
    <td>
      <Link to={"/edit/"+props.company._id}>edit</Link> | <a href="#" onClick={() => { props.deleteCompany(props.company._id) }}>delete</a>
    </td>
  </tr>
)



// This is implemented as a class component
export default class CompaniesList extends Component {
  constructor(props) {
    super(props);

    this.deleteCompany = this.deleteCompany.bind(this)

    // intialize the state to an empty company array
    this.state = {companies: []};
  }

  // get the exercise form the DB
  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        // get all the fields of the exercise (id, discription, duration, ...) 
        // and put it in the 'companies' array
        this.setState({ companies: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteCompany(id) {
    axios.delete('http://localhost:5000/users/'+id)
      .then(response => { console.log(response.data)});

    // after the user delete the exercise, we want to also delete the element
    // from what has displayed to the user
    // whenever you do setState, react will automatically update the page with that new state
    this.setState({
      // for every element in the 'companies' array (el), we'll gonna return if the el._id !== id
      // p.s. in MongoDB, the _id is automatically created when we create the object
      companies: this.state.companies.filter(el => el._id !== id)
    })
  }

  // This method going to return the rows of the table,
  // iterating through the list of exercise items by using the map function. 
  // Each exercise item (currentcompany) is output with the Exercise component.
  // The Exercise component is basically a row of table, and we're going to pass in 
  // three props:exercise, deleteCompany, key (think of exercise as variable anf {}內的是value)
  companyList() {
    return this.state.companies.map(currentcompany => {
      return <Company company={currentcompany} deleteCompany={this.deleteCompany} key={currentcompany._id}/>;
    })
  }

  render() {
    return (
      // the body will call the companyList() method
      <div>
        <h3>Logged Companies</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Company22</th>
              <th>Location</th>
              <th>Contact1</th>
              <th>Contact2</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.companyList() }
          </tbody>
        </table>
      </div>
    )
  }
}


