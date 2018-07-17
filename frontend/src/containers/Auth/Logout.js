// react imports
import React, { Component } from 'react'

// project imports
import Button from '../../components/UI/Button';
import * as actions from './actions';
import { toggleError } from '../../actions';


// 3rd party imports
import { connect } from 'react-redux';


class LogoutButton extends Component {

  handleLogout = () => {
    this.props.toggleError(null);
    localStorage.removeItem('authToken');
    this.props.logout();
  };

  render() {
    return (
      <Button domProps={{ onClick: this.handleLogout }}>Log Out</Button>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
    toggleError: (error) => dispatch(toggleError(error))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LogoutButton);