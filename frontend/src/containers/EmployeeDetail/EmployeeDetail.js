// react imports
import React, { Component, Fragment } from 'react'

// project imports
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import { toggleError } from '../../actions';
import { selectEmployee, removeEmployeeFromList } from '../Employees/actions';
import * as actions from './actions';

// 3rd party imports
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';


const EmployeeDetailContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const FormElementsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  text-align: center;
  color: #434348;
`;

const Label = styled.label`
  padding: 8px 0 0 8px;
  color: #434348;
  font-size: small;
`;

class EmployeeDetail extends Component {

  state = {
    employeeDetail: {
      id: null
    }
  };

  // called when the props change (eg: a different employee is selected)
  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...nextProps };
  }

  // Determine if a different employee id was selected or 'new'. Else do nothing.
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedEmployeeId !== this.props.selectedEmployeeId) {
      if (this.props.selectedEmployeeId === 'new') {
        this.createEmptyEmployee();
      } else if (this.props.selectedEmployeeId) {
        this.handleLoadEmployeeDetail(this.props.selectedEmployeeId);
      }
    }
  }

  createEmptyEmployee = () => {
    const employeeDetail = {
      id: 'new',
      username: '',
      cell_phone: '',
      first_name: '',
      last_name: '',
      email: '',
      salary: '',
      rank: 'Junior',
      password: ''
    };
    this.setState({ employeeDetail: employeeDetail });
  };

  // retrieve employee data from the server for the specified employee id
  handleLoadEmployeeDetail = (id) => {
    if (this.props.error) this.props.toggleError(null);
    axios
      .get(`/api/employees/${id}/`)
      .then(res => {
        this.setState({ employeeDetail: res.data });
      })
      .catch(error => {
        const message = 'Error: Unable to load employee data';
        this.props.toggleError(message);
      });
  };

  // update state which in turn updates the form when changes are made
  handleFormChange = (event) => {
    const employeeDetail = { ...this.state.employeeDetail };
    employeeDetail[event.target.name] = event.target.value;
    this.setState({
      ...this.state,
      employeeDetail: employeeDetail
    })
  };

  // submit the form using either post or patch depending on new vs existing
  // employee
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.toggleError(null);
    const data = {
      username: event.target.username.value,
      cell_phone: event.target.cell_phone.value,
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      email: event.target.email.value,
      salary: event.target.salary.value,
      rank: event.target.rank.value
    };
    if (this.props.selectedEmployeeId !== 'new') {
      data['id'] = this.props.selectedEmployeeId;
      axios
        .patch(`/api/employees/${data.id}/`, data)
        .then(res => {
          this.props.selectEmployee(null);
          this.props.updateEmployee(data);
        })
        .catch(error => {
          this.props.toggleError('Error: Unable to update employee details');
        });
    } else {
      data['password'] = event.target.password.value;
      axios
        .post(`/api/employees/`, data)
        .then(res => {
          this.props.selectEmployee(null);
          this.props.appendNewEmployee(res.data);
        })
        .catch(error => {
          this.props.toggleError('Error: Unable to create new employee');
        });
    }
  };

  handleDelete = (event) => {
    event.preventDefault();
    axios
      .delete(`/api/employees/${this.props.selectedEmployeeId}/`)
      .then(res => {
        this.props.removeEmployeeFromList(this.props.selectedEmployeeId);
        this.props.selectEmployee(null);
      })
      .catch(error => {
        this.props.toggleError('Error: Unable to delete employee');
      });
  };

  render() {
    const error = this.props.error ? <div>{this.props.error}</div> : null;
    let form = null;
    let deleteButton = null;

    if (this.state.employeeDetail.id && this.props.selectedEmployeeId) {
      const isManager = this.props.user.rank === 'Management' ? true : false;

      const rankOptions = {
        'Management': 'Management',
        'Senior': 'Senior',
        'Intermediate': 'Intermediate',
        'Junior': 'Junior'
      }

      let passwordField = null;

      // password must be set when creating a new employee
      if (this.props.selectedEmployeeId === 'new'
        && this.state.employeeDetail.password !== undefined) {
        passwordField = (
          <Fragment>
            <Label htmlFor="password">Password</Label>
            <Input
              domProps={{
                type: 'password',
                name: 'password',
                required: 'required',
                placeholder: 'Password',
                value: this.state.employeeDetail.password,
                onChange: (e) => this.handleFormChange(e)
              }}
            />
          </Fragment>
        );
      }

      if (this.props.selectedEmployeeId !== 'new' && isManager) {
        deleteButton = (
          <Button domProps={{ onClick: (e) => this.handleDelete(e) }}>Delete</Button>
        )
      }

      form = (
        <div>
          <Header>Employee Details</Header>
          {error}
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <FormElementsContainer>
              <Label htmlFor="username">Username</Label>
              <Input
                domProps={{
                  type: 'text',
                  name: 'username',
                  required: 'required',
                  placeholder: 'Username',
                  value: this.state.employeeDetail.username,
                  onChange: (e) => this.handleFormChange(e)
                }}
              />
              <Label htmlFor="cell_phone">Cell Phone</Label>
              <Input
                domProps={{
                  type: 'text',
                  name: 'cell_phone',
                  required: 'required',
                  placeholder: 'Cell Phone',
                  value: this.state.employeeDetail.cell_phone,
                  onChange: (e) => this.handleFormChange(e)
                }}
              />
              <Label htmlFor="first_name">First Name</Label>
              <Input
                domProps={{
                  type: 'text',
                  name: 'first_name',
                  required: 'required',
                  placeholder: 'First name',
                  value: this.state.employeeDetail.first_name,
                  onChange: (e) => this.handleFormChange(e)
                }}
              />
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                domProps={{
                  type: 'text',
                  name: 'last_name',
                  required: 'required',
                  placeholder: 'Last name',
                  value: this.state.employeeDetail.last_name,
                  onChange: (e) => this.handleFormChange(e)
                }}
              />
              <Label htmlFor="email">Email</Label>
              <Input
                domProps={{
                  type: 'email',
                  name: 'email',
                  required: 'required',
                  placeholder: 'Email',
                  value: this.state.employeeDetail.email,
                  onChange: (e) => this.handleFormChange(e)
                }}
              />
              <Label htmlFor="salary">Salary</Label>
              <Input
                domProps={{
                  type: 'number',
                  name: 'salary',
                  required: 'required',
                  placeholder: 'Salary',
                  disabled: !isManager,
                  value: this.state.employeeDetail.salary,
                  onChange: (e) => this.handleFormChange(e)
                }}
              />
              {passwordField}
              <Label htmlFor="rank">Rank</Label>
              <Select
                domProps={{
                  onChange: (e) => this.handleFormChange(e),
                  name: 'rank',
                  required: 'required',
                  value: this.state.employeeDetail.rank,
                  disabled: !isManager,
                }}
                options={rankOptions}
              />
              <Button domProps={{ type: 'submit' }}>Save</Button>
              {deleteButton}
            </FormElementsContainer>
          </form>
        </div>
      )
    }

    return (
      <EmployeeDetailContainer>
        {form}
      </EmployeeDetailContainer >
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedEmployeeId: state.employees.selectedEmployeeId,
    user: state.employees.user,
    error: state.global.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectEmployee: (id) => dispatch(selectEmployee(id)),
    appendNewEmployee: (employee) => dispatch(actions.appendNewEmployee(employee)),
    removeEmployeeFromList: (id) => dispatch(removeEmployeeFromList(id)),
    updateEmployee: (employee) => dispatch(actions.updateEmployee(employee)),
    toggleError: (error) => dispatch(toggleError(error))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeDetail);
