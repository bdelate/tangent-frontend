// react imports
import React, { Component } from 'react'

// project imports
import * as actions from './actions';

// 3rd party imports
import { connect } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import VirtualList from 'react-tiny-virtual-list';


const ListContainer = styled(VirtualList)`
  margin: 10px;
  padding: 10px;
  border-radius: 2px;
  box-shadow:
    0 2px 2px 0 rgba(0,0,0,.14),
    0 3px 1px -2px rgba(0,0,0,.2),
    0 1px 5px 0 rgba(0,0,0,.12);
`;

const Row = styled.div`
  padding: 0 15px;
  border-bottom: 1px solid #bbaeaf;
  box-sizing: border-box;
  line-height: 50px;
  font-weight: 500;
  color: #434348;
  :hover {
    cursor: pointer;
    background-color: #9a2b37;
    color: #fff;
  }
`;

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

  handleSelectEmployee = (index) => {
    const id = this.props.employees[index]['id'];
    this.props.selectEmployee(id);
  };

  renderItem = ({ style, index }) => {
    return (
      <Row
        style={style}
        key={index}
        onClick={() => this.handleSelectEmployee(index)}>
        {this.props.employees[index]['first_name']} {this.props.employees[index]['last_name']}
      </Row>
    );
  };

  render() {
    return (
      <ListContainer
        width={300}
        height={600}
        itemCount={this.props.employees.length}
        itemSize={50}
        renderItem={this.renderItem}
      />
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
    loadEmployees: () => dispatch(actions.loadEmployees()),
    selectEmployee: (id) => dispatch(actions.selectEmployee(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Employees);