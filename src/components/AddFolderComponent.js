/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  HeadingColor,
  PlaceholderColor,
  PrimaryColor,
  SecondaryColor,
} from '../constants/Theme';
import {TextInput} from 'react-native-gesture-handler';
import DataModel from '../Data/DataModel';

const {width} = Dimensions.get('window');

function AddFolderComponent(props) {
  const [folderName, setFolderName] = useState(String);
  const clodeModal = () => {
    props.setModalVisible(false);
  };

  const createFolder = () => {
    const dataModel = new DataModel();
    const folderObj = {};
    folderObj.folderName = folderName;
    folderObj.dateTime = new Date();
    folderObj.id = new Date().getTime();
    // folderObj.files = [];
    dataModel.createFolder(folderObj);
    props.dispatch({type: 'add', payload: folderObj});
    props.setModalVisible(false);
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      onRequestClose={() => clodeModal()}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.heading}>ENTER FOLDER NAME</Text>
          <TextInput
            placeholder="Enter folder name..."
            placeholderTextColor={PlaceholderColor}
            style={styles.input}
            value={folderName}
            onChangeText={(text) => setFolderName(text)}
          />
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[styles.btn, {backgroundColor: SecondaryColor}]}
              onPress={() => clodeModal()}>
              <Text style={[styles.btnText, {color: HeadingColor}]}>
                CANCEL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => createFolder()}>
              <Text style={styles.btnText}>CREATE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default AddFolderComponent;

const styles = StyleSheet.create({
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
  },
});
