import React from 'react';
import { Provider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { theme } from './core/theme';
import Home from './pages/Home';

const Main = () => (
  <Provider theme={theme}>
    <Home />
    <StatusBar style="auto" />
  </Provider>
);

export default Main;