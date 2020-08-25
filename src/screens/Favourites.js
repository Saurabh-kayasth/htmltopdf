import React, {useEffect, useState, useContext, useReducer} from 'react';
import {View, StyleSheet} from 'react-native';
import DataModel from '../Data/DataModel';
import HeaderCompponent from '../components/HeaderComponent';
import FilesComponent from '../components/FilesComponent';
// import {FilesContext, FilesContextConsumer} from '../context/indexxx';
import {FavFilesReducer} from '../context/FavFilesContext/FavFilesReducer';

function Favourites(props) {
  const [files, setFiles] = useState(Array);
  const [state, favdispatch] = useReducer(FavFilesReducer);
  // let {state, dispatch} = useContext(FilesContext);

  // useEffect(() => {
  // const dataModel = new DataModel();
  // const fileList = dataModel.getFavFiles();
  // setFiles(fileList);
  // dispatch({type: 'fav'});
  // }, [dispatch]);

  useEffect(() => {
    favdispatch({type: 'get'});
  }, [favdispatch]);

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
          favdispatch={favdispatch}
          files={state.files}
        />
      )}
      {/* );
        }}
      </FilesContextConsumer> */}
    </View>
  );
}

export default Favourites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
