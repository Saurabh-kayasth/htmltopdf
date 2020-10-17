import React from 'react';
import DataModel from '../../Data/DataModel';
// export const Context = createContext();

let initialState = {folders: []};

export const FolderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get': {
      const dataModel = new DataModel();
      const folders = dataModel.getFolders();
      console.log('get folders .....', folders);
      return {...state, folders: [...folders]};
    }
    case 'add': {
      console.log('adding folder..............', action.payload);
      // action.payload.id = state.folders.length + 1;
      return {...state, folders: [...state.folders, action.payload]};
    }
    case 'delete': {
      console.log('in action ', action.payload);
      return {
        ...state,
        folders: [
          ...state.folders.filter((item) => item.id !== action.payload),
        ],
      };
    }
    default:
      return [...state];
  }
};
