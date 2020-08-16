import React, {createContext, useState, useEffect, useReducer} from 'react';
import DataModel from '../Data/DataModel';
export const Context = createContext();

let initialState = {};

let reducer = (state, action) => {
  switch (action.type) {
    case 'get':
      return [...state];
    case 'delete':
      return [...state];
    case 'add':
      return [...state, action.payload];
    case 'addToFav':
      return [...state];
    case 'remFromFav':
      return [...state];
    case 'addToSch':
      return [...state];
    case 'remFromSch':
      return [...state];
    default:
      return [...state];
  }
};

export const Provider = (props) => {
  let [state, dispatch] = useReducer(reducer, initialState);
  let value = {state, dispatch};
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export const {Consumer} = Context;
