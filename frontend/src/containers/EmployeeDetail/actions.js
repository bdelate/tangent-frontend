// project imports
import { toggleError } from '../../actions';

// 3rd party imports
import axios from 'axios';


function employeeDetailReceived(data) {
  return {
    type: 'EMPLOYEE_DETAIL_RECEIVED',
    data: data
  };
}

// when a new employee is created, add their username to the employee list
export const appendNewEmployee = (employee) => {
  return {
    type: 'APPEND_NEW_EMPLOYEE',
    employee: employee
  }
};

// retrieve details for the specified employee id
export const loadEmployeeDetail = (id) => {
  return dispatch => {
    dispatch(toggleError(null));
    axios
      .get(`/api/employees/${id}/`)
      .then(res => {
        dispatch(employeeDetailReceived(res.data));
      })
      .catch(error => {
        const message = 'Error: Unable to load employee data';
        dispatch(toggleError(message));
      });
  };
};