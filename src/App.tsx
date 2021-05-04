import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import Navigator from './navigator'
import NavigatorAnimated from './navigator/animated'

export default () => {
  return (
    <Provider store={store}>
      {/* <Navigator /> */}
      <NavigatorAnimated />
    </Provider>
  );
};
