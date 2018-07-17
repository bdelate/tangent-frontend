const initialState = {
  error: null
};

// message to be displayed if an error occurs
function toggleError(state, error) {
  return {
    ...state,
    error: error
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_ERROR':
      return toggleError(state, action.error);
    default:
      return state;
  }
};

export default reducer;