import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../component/Home';

const HomeStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Dashboard">
      <HomeStack.Screen
        name="Dashboard"
        component={Home}
        options={{
          headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
          headerTitle: 'Home',
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
