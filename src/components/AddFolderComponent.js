/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Modal, Text, TouchableOpacity, StyleSheet} from 'react-native';
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
  const [validation, updateValidation] = useState({
    folderName: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const clodeModal = () => {
    props.setModalVisible(false);
  };

  const createFolder = () => {
    setSubmitted(true);
    const isValid = checkValidation();
    if (isValid) {
      const dataModel = new DataModel();
      const folderObj = {};
      folderObj.folderName = folderName.toUpperCase();
      folderObj.dateTime = new Date();
      folderObj.id = new Date().getTime();
      // folderObj.files = [];
      dataModel.createFolder(folderObj);
      props.dispatch({type: 'add', payload: folderObj});
      props.setModalVisible(false);
    }
  };

  const handleFolderNameChange = (text) => {
    if (text.length > 0) {
      setFolderName(text);
      updateValidation({
        ...validation,
        folderName: true,
      });
    } else {
      setFolderName('');
      updateValidation({
        ...validation,
        folderName: false,
      });
    }
  };

  const checkValidation = () => {
    for (let key in validation) {
      if (validation.hasOwnProperty(key)) {
        if (!validation[key]) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      onRequestClose={() => clodeModal()}>
      <View style={Styles.modelContainer}>
        <View style={Styles.formContainer}>
          <Text style={Styles.heading}>ADD FOLDER</Text>
          <TextInput
            placeholder="Enter folder name..."
            placeholderTextColor={PlaceholderColor}
            style={Styles.input}
            value={folderName}
            onChangeText={(text) => handleFolderNameChange(text)}
          />
          {!validation.folderName && submitted && (
            <Text style={styles.error}>Folder name can not be empty!</Text>
          )}
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

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
});
