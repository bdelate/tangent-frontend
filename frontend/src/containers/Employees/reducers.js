const initialState = {
  employees: [],
  selectedEmployeeId: null,
  user: null,
  renderCount: 0
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

function removeEmployeeFromList(state, id) {
  const employees = state.employees.filter(
    employee => employee.id !== id
  )
  return {
    ...state,
    employees: employees
  }
}

function updateEmployee(state, updatedEmployee) {
  const employees = state.employees.map(
    employee => {
      if (employee.id === updatedEmployee.id) {
        return updatedEmployee
      } else {
        return employee
      }
    }
  )
  return {
    ...state,
    employees: employees,
    renderCount: state.renderCount + 1
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
    case 'REMOVE_EMPLOYEE_FROM_LIST':
      return removeEmployeeFromList(state, action.id)
    case 'UPDATE_EMPLOYEE':
      return updateEmployee(state, action.employee)
    default:
      return state;
  }
};

export default reducer;