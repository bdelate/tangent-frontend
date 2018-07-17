const initialState = {
  employees: [],
  selectedEmployeeId: null,
  user: null
};

function saveCurrentUserDetails(state, data) {
  return {
    ...state,
    user: data
  };
}

function saveEmployees(state, employees) {
  return {
    ...state,
    employees: employees
  };
}

function employeeSelected(state, id) {
  return {
    ...state,
    selectedEmployeeId: id
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_CURRENT_USER_DETAILS':
      return saveCurrentUserDetails(state, action.data);
    case 'SAVE_EMPLOYEES':
      return saveEmployees(state, action.employees);
    case 'EMPLOYEE_SELECTED':
      return employeeSelected(state, action.id)
    default:
      return state;
  }
};

export default reducer;