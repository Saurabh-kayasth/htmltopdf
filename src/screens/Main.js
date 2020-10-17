import React, {useEffect, useState, useReducer} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Clipboard,
  ToastAndroid,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  BackgroundColor,
  HeadingColor,
  PlaceholderColor,
  SecondaryColor,
} from '../constants/Theme';
import {Styles} from '../styles/Styles';
import DropDownPicker from 'react-native-dropdown-picker';
import DataModel from '../Data/DataModel';
import {FolderReducer} from '../context/FoldersContext/FoldersReducer';
import RNFetchBlob from 'rn-fetch-blob';
import Spinner from 'react-native-loading-spinner-overlay';
import {useNetInfo} from '@react-native-community/netinfo';
import {useFocusEffect} from '@react-navigation/native';

const Main = () => {
  const [fileName, setFileName] = useState('');
  const [folderName, setFolderName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [state, setState] = useState('');
  const [folderList, setFolderList] = useState([]);
  const [states, dispatch] = useReducer(FolderReducer);
  const [spinner, setSpinner] = useState(false);
  const netInfo = useNetInfo();

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setFileUrl(text);
  };

  const fetchFolders = () => {
    const dataModel = new DataModel();
    let folders = dataModel.getFolders();
    let foldersArr = [];
    for (let i = 0; i < folders.length; i++) {
      let folderObj = {};
      folderObj.value = folders[i].id;
      folderObj.label = folders[i].folderName;
      folderObj.icon = () => <Icon name="folder" size={18} color="#fff" />;
      foldersArr.push(folderObj);
    }
    if (foldersArr.length > 0) {
      setState(foldersArr[0].value);
      setFolderList(foldersArr);
    } else {
      console.log('no folders');
      setState('');
      setFolderList([]);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          if (isActive) {
            fetchFolders();
          }
        } catch (e) {
          console.log(e);
        }
      };

      fetchUser();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const handleDropDownOpen = () => {
    fetchFolders();
  };

  const onChangeItem = (item) => {
    console.log(item);
    setState(item.value);
    setFolderName(item.label);
  };

  const checkFolderExist = () => {
    for (let i = 0; i < folderList.length; i++) {
      let folderNameStr = folderName.toLowerCase();
      if (folderList[i].label.toLowerCase() === folderNameStr) {
        return folderList[i].value;
      }
    }
    return false;
  };

  const downloadFile = () => {
    let isExist = checkFolderExist();
    if (isExist === false) {
      console.log("Folder doesn't exist");
      const dataModel = new DataModel();
      const folderObj = {};
      folderObj.folderName = folderName;
      folderObj.dateTime = new Date();
      const folderId = new Date().getTime();
      folderObj.id = folderId;
      setFolderList([
        ...folderList,
        {
          label: folderName,
          value: folderId,
        },
      ]);
      dataModel.createFolder(folderObj);
      dispatch({type: 'add', payload: folderObj});
      downloadFileCheck(folderId);
    } else {
      console.log('Folder exist', isExist);
      downloadFileCheck(isExist);
    }
  };

  const addFile = (path, id) => {
    const dataModel = new DataModel();
    const fileObj = {};
    fileObj.fileName = fileName;
    fileObj.dateTime = new Date();
    fileObj.folderId = id;
    fileObj.isFavourite = 0;
    fileObj.isScheduled = 0;
    fileObj.scheduledAtDate = new Date();
    fileObj.scheduledAtTime = new Date();
    fileObj.scheduledAtDateStr = '';
    fileObj.fileDueHour = 0;
    fileObj.fileUrl = fileUrl;
    fileObj.location = path;
    fileObj.id = new Date().getTime();
    dataModel.addFile(fileObj);
  };

  const actualDownload = async (id) => {
    const {dirs} = RNFetchBlob.fs;
    console.log('making request');
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `${fileName}_${new Date().getTime()}.pdf`,
        path: `${
          dirs.DCIMDir
        }/htmlToPDF/${folderName}/${fileName}_${new Date().getTime()}.pdf`,
      },
    })
      .fetch(
        'GET',
        `https://webtopdfapi.herokuapp.com/api/render?url=${fileUrl}`,
        {},
      )
      .then((res) => {
        addFile(res.path(), id);
        setSpinner(false);
      })
      .catch((e) => {
        setSpinner(false);
      });
  };

  const downloadFileCheck = async (id) => {
    let connected = netInfo.isConnected.toString();
    console.log(connected);
    if (connected === 'false') {
      ToastAndroid.showWithGravity(
        'No internet connection!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else if (connected === 'true') {
      setSpinner(true);
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          actualDownload(id);
        } else {
          Alert.alert(
            'Permission Denied!',
            'You need to give storage permission to download the file',
          );
          setSpinner(false);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/down.png')} style={styles.img} /> */}
      <Text style={styles.heading}>Create PDF</Text>
      <TextInput
        placeholder="Enter file name..."
        placeholderTextColor={PlaceholderColor}
        style={styles.input}
        value={fileName}
        onChangeText={(text) => setFileName(text)}
      />
      <View style={Styles.pasteContainer}>
        <TextInput
          placeholder="Enter URL..."
          placeholderTextColor={PlaceholderColor}
          style={[styles.input, {width: '82%', marginRight: 10}]}
          value={fileUrl}
          onChangeText={(text) => setFileUrl(text)}
        />
        <TouchableOpacity
          style={Styles.paste}
          onPress={() => fetchCopiedText()}>
          <Icon name="content-copy" size={23} color="#fff" />
        </TouchableOpacity>
      </View>

      <DropDownPicker
        items={folderList}
        defaultValue={state}
        placeholder="Select a folder..."
        containerStyle={styles.dropmain}
        style={styles.dropdownContainer}
        labelStyle={styles.label}
        selectedtLabelStyle={styles.selectedtLabelStyle}
        searchable={true}
        searchablePlaceholder="Search for a folder"
        searchableError={() => <Text style={{color: '#fff'}}>Not Found</Text>}
        searchablePlaceholderTextColor="gray"
        seachableStyle={{color: '#fff'}}
        itemStyle={styles.itemStyle}
        dropDownStyle={styles.dropDownStyle}
        onChangeItem={(item) => onChangeItem(item)}
        arrowStyle={styles.arrowStyle}
        arrowColor="#fff"
        zIndex={400}
        onOpen={handleDropDownOpen}
      />
      <View style={Styles.pasteContainer}>
        <TextInput
          placeholder="Enter new folder or choose from above..."
          placeholderTextColor={PlaceholderColor}
          style={[styles.input, {width: '82%', marginRight: 10}]}
          value={folderName}
          onChangeText={(text) => setFolderName(text)}
        />
        <TouchableOpacity style={styles.btn} onPress={downloadFile}>
          <Icon name="download" size={20} color={HeadingColor} />
        </TouchableOpacity>
      </View>
      <Spinner
        visible={spinner}
        textContent={'Downloading...'}
        animation="fade"
        color="#6d8c79"
        textStyle={{color: '#6d8c79'}}
      />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    padding: 20,
  },
  heading: {
    fontSize: 17,
    color: HeadingColor,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: SecondaryColor,
    marginTop: 10,
    borderRadius: 5,
    paddingLeft: 10,
    borderWidth: 0.2,
    borderColor: HeadingColor,
    color: HeadingColor,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: SecondaryColor,
    padding: 10,
    marginTop: 10,
  },
  img: {
    width: '100%',
    height: 250,
  },
  dropmain: {
    height: 40,
    // width: '80%',
    marginTop: 10,
  },
  dropdownContainer: {
    backgroundColor: SecondaryColor,
    borderWidth: 0.2,
    borderColor: HeadingColor,
  },
  label: {
    fontSize: 14,
    textAlign: 'left',
    color: '#fff',
    marginLeft: 15,
  },
  selectedtLabelStyle: {
    color: '#fff',
  },
  itemStyle: {
    justifyContent: 'flex-start',
  },
  dropDownStyle: {
    backgroundColor: '#333333',
    borderWidth: 1,
    borderColor: '#40404c',
  },
  arrowStyle: {
    marginRight: 10,
  },
});
