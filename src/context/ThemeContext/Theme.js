import AsyncStorage from '@react-native-community/async-storage';
import React, {createContext, useReducer} from 'react';
import {THEME_KEY} from '../../constants/Constants';
import {themeObj} from '../../constants/Theme';
export const Context = createContext();

let initialState = themeObj['DEFAULT'];

const getTheme = async () => {
  const theme = await AsyncStorage.getItem(THEME_KEY);
  initialState = themeObj[theme];
  return themeObj[theme];
};

let reducer = (state, action) => {
  switch (action.type) {
    case 'current': {
      const themeData = getTheme();
      return {...state, theme: themeData};
    }
    case 'update': {
      console.log(action);
      return {...state, theme: themeObj[action.themeName]};
    }
  }
};

export const Provider = (props) => {
  let [state, dispatch] = useReducer(reducer, initialState);
  let value = {state, dispatch};

  // pass the value in provider and return
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export const {Consumer} = Context;
