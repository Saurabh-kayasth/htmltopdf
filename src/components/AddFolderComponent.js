import React from 'react';
import {View, StyleSheet, Modal, Text, Dimensions} from 'react-native';
import {PrimaryColor} from '../constants/Theme';

const {width, height} = Dimensions.get('window');

function AddFolderComponent() {
  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text>Enter Folder Name</Text>
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
    height: height / 3,
    backgroundColor: PrimaryColor,
    alignSelf: 'center',
    borderRadius: 10,
  },
});
