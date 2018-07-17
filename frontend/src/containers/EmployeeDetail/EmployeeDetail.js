// react imports
import React, { Component } from 'react'

// project imports
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import axios from 'axios';
import { toggleError } from '../../actions';

// 3rd party imports
import { connect } from 'react-redux';


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
    if (prevState.selectedEmployeeId !== this.props.selectedEmployeeId
      && this.props.selectedEmployeeId !== null) {
      if (this.props.selectedEmployeeId === 'new') {
        // TODO - display blank form for employee creation
      } else {
        this.handleLoadEmployeeDetail(this.props.selectedEmployeeId);
      }
    }
  }

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

  render() {
    const error = this.props.error ? <div>{this.props.error}</div> : null;
    let form = null;

    if (this.state.employeeDetail.id) {
      const isManagerOrSuperuser =
        this.props.user.rank === 'Management' || this.props.user.is_superuser
          ? true
          : false;

      const rankOptions = {
        'Management': 'Management',
        'Senior': 'Senior',
        'Intermediate': 'Intermediate',
        'Junior': 'Junior'
      }

      form = (
        <form>
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
          <Input
            domProps={{
              type: 'number',
              name: 'salary',
              required: 'required',
              placeholder: 'Salary',
              disabled: !isManagerOrSuperuser,
              value: this.state.employeeDetail.salary,
              onChange: (e) => this.handleFormChange(e)
            }}
          />
          <Select
            domProps={{
              onChange: (e) => this.handleFormChange(e),
              name: 'rank',
              required: 'required',
              value: this.state.employeeDetail.rank,
              disabled: !isManagerOrSuperuser,
            }}
            options={rankOptions}
          />
        </form>
      )
    }

    return (
      <div>
        {error}
        {form}
      </div >
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
    toggleError: (error) => dispatch(toggleError(error))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeDetail);
