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

function appendNewEmployee(state, employee) {
  const employees = [...state.employees];
  employees.unshift(employee);
  return {
    ...state,
    employees: employees
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
    case 'APPEND_NEW_EMPLOYEE':
      return appendNewEmployee(state, action.employee)
    default:
      return state;
  }
};

export default reducer;