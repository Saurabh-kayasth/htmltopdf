import React, {createContext, useState, useEffect, useReducer} from 'react';
import DataModel from '../Data/DataModel';
export const Context = createContext();

let initialState = {};

const getFavFiles = () => {
  const dataModel = new DataModel();
  const taskData = dataModel.getFavFiles();
  initialState = taskData;
  return taskData;
};

let reducer = (state, action) => {
  switch (action.type) {
    case 'fav': {
      const files = getFavFiles();
      return {...state, files: files};
    }
    case 'folders': {
      const dataModel = new DataModel();
      const folders = dataModel.getFolders();
      return {folders: folders};
    }
    case 'sched': {
      const dataModel = new DataModel();
      const files = dataModel.getScheduledFiles();
      return {files: files};
    }
  }
};

export const Provider = (props) => {
  let [state, dispatch] = useReducer(reducer, initialState);
  let value = {state, dispatch};
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export const {Consumer} = Context;
