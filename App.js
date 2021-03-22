import React, {Component} from 'react';
import Authorization from './src/components/Authorization';
import Demo from './src/Demo';
import {Provider} from 'react-redux';
import {store} from './src/redux/Store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Authorization />
      </Provider>
    );
  }
}
