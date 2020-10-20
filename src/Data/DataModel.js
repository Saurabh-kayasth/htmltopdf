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
    scheduledAtDate: 'date',
    scheduledAtDateStr: 'string',
    scheduledAtTime: 'date',
    location: 'string',
    fileUrl: 'string',
    isFavourite: 'int',
    isScheduled: 'int',
    fileDueHour: 'int',
  },
};

// const SettingSchema = {
//   name: 'WPCSettings',
//   properties: {
//     lazyLoad: 'string',
//   },
// };

export default class DataModel extends Component {
  constructor(props) {
    super(props);
    Realm.open();
    // Realm.deleteFile();
  }
  // Add New Folder
  createFolder(folderObj) {
    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    // const id = this.getCurrenntFolderId(realm);
    // folderObj.id = id;
    realm.write(() => {
      realm.create('PdfFolder', folderObj, true);
    });
  }

  // Add New File
  addFile(fileObj) {
    console.log(fileObj);
    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    // const id = this.getCurrenntFileId(realm);
    // fileObj.id = id;
    realm.write(() => {
      realm.create('PdfFile', fileObj, true);
    });
  }

  // get only folders
  getFolders() {
    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    const folders = realm.objects('PdfFolder');
    return folders;
  }

  // get files only for given folder id
  getFilesWithFolderId(folderId) {
    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    const files = realm.objects('PdfFile').filtered('folderId = $0', folderId);
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
  setFileSchedule(fileId, date, time) {
    console.log('===========kkkkkkkkk============');
    console.log(new Date(time).getMinutes());
    let currentDate = new Date(date);
    let currentMonth = currentDate.getMonth() + 1;

    let queryDate =
      currentDate.getDate() +
      '-' +
      currentMonth +
      '-' +
      currentDate.getFullYear();
    console.log(queryDate);

    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    const file = realm.objects('PdfFile').filtered('id = $0', fileId);
    realm.write(() => {
      file[0].isScheduled = 1;
      file[0].scheduledAtDate = date;
      file[0].scheduledAtTime = time;
      file[0].scheduledAtDateStr = queryDate;
      file[0].fileDueHour = new Date(time).getHours();
    });
    const files = realm.objects('PdfFile').filtered('id = $0', fileId);
    console.log(files);
  }

  setFileUnshedule(fileId) {
    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    const file = realm.objects('PdfFile').filtered('id = $0', fileId);
    realm.write(() => {
      file[0].isScheduled = 0;
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
    console.log('FOLDER ID ================== ', folderId);
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

  getTasksDueNow() {
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth() + 1;

    let queryDate =
      currentDate.getDate() +
      '-' +
      currentMonth +
      '-' +
      currentDate.getFullYear();
    let currentHour = currentDate.getHours();
    let realm = new Realm({schema: [FolderSchema, FileSchema]});
    const dueTasks = realm
      .objects('PdfFile')
      .filtered(
        'scheduledAtDateStr == $0 AND fileDueHour == $1 AND isScheduled == $2',
        queryDate,
        currentHour,
        1,
      );

    return dueTasks;
  }

  // setLazyLoad(value) {
  //   console.log(value);
  //   let realm = new Realm({schema: [FolderSchema, FileSchema]});
  //   const dict = {
  //     lazyLoad: value.toString(),
  //   };
  //   console.log(dict);
  //   realm.write(() => {
  //     realm.create('WPCSettings', dict, true);
  //   });
  // }

  // getCurrenntFolderId(realmDB) {
  //   return realmDB.objects('PdfFolder').length + 1;
  // }

  // getCurrenntFileId(realmDB) {
  //   return realmDB.objects('PdfFile').length + 1;
  // }
}
