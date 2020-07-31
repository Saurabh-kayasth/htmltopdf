/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {PrimaryColor} from '../constants/Theme';
import {TextInput} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

function AddFileComponent(props) {
  const closeModal = () => {
    props.setModalVisible(false);
  };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      onRequestClose={() => closeModal()}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.heading}>ADD FILE</Text>
          <TextInput placeholder="Enter file name..." style={styles.input} />
          <TextInput placeholder="Enter URL..." style={styles.input} />
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={[styles.btn, {backgroundColor: '#fff'}]}
              onPress={() => closeModal()}>
              <Text style={[styles.btnText, {color: '#000'}]}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default AddFileComponent;

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
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 5,
    paddingLeft: 10,
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
});
