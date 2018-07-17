// react imports
import React, { Component } from 'react'

// 3rd party imports
import { connect } from 'react-redux';
import axios from 'axios';

class Home extends Component {

  componentDidMount() {
    if (this.props.authToken) {
      axios.defaults.headers.common['Authorization'] = `JWT ${
        this.props.authToken
        }`;
    } else {
      this.props.history.push('/auth');
    }
  }

  render() {
    return (
      <div>
        test
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  null
)(Home);