import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
// import Screen from './navigator';
import {tutorialContainer} from './navigator/tutorial';

export default () => {
  return (
    <Provider store={store}>
      {/* <Screen /> */}
      {tutorialContainer()}
    </Provider>
  );
};
