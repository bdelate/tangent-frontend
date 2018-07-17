// react imports
import React from 'react';
import ReactDOM from 'react-dom';

// project imports
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authReducer from './containers/Auth/reducers';
import employeesReducer from './containers/Employees/reducers';
import homeReducer from './containers/Home/reducers';
import globalReducer from './reducers';

// 3rd party imports
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  auth: authReducer,
  employees: employeesReducer,
  home: homeReducer,
  global: globalReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
