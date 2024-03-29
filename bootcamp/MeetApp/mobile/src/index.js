import React from 'react';
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';
import { store, persistor } from './store';
import App from './App';

const Index = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar hidden barStyle="light-content" backgroundColor="#22202c" />
        <App />
      </PersistGate>
    </Provider>
  );
};

export default Index;
