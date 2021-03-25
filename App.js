import React, {Component} from 'react';
import Authorization from './src/auth/Authorization';
import Demo from './src/Demo';
import {Provider} from 'react-redux';
import {store} from './src/redux/Store';
import Navigator from './src/router/Navigator';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
