// react imports
import React, { Component } from 'react'

// project imports
import Controls from '../../components/Controls/Controls';
import Employees from '../Employees/Employees';
import EmployeeDetail from '../EmployeeDetail/EmployeeDetail';
import { selectEmployee } from '../Employees/actions';

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
        <Controls user={this.props.user} displayCreateEmployeeForm={this.props.selectEmployee} />
        <Employees />
        <EmployeeDetail />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.employees.user,
    authToken: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectEmployee: (id) => dispatch(selectEmployee(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);