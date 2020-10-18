import React, {useState, useEffect, useReducer} from 'react';
import {View, TouchableOpacity} from 'react-native';
import HeaderCompponent from '../components/HeaderComponent';
import FilesComponent from '../components/FilesComponent';
import AddFileComponent from '../components/AddFileComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FilesReducer} from '../context/FIlesContext/FilesReducer';
import {Styles} from '../styles/Styles';

function Folder(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [state, dispatch] = useReducer(FilesReducer);

  const addFile = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    dispatch({type: 'get', payload: props.route.params.item.id});
  }, [dispatch, props.route.params.item.id]);

  return (
    <View style={Styles.container}>
      <HeaderCompponent
        header={props.route.params.item.folderName}
        icon={'folder'}
      />
      {state && (
        <FilesComponent
          navigation={props.navigation}
          dispatch={dispatch}
          files={state.files}
        />
      )}

      <TouchableOpacity style={Styles.btn} onPress={() => addFile()}>
        <Icon name="file-plus" size={25} color="#fff" />
      </TouchableOpacity>
      {modalVisible && (
        <AddFileComponent
          setModalVisible={setModalVisible}
          item={props.route.params.item}
          folderName={props.route.params.item.folderName}
          dispatch={dispatch}
        />
      )}
    </View>
  );
}

export default Folder;
