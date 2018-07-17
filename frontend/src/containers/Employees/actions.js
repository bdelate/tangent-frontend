import axios from 'axios';

function saveEmployees(employees) {
  return {
    type: 'SAVE_EMPLOYEES',
    employees: employees
  };
}

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
            console.log(error)
            // dispatch(loadEmployeeDetail(id));
          });
      });
  };
};