// react imports
import React, { Component } from 'react'

// project imports
import * as actions from './actions';

// 3rd party imports
import { connect } from 'react-redux';
import axios from 'axios';

class Employees extends Component {

  componentDidMount() {
    if (this.props.authToken) {
      axios.defaults.headers.common['Authorization'] = `JWT ${
        this.props.authToken
        }`;
      // retrieve user details to determine permissions (ie: rank)
      this.props.loadCurrentUserDetails();
      // retrieve employees from the server
      this.props.loadEmployees();
    }
  }

  render() {
    return (
      <div>
        employees placeholder
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.token,
    employees: state.employees.employees
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCurrentUserDetails: () => dispatch(actions.loadCurrentUserDetails()),
    loadEmployees: () => dispatch(actions.loadEmployees())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Employees);