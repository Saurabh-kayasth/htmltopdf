import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import HeaderCompponent from '../components/HeaderComponent';
import FilesComponent from '../components/FilesComponent';
import AddFileComponent from '../components/AddFileComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PrimaryColor} from '../constants/Theme';

function Folder(props) {
  console.log(props);
  const [modalVisible, setModalVisible] = useState(false);

  const addFile = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <HeaderCompponent header={'Folder_name'} />
      <FilesComponent navigation={props.navigation} />
      <TouchableOpacity style={styles.btn} onPress={() => addFile()}>
        <Icon name="file-plus" size={25} color="#fff" />
      </TouchableOpacity>
      {modalVisible && <AddFileComponent setModalVisible={setModalVisible} />}
    </View>
  );
}

export default Folder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    backgroundColor: PrimaryColor,
    elevation: 10,
    position: 'absolute',
    bottom: 30,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
