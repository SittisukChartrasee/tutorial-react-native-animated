import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {Todolist} from './pages';
import {Provider} from 'react-redux';
import {store} from './store';
import Navigator from './navigator'

export default () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};
