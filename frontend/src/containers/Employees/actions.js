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

// retrieve list of all employees from the server. If the user is not permitted
// to do this, then just retrieve the details for the current user.
export const loadEmployees = () => {
  return dispatch => {
    axios
      .get('/api/employees/')
      .then(res => {
        dispatch(saveEmployees(res.data));
      })
      .catch(error => {
        axios
          .get('/api/employees/me/')
          .then(res => {
            dispatch(saveEmployees([res.data]));
          })
          .catch(error => {
            const message = 'Error: Unable to load employee data';
            dispatch(toggleError(message));
          });
      });
  };
};