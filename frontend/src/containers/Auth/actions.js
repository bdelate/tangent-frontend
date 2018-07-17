// project imports
import { toggleError } from '../../actions';

// 3rd party imports
import axios from 'axios';

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

function saveToken(token) {
  return {
    type: 'SAVE_TOKEN',
    token: token
  };
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