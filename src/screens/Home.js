import React, {useState, useEffect, useReducer} from 'react';
import {View, TouchableOpacity} from 'react-native';
import FoldersComponent from '../components/FoldersComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddFolderComponent from '../components/AddFolderComponent';
import {FolderReducer} from '../context/FoldersContext/FoldersReducer';
import {Styles} from '../styles/Styles';

function Home(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [state, dispatch] = useReducer(FolderReducer);

  useEffect(() => {
    dispatch({type: 'get'});
  }, [dispatch]);

  const addFolder = () => {
    setModalVisible(true);
  };

  return (
    <View style={Styles.container}>
      {state && (
        <FoldersComponent
          navigation={props.navigation}
          data={state}
          dispatch={dispatch}
        />
      )}

      <TouchableOpacity style={Styles.btn} onPress={() => addFolder()}>
        <Icon name="folder-plus" size={25} color="#fff" />
      </TouchableOpacity>
      {modalVisible && (
        <AddFolderComponent
          setModalVisible={setModalVisible}
          dispatch={dispatch}
        />
      )}
    </View>
  );
}

export default Home;
