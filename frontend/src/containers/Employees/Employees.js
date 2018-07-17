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
      this.props.loadEmployees();  // retrieve employees from the server
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
    loadEmployees: () => dispatch(actions.loadEmployees())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Employees);