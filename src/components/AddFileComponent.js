/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Clipboard,
} from 'react-native';
import {
  HeadingColor,
  PlaceholderColor,
  PrimaryColor,
  SecondaryColor,
} from '../constants/Theme';
import {TextInput} from 'react-native-gesture-handler';
import DataModel from '../Data/DataModel';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';
const {config, fs} = RNFetchBlob;

let PictureDir = fs.dirs.PictureDir; // this is the pictures directory. You can check the available directories in the wiki.
let options = {
  fileCache: true,
  addAndroidDownloads: {
    useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
    notification: false,
    path: PictureDir + '/me_' + 'saurabh', // this is the path where your downloaded file will live in
    description: 'Downloading image.',
  },
};
const {width} = Dimensions.get('window');

function AddFileComponent(props) {
  console.log(props);
  const [fileName, setFileName] = useState(String);
  const [fileUrl, setFileUrl] = useState(String);
  const [spinner, setSpinner] = useState(false);

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
        // RNFetchBlob.fs.writeStream(
        //   `${dirs.DownloadDir}/demo.pdf`,
        //   res.data,
        //   'base64',
        // );
        console.log('----------------------------');
        console.log(res);
        console.log('The file saved to ', res.path());
        addFile(res.path());
        setSpinner(false);
      })
      .catch((e) => {
        console.log('-----------rrrrrr-----------------');
        console.log(e);
        setSpinner(false);
      });
  };

  const downloadFile = async () => {
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
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.heading}>ADD FILE</Text>
            <TextInput
              placeholder="Enter file name..."
              placeholderTextColor={PlaceholderColor}
              style={styles.input}
              value={fileName}
              onChangeText={(text) => setFileName(text)}
            />

            <View style={styles.pasteContainer}>
              <TextInput
                placeholder="Enter URL..."
                placeholderTextColor={PlaceholderColor}
                style={[styles.input, {width: '82%', marginRight: 10}]}
                value={fileUrl}
                onChangeText={(text) => setFileUrl(text)}
              />
              <TouchableOpacity
                style={styles.paste}
                onPress={() => fetchCopiedText()}>
                <Icon name="content-copy" size={23} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={[styles.btn, {backgroundColor: SecondaryColor}]}
                onPress={() => closeModal()}>
                <Text style={[styles.btnText, {color: HeadingColor}]}>
                  CANCEL
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => downloadFile()}>
                <Text style={styles.btnText}>ADD</Text>
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
        textStyle={styles.spinnerTextStyle}
      />
    </>
  );
}

export default AddFileComponent;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#6d8c79',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  formContainer: {
    width: width - 30,
    // height: height / 4,
    backgroundColor: PrimaryColor,
    alignSelf: 'center',
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 5,
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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  btn: {
    width: '47%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6d8c79',
    borderRadius: 5,
  },
  btnText: {
    fontSize: 17,
    color: '#fff',
    // fontWeight: 'bold',
  },
  pasteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  paste: {
    width: '15%',
    height: 40,
    borderRadius: 5,
    elevation: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: SecondaryColor,
    padding: 10,
    marginTop: 10,
    borderWidth: 0.2,
    borderColor: HeadingColor,
    color: HeadingColor,
  },
});
