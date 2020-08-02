import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import HeaderCompponent from '../components/HeaderComponent';
import FilesComponent from '../components/FilesComponent';
import AddFileComponent from '../components/AddFileComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PrimaryColor} from '../constants/Theme';
import DataModel from '../Data/DataModel';

function Folder(props) {
  console.log(props.route);
  const [modalVisible, setModalVisible] = useState(false);
  const [files, setFiles] = useState(Array);

  const addFile = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    const dataModel = new DataModel();
    const fileList = dataModel.getFilesWithFolderId(props.route.params.item.id);
    // console.log(fileList);
    setFiles(fileList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <HeaderCompponent header={props.route.params.item.folderName} />
      <FilesComponent navigation={props.navigation} files={files} />
      <TouchableOpacity style={styles.btn} onPress={() => addFile()}>
        <Icon name="file-plus" size={25} color="#fff" />
      </TouchableOpacity>
      {modalVisible && (
        <AddFileComponent
          setModalVisible={setModalVisible}
          item={props.route.params.item}
        />
      )}
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
