import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '../screens/Home';
import Favourites from '../screens/Favourites';
import Sheduled from '../screens/Sheduled';
import Folder from '../screens/Folder';
import {
  BackgroundColor,
  PrimaryColor,
  SecondaryColor,
} from '../constants/Theme';
import Pdf from '../screens/Pdf';
import Main from '../screens/Main';

const Tab = createMaterialTopTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      swipeEnabled={false}
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#e5e5e5',
        showLabel: false,
        showIcon: true,

        style: {
          backgroundColor: SecondaryColor,
          height: 60,
          // paddingTop: 10,
          elevation: 0,
        },
        indicatorStyle: {
          height: 0,
        },
        iconStyle: {
          padding: 10,
          height: 40,
          width: 80,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          borderRadius: 20,
          overflow: 'hidden',
        },
      }}>
      {/* <Tab.Screen
        name="Home"
        component={Main}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={25}
              color={color}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Folder"
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'folder' : 'folder-outline'}
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
