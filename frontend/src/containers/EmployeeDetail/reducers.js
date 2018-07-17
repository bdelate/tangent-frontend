const initialState = {};

function saveEmployeeDetail(state, data) {

  return {
    ...state,
    ...data
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EMPLOYEE_DETAIL_RECEIVED':
      return saveEmployeeDetail(state, action.data);
    default:
      return state;
  }
};

export default reducer;