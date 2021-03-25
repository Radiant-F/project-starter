import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// SCREENS
import Dashborad from '../screens/bottomTabs/Dashborad';
import Schedule from '../screens/bottomTabs/Schedule';
import Task from '../screens/bottomTabs/Task';
import Work from '../screens/bottomTabs/Work';

const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      activeColor="#0a9dff"
      backBehavior="firstRoute"
      barStyle={{backgroundColor: 'white'}}>
      <Tab.Screen
        name="Beranda"
        component={Dashborad}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={25} />,
        }}
      />
      <Tab.Screen
        name="Tugas"
        component={Task}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="chart-tree" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Jadwal"
        component={Schedule}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="calendar-multiselect" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Kerja"
        component={Work}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="briefcase-outline" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
