const initialState = {
  employees: []
};

function saveEmployees(state, employees) {
  return {
    ...state,
    employees: employees
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_EMPLOYEES':
      return saveEmployees(state, action.employees);
    default:
      return state;
  }
};

export default reducer;