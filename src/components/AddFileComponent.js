/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Clipboard,
  ToastAndroid,
} from 'react-native';
import {
  HeadingColor,
  PlaceholderColor,
  SecondaryColor,
} from '../constants/Theme';
import {TextInput} from 'react-native-gesture-handler';
import DataModel from '../Data/DataModel';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import {Styles} from '../styles/Styles';
import {useNetInfo} from '@react-native-community/netinfo';

function AddFileComponent(props) {
  console.log(props);
  const [fileName, setFileName] = useState(String);
  const [fileUrl, setFileUrl] = useState(String);
  const [spinner, setSpinner] = useState(false);
  const netInfo = useNetInfo();

  const closeModal = () => {
    props.setModalVisible(false);
  };

  const addFile = (path) => {
    const dataModel = new DataModel();
    const fileObj = {};
    fileObj.fileName = fileName;
    fileObj.dateTime = new Date();
    fileObj.folderId = props.item.id;
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
    props.dispatch({type: 'add', payload: fileObj});
    props.setModalVisible(false);
  };

  const actualDownload = async () => {
    const {dirs} = RNFetchBlob.fs;
    console.log('making request');
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: 'demosss.pdf',
        path: `${dirs.DCIMDir}/htmlToPDF/${
          props.folderName
        }/${fileName}_${new Date().getTime()}.pdf`,
      },
    })
      .fetch(
        'GET',
        `https://webtopdfapi.herokuapp.com/api/render?url=${fileUrl}`,
        {},
      )
      .then((res) => {
        addFile(res.path());
        setSpinner(false);
      })
      .catch((e) => {
        setSpinner(false);
      });
  };

  const downloadFile = async () => {
    let connected = netInfo.isConnected.toString();
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
          actualDownload();
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

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setFileUrl(text);
  };

  return (
    <>
      <Modal
        transparent={true}
        animationType="slide"
        onRequestClose={() => closeModal()}>
        <View style={Styles.modelContainer}>
          <View style={Styles.formContainer}>
            <Text style={Styles.heading}>ADD FILE</Text>
            <TextInput
              placeholder="Enter file name..."
              placeholderTextColor={PlaceholderColor}
              style={Styles.input}
              value={fileName}
              onChangeText={(text) => setFileName(text)}
            />

            <View style={Styles.pasteContainer}>
              <TextInput
                placeholder="Enter URL..."
                placeholderTextColor={PlaceholderColor}
                style={[Styles.input, {width: '82%', marginRight: 10}]}
                value={fileUrl}
                onChangeText={(text) => setFileUrl(text)}
              />
              <TouchableOpacity
                style={Styles.paste}
                onPress={() => fetchCopiedText()}>
                <Icon name="content-copy" size={23} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={Styles.btnContainer}>
              <TouchableOpacity
                style={[Styles.submitBtn, {backgroundColor: SecondaryColor}]}
                onPress={() => closeModal()}>
                <Text style={[Styles.btnText, {color: HeadingColor}]}>
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Styles.submitBtn}
                onPress={() => downloadFile()}>
                <Text style={Styles.btnText}>ADD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Spinner
        visible={spinner}
        textContent={'Downloading...'}
        animation="fade"
        color="#6d8c79"
        textStyle={{color: '#6d8c79'}}
      />
    </>
  );
}

export default AddFileComponent;
