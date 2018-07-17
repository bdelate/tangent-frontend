// project imports
import { toggleError } from '../../actions';

// 3rd party imports
import axios from 'axios';

function saveEmployees(employees) {
  return {
    type: 'SAVE_EMPLOYEES',
    employees: employees
  };
}

function saveCurrentUserDetails(data) {
  return {
    type: 'SAVE_CURRENT_USER_DETAILS',
    data: data
  };
}

export const selectEmployee = (id) => {
  return {
    type: 'EMPLOYEE_SELECTED',
    id: id
  }
}

// retrieve details of the currently logged in user
export const loadCurrentUserDetails = () => {
  return dispatch => {
    axios
      .get('/api/employees/me/')
      .then(res => {
        dispatch(saveCurrentUserDetails(res.data));
        dispatch(saveEmployees([res.data]));
      })
      .catch(error => {
        const message = 'Error: Unable to load employee data';
        dispatch(toggleError(message));
      });
  };
};

// retrieve list of all employees from the server if the user is permitted to
// do so
export const loadEmployees = () => {
  return dispatch => {
    axios
      .get('/api/employees/')
      .then(res => {
        dispatch(saveEmployees(res.data));
      })
      .catch(error => {
        // error not applicable since the user is simply not permitted to list  
      });
  };
};