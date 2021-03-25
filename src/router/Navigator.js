import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Settings from '../screens/Settings';
import BottomTab from './BottomTab';
import Authorization from '../auth/Authorization';
import Search from '../screens/Search';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={false}>
        <Stack.Screen name="Autentikasi" component={Authorization} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="Pengaturan" component={Settings} />
        <Stack.Screen name="Pencarian" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
