// react imports
import React, { Component } from 'react';

// project imports
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import * as actions from './actions';

// 3rd party imports
import styled from 'styled-components';
import { connect } from 'react-redux';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  max-width: 30vw;
  margin: 15px;
  padding: 5px;
  border-radius: 2px;
  background-color: #c3d9e8;
  color: #000;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-items: center;
  min-width: 200px;
`;

class Auth extends Component {
  state = {
    error: false
  };

  handleLogin = event => {
    event.preventDefault();
    this.setState({ error: false });
    this.props.login(event.target.username.value, event.target.password.value);

    // axios
    //   .post('/api/obtain-token/', authData)
    //   .then(res => {
    //     localStorage.setItem('authToken', res.data.token);
    //     this.props.saveToken(res.data.token);
    //     this.props.history.push('/');
    //   })
    //   .catch(error => {
    //     this.setState({ error: 'Unable to login. Check Credentials.' });
    //   });
  };

  render() {
    const error = this.state.error ? <div>{this.state.error}</div> : null;

    return (
      <Container>
        <Card>
          {error}
          <Form id="idAuthForm" onSubmit={(e) => this.handleLogin(e)}>
            <Input
              domProps={{
                type: 'text',
                name: 'username',
                required: 'required',
                placeholder: 'Username'
              }}
            />
            <Input
              domProps={{
                type: 'password',
                name: 'password',
                required: 'required',
                placeholder: 'Password'
              }}
            />
            <Button domProps={{ type: 'submit' }}>Log In</Button>
          </Form>
        </Card>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(actions.login(username, password))
  };
};

// component only export used for testing
export const AuthComponentOnly = Auth;

export default connect(
  null,
  mapDispatchToProps
)(Auth);
