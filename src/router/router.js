import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Favourites from '../screens/Favourites';
import Sheduled from '../screens/Sheduled';
import Folder from '../screens/Folder';
import {
  ACTIVE_TINT_COLOR,
  IconColor,
  INACTIVE_TINT_COLOR,
  SecondaryColor,
} from '../constants/Theme';
import Pdf from '../screens/Pdf';
import Main from '../screens/Main';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      swipeEnabled={false}
      tabBarOptions={{
        activeTintColor: ACTIVE_TINT_COLOR,
        inactiveTintColor: INACTIVE_TINT_COLOR,
        showLabel: false,
        showIcon: true,

        style: {
          backgroundColor: SecondaryColor,
          height: 60,
          // paddingTop: 10,
          elevation: 5,
          borderTopWidth: 0.3,
          borderTopColor: IconColor,
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
      <Tab.Screen
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
          gestureEnabled: false,
        }}
      />
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
          gestureEnabled: false,
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
          gestureEnabled: false,
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
          gestureEnabled: false,
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    // <NavigationContainer>
    <Stack.Navigator
      initialRouteName="maintabs"
      mode="modal"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        component={Tabs}
        name="maintabs"
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        component={Folder}
        name="folder"
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen component={Pdf} name="pdf" options={{headerShown: false}} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
