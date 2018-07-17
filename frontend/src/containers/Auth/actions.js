import axios from 'axios';

function saveToken(token) {
  return {
    type: 'SAVE_TOKEN',
    token: token
  };
}

export const toggleError = (error) => {
  return {
    type: 'TOGGLE_ERROR',
    error: error
  }
}

// request auth token using credentials provided and save the token in Redux.
// Display error modal if invalid credentials were provided.
export const login = (username, password) => {
  const authData = {
    username: username,
    password: password
  };

  return dispatch => {
    axios
      .post('/obtain-auth-token/', authData)
      .then(res => {
        localStorage.setItem('authToken', res.data.token);
        dispatch(saveToken(res.data.token));
      })
      .catch(error => {
        const message = 'Unaible to login in. Check your credentials.';
        dispatch(toggleError(message));
      });
  };
};