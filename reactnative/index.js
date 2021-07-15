/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './Base/app.json';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react'

//REDUX
import { Provider } from 'react-redux';
import configureStore from './Common/store';
const {store,persistor} =configureStore();

const ReduxApp = () => (
  <Provider store = { store }>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </PersistGate>
  </Provider>
)

AppRegistry.registerComponent(appName, () => ReduxApp);
