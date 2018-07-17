// react imports
import React, { Component } from 'react'

// project imports
import Controls from '../../components/Controls/Controls';
import Employees from '../Employees/Employees';
import EmployeeDetail from '../EmployeeDetail/EmployeeDetail';

// 3rd party imports
import { connect } from 'react-redux';
import axios from 'axios';

class Home extends Component {

  state = {};

  componentDidMount() {
    if (this.props.authToken) {
      axios.defaults.headers.common['Authorization'] = `JWT ${
        this.props.authToken
        }`;
    } else {
      this.props.history.push('/auth');
    }
  }

  // called when the props change (eg: authToken removed upon logout)
  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...nextProps };
  }

  // if authToken is removed, navigate to '/auth'
  componentDidUpdate(prevProps, prevState) {
    if (prevState.authToken !== null && this.props.authToken === null) {
      this.props.history.push('/auth');
    }
  }

  render() {
    return (
      <div>
        <Controls />
        <Employees />
        <EmployeeDetail />
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