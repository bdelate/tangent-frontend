import axios from 'axios';

function loggedIn() {
  return {
    type: 'LOGGED_IN'
  };
}

export const login = (username, password) => {
  const authData = { username: username, password: password };
  return dispatch => {
    axios
      .get('/api-auth/login/', authData)
      .then(res => {
        console.log(res.data)
        dispatch(loggedIn());
      })
      .catch(error => {
        console.log(error)
        // const message = 'Error: Unable to load board data';
        // dispatch(toggleInfoModal(message));
      });
  };
};