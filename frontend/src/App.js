// react imports
import React, { Component } from 'react';

// project imports
import Auth from './containers/Auth/Auth';
import Home from './containers/Home/Home';

// 3rd party imports
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';

const UIContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

class App extends Component {
  render() {
    return (
      <UIContainer>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" component={Home} />
        </Switch>
      </UIContainer>
    );
  }
}

export default App;