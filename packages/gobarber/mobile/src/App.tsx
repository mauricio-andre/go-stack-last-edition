import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312e38" />
    <GestureHandlerRootView style={{ backgroundColor: '#312e38', flex: 1 }}>
      <Routes />
    </GestureHandlerRootView>
  </NavigationContainer>
);

export default App;
