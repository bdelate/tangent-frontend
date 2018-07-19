// react imports
import React, { Component } from 'react'

// project imports
import Controls from '../../components/Controls/Controls';
import Employees from '../Employees/Employees';
import EmployeeDetail from '../EmployeeDetail/EmployeeDetail';
import { selectEmployee } from '../Employees/actions';

// 3rd party imports
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
`;

const FormSectionContainer = styled.div`
  width: 100%
`;

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
      <Container>
        <div>
          <Controls user={this.props.user} displayCreateEmployeeForm={this.props.selectEmployee} />
          <Employees />
        </div>
        <FormSectionContainer>
          <EmployeeDetail />
        </FormSectionContainer>
      </Container>
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