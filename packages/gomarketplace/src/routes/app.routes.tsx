import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Logo from '../assets/logo.png';
import Cart from '../pages/Cart';
import Dashboard from '../pages/Dashboard';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: true,
      cardStyle: { backgroundColor: '#EBEEF8' },
    }}
    initialRouteName="Dashboard"
  >
    <App.Screen
      options={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: () => <Image source={Logo} />,
      }}
      name="Dashboard"
      component={Dashboard}
    />

    <App.Screen
      options={{
        headerTransparent: true,
        headerTitle: () => <Image source={Logo} />,
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          marginLeft: 20,
        },

        headerBackImage: () => <FeatherIcon name="chevron-left" size={24} />,
      }}
      name="Cart"
      component={Cart}
    />
  </App.Navigator>
);

export default AppRoutes;
