/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';
import {
  HeadingColor,
  PlaceholderColor,
  SecondaryColor,
} from '../constants/Theme';
import {TextInput} from 'react-native-gesture-handler';
import DataModel from '../Data/DataModel';
import {Styles} from '../styles/Styles';

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
      <View style={Styles.modelContainer}>
        <View style={Styles.formContainer}>
          <Text style={Styles.heading}>ENTER FOLDER NAME</Text>
          <TextInput
            placeholder="Enter folder name..."
            placeholderTextColor={PlaceholderColor}
            style={Styles.input}
            value={folderName}
            onChangeText={(text) => setFolderName(text)}
          />
          <View style={Styles.btnContainer}>
            <TouchableOpacity
              style={[Styles.submitBtn, {backgroundColor: SecondaryColor}]}
              onPress={() => clodeModal()}>
              <Text style={[Styles.btnText, {color: HeadingColor}]}>
                CANCEL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.submitBtn}
              onPress={() => createFolder()}>
              <Text style={Styles.btnText}>CREATE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default AddFolderComponent;
