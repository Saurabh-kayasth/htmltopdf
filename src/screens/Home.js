import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import FoldersComponent from '../components/FoldersComponent';
import {PrimaryColor} from '../constants/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddFolderComponent from '../components/AddFolderComponent';
import {FilesContext, FilesContextConsumer} from '../context';

function Home(props) {
  const [modalVisible, setModalVisible] = useState(false);
  let {state, dispatch} = useContext(FilesContext);

  useEffect(() => {
    dispatch({type: 'folders'});
  }, [dispatch]);

  const addFolder = () => {
    console.log('add folder');
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FilesContextConsumer>
        {(folders) => {
          console.log('Home-------', folders);
          return (
            <FoldersComponent
              navigation={props.navigation}
              folders={folders.state.folders}
            />
          );
        }}
      </FilesContextConsumer>
      <TouchableOpacity style={styles.btn} onPress={() => addFolder()}>
        <Icon name="folder-plus" size={25} color="#fff" />
      </TouchableOpacity>
      {modalVisible && <AddFolderComponent setModalVisible={setModalVisible} />}
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
