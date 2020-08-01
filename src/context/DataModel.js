import {Component} from 'react';

const Realm = require('realm');

// Define your models and their properties
// const FolderSchema = {};
const FolderSchema = {
  name: 'PdfFolder',
  primaryKey: 'id',
  properties: {
    id: 'int',
    folderName: 'string',
    dateTime: 'date',
    // files: {type: 'list', objectType: 'Files'},
  },
};

const FileSchema = {
  name: 'PdfFile',
  primaryKey: 'id',
  properties: {
    id: 'int',
    folderId: 'int',
    fileName: 'string',
    dateTime: 'date',
    scheduledAt: 'date',
    location: 'string',
    fileUrl: 'string',
    isFavourite: 'int',
    isScheduled: 'int',
  },
};

export default class DataModel extends Component {
  constructor(props) {
    super(props);
    // Realm.deleteFile();
  }

  createFolder(folderObj) {
    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    const id = this.getCurrenntFolderId(realm);
    folderObj.id = id;
    realm.write(() => {
      realm.create('PdfFolder', folderObj, true); // Add New Folder
    });
  }

  addFile(fileObj) {
    console.log(fileObj);
    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    const id = this.getCurrenntFileId(realm);
    fileObj.id = id;
    realm.write(() => {
      realm.create('PdfFile', fileObj, true); // Add New File
    });
  }

  getFolders() {
    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    const folders = realm.objects('PdfFolder');
    return folders;
  }

  getFilesWithFolderId(folderId) {
    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    const files = realm.objects('PdfFile').filtered('folderId = $0', folderId);
    return files;
  }

  getCurrenntFolderId(realmDB) {
    return realmDB.objects('PdfFolder').length + 1;
  }

  getCurrenntFileId(realmDB) {
    return realmDB.objects('PdfFile').length + 1;
  }
}
