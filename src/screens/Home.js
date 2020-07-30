import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import HeaderCompponent from '../components/HeaderComponent';
import FoldersComponent from '../components/FoldersComponent';
import {PrimaryColor} from '../constants/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddFolderComponent from '../components/AddFolderComponent';

function Home(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const addFolder = () => {
    console.log('add folder');
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <HeaderCompponent header={'Home'} />
      <FoldersComponent navigation={props.navigation} />
      <TouchableOpacity style={styles.btn} onPress={() => addFolder()}>
        <Icon name="folder-plus" size={25} color="#fff" />
      </TouchableOpacity>
      {modalVisible && <AddFolderComponent />}
    </View>
  );
}

export default Home;

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
  btnText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    zIndex: 10,
  },
});
