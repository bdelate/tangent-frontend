// react imports
import React, { Component } from 'react'

// project imports
import Employees from '../Employees/Employees';

// 3rd party imports
import { connect } from 'react-redux';
import axios from 'axios';

class Home extends Component {

  componentDidMount() {
    if (this.props.authToken) {
      axios.defaults.headers.common['Authorization'] = `JWT ${
        this.props.authToken
        }`;
    } else {
      this.props.history.push('/auth');
    }
  }

  render() {
    return (
      <div>
        <Employees />
        test
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  null
)(Home);