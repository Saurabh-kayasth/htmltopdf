import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

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

function App() {
  // useEffect(() => {
  // config(options)
  //   .fetch('GET', 'http://www.example.com/example.pdf')
  //   .then((res) => {
  //     // do some magic here
  //     console.log(res);
  //   });

  // RNFetchBlob.config({
  //   addAndroidDownloads: {
  //     useDownloadManager: true, // <-- this is the only thing required
  //     // Optional, override notification setting (default to true)
  //     notification: false,
  //     // Optional, but recommended since android DownloadManager will fail when
  //     // the url does not contains a file extension, by default the mime type will be text/plain
  //     // mime: 'text/plain',
  //     description: 'File downloaded by download manager.',
  //   },
  // })
  //   .fetch(
  //     'GET',
  //     'http://environmentclearance.nic.in/writereaddata/online/RiskAssessment/10032015FN0QU4TNANNEXURERISKASSESSMENT.pdf',
  //   )
  //   .then((resp) => {
  //     // the path of downloaded file
  //     resp.path();
  // });

  // RNFetchBlob.config({
  //   // add this option that makes response data to be stored as a file,
  //   // this is much more performant.
  //   fileCache: true,
  // })
  //   .fetch(
  //     'GET',
  //     'http://environmentclearance.nic.in/writereaddata/online/RiskAssessment/10032015FN0QU4TNANNEXURERISKASSESSMENT.pdf',
  //     {
  //       //some headers ..
  //     },
  //   )
  //   .then((res) => {
  //     // the temp file path
  //     console.log('The file saved to ', res.path());
  //   });
  // }, []);

  const actualDownload = () => {
    const {dirs} = RNFetchBlob.fs;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `test.pdf`,
        path: `${dirs.DownloadDir}/test3.pdf`,
      },
    })
      .fetch(
        'GET',
        'http://a8f557582551.ngrok.io/https://www.tutorialspoint.com/index.htm',
        {},
      )
      .then((res) => {
        console.log('The file saved to ', res.path());
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const downloadFile = async () => {
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
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => downloadFile()}>
        <Text>Download!!!</Text>
      </TouchableOpacity>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
