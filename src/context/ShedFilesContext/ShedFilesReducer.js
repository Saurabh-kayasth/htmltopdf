import React, {createContext} from 'react';
import DataModel from '../../Data/DataModel';
export const Context = createContext();

class Files {
  getFilesWithId() {
    const dataModel = new DataModel();
    const files = dataModel.getScheduledFiles();
    return files;
  }

  // deleteFile(fileId) {
  //   //
  // }

  // addFile(fileObj) {
  //   //
  // }
}

let initialState = {files: []};

export const ShedFilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'get': {
      const files = new Files();
      const filesData = files.getFilesWithId();
      return {...state, files: [...filesData]};
    }
    case 'add': {
      //   action.payload.id = state.files.length + 1;
      return {...state, files: [...state.files, action.payload]};
    }
    case 'delete': {
      return {
        ...state,
        files: [...state.files.filter((item) => item.id !== action.payload)],
      };
    }
    default:
      return [...state];
  }
};
