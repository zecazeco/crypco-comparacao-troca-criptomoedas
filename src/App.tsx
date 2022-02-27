import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-native-paper';
import { theme } from './core/theme';

import './config/firebase';

import Home from './pages/Home';

export default function Main() {
  return (  
    <Provider theme={theme}>
      <StatusBar style="dark" />
      <Home />
    </Provider>
  );
}
