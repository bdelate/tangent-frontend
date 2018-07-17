const initialState = {
  employees: [],
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_CURRENT_USER_DETAILS':
      return saveCurrentUserDetails(state, action.data);
    case 'SAVE_EMPLOYEES':
      return saveEmployees(state, action.employees);
    default:
      return state;
  }
};

export default reducer;