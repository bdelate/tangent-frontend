// react imports
import React, { Component } from 'react';

// project imports
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import * as actions from './actions';
import { toggleError } from '../../actions';

// 3rd party imports
import styled from 'styled-components';
import { connect } from 'react-redux';
import axios from 'axios';

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
  state = {}

  componentDidMount() {
    if (this.props.authToken) {
      axios.defaults.headers.common['Authorization'] = `JWT ${
        this.props.authToken
        }`;
      this.props.history.push('/');
    }
  }

  // called when the props change (eg: authToken is received)
  static getDerivedStateFromProps(nextProps, prevState) {
    return { ...nextProps };
  }

  // if authToken is received, navigate to '/'
  componentDidUpdate(prevProps, prevState) {
    if (prevState.authToken === null && this.props.authToken !== null) {
      this.props.history.push('/');
    }
  }

  handleLogin = event => {
    event.preventDefault();
    this.props.toggleError(null);
    this.props.login(event.target.username.value, event.target.password.value);
  };

  render() {
    const error = this.props.error ? <div>{this.props.error}</div> : null;

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

const mapStateToProps = state => {
  return {
    authToken: state.auth.token,
    error: state.global.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(actions.login(username, password)),
    toggleError: (error) => dispatch(toggleError(error))
  };
};

// component only export used for testing
export const AuthComponentOnly = Auth;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
