import React, {createContext, useState, useEffect, useReducer} from 'react';
import DataModel from '../Data/DataModel';
export const Context = createContext();

function customSort(a, b) {
  // console.log('sorting===================');
  return new Date(a.dueDate).getDate() - new Date(b.dueDate).getDate();
}
let initialState = {};

const getFavFiles = () => {
  const dataModel = new DataModel();
  const taskData = dataModel.getFavFiles();
  //   let tasks = [].slice.call(taskData).sort(customSort);
  initialState = taskData;
  return taskData;
};

let reducer = (state, action) => {
  switch (action.type) {
    case 'fav': {
      // console.log('updating -------------------');
      const files = getFavFiles();
      return {...state, files: files};
    }
  }
};

export const Provider = (props) => {
  let [state, dispatch] = useReducer(reducer, initialState);
  let value = {state, dispatch};
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export const {Consumer} = Context;
