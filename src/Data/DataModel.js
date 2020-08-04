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

// const FavSchema = {
//   name: 'FavFile',
//   primaryKey: 'id',
//   properties: {
//     id: 'int',
//   },
// };

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
    const folders = realm.objects('PdfFolder'); // get only folders
    return folders;
  }

  getFilesWithFolderId(folderId) {
    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    const files = realm.objects('PdfFile').filtered('folderId = $0', folderId); // get files only for given folder id
    return files;
  }

  // add file to favourite
  addToFavWithFileId(fileId, status) {
    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    const file = realm.objects('PdfFile').filtered('id = $0', fileId);
    realm.write(() => {
      file[0].isFavourite = status;
    });
  }

  // favourite files
  getFavFiles() {
    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    const files = realm.objects('PdfFile').filtered('isFavourite = $0', 1);
    return files;
  }

  // number of files inside folder
  getNumberOfFilesFromFolderId(folderId) {
    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    const files = realm.objects('PdfFile').filtered('folderId = $0', folderId);
    return files.length;
  }

  // schedule file for later reading
  setFileSchedule(fileId, status) {
    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    const file = realm.objects('PdfFile').filtered('id = $0', fileId);
    realm.write(() => {
      file[0].isScheduled = status;
      file[0].scheduledAt = new Date();
    });
  }

  // get all scheduled files
  getScheduledFiles() {
    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    const files = realm.objects('PdfFile').filtered('isScheduled = $0', 1);
    return files;
  }

  // delete folder and files inside it
  deleteFolderWithId(folderId) {
    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    realm.write(() => {
      const folder = realm.objects('PdfFolder').filtered('id == $0', folderId);
      const files = realm
        .objects('PdfFile')
        .filtered('folderId == $0', folderId);
      realm.delete(folder);
      realm.delete(files);
    });
  }

  // delete particular file
  deleteFileWithId(filedId) {
    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    realm.write(() => {
      const file = realm.objects('PdfFile').filtered('id == $0', filedId);
      realm.delete(file);
    });
  }

  getCurrenntFolderId(realmDB) {
    return realmDB.objects('PdfFolder').length + 1;
  }

  getCurrenntFileId(realmDB) {
    return realmDB.objects('PdfFile').length + 1;
  }
}
