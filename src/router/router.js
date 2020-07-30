import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import Favourites from '../screens/Favourites';
import Sheduled from '../screens/Sheduled';
import Folder from '../screens/Folder';
import {PrimaryColor} from '../constants/Theme';
import Pdf from '../screens/Pdf';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        inactiveTintColor: 'gray',
        activeTintColor: PrimaryColor,
        tabStyle: {
          backgroundColor: '#fff',
          height: 55,
          paddingBottom: 12,
          paddingTop: 10,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'star' : 'star-outline'}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Sheduled"
        component={Sheduled}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'clock' : 'clock-outline'}
              size={25}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="tabs">
        <Stack.Screen
          component={Tabs}
          name="tabs"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Folder}
          name="folder"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Pdf}
          name="pdf"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
