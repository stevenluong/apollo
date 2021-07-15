/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './Base/app.json';
import { NavigationContainer } from '@react-navigation/native';


//REDUX
import { Provider } from 'react-redux';
import store from './Common/store';

const ReduxApp = () => (
  <Provider store = { store }>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </Provider>
)

AppRegistry.registerComponent(appName, () => ReduxApp);
