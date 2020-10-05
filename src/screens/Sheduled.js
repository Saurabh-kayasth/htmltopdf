import React, {useEffect, useState, useContext, useReducer} from 'react';
import {View, StyleSheet} from 'react-native';
import DataModel from '../Data/DataModel';
import HeaderCompponent from '../components/HeaderComponent';
import FilesComponent from '../components/FilesComponent';
// import {FilesContext, FilesContextConsumer} from '../context/indexxx';
import {ShedFilesReducer} from '../context/ShedFilesContext/ShedFilesReducer';
import {BackgroundColor} from '../constants/Theme';

function Sheduled(props) {
  const [files, setFiles] = useState(Array);
  const [state, sheddispatch] = useReducer(ShedFilesReducer);
  // let {state, dispatch} = useContext(FilesContext);

  // useEffect(() => {
  // const dataModel = new DataModel();
  // const fileList = dataModel.getFavFiles();
  // setFiles(fileList);
  // dispatch({type: 'fav'});
  // }, [dispatch]);

  useEffect(() => {
    sheddispatch({type: 'get'});
  }, [sheddispatch]);

  return (
    <View style={styles.container}>
      {/* <HeaderCompponent header={'Favourites'} /> */}
      {/* <FilesContextConsumer>
        {(value) => {
          console.log('Home-------', value);
          return ( */}
      {/* <FilesComponent navigation={props.navigation} files={value.state.files} /> */}
      {state && (
        <FilesComponent
          navigation={props.navigation}
          sheddispatch={sheddispatch}
          files={state.files}
        />
      )}
      {/* );
        }}
      </FilesContextConsumer> */}
    </View>
  );
}

export default Sheduled;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
});
