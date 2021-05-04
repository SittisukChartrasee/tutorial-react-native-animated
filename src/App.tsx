import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {Todolist} from './pages';
import {Provider} from 'react-redux';
import {store} from './store';

export default () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 20}}>
          <Todolist />
        </View>
      </SafeAreaView>
    </Provider>
  );
};
