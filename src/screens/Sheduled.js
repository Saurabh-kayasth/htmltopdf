import React, {useEffect, useState, useContext, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
// import DataModel from '../Data/DataModel';
// import HeaderCompponent from '../components/HeaderComponent';
// import FilesComponent from '../components/FilesComponent';
// import {FilesContext, FilesContextConsumer} from '../context/indexxx';

function Scheduled(props) {
  const [files, setFiles] = useState(Array);
  // let {state, dispatch} = useContext(FilesContext);

  // useEffect(() => {
  // const dataModel = new DataModel();
  // const fileList = dataModel.getFavFiles();
  // setFiles(fileList);
  //   dispatch({type: 'sched'});
  // }, [dispatch]);

  return (
    <View style={styles.container}>
      {/* <HeaderCompponent header={'Favourites'} /> */}
      {/* <FilesContextConsumer>
        {(value) => {
          console.log('ssssssssssss-------', value);
          return (
            <FilesComponent
              navigation={props.navigation}
              files={value.state.files}
            />
          );
        }}
      </FilesContextConsumer> */}
    </View>
  );
}

export default Scheduled;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
