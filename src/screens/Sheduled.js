import React, {useEffect, useReducer} from 'react';
import {View} from 'react-native';
import FilesComponent from '../components/FilesComponent';
import {ShedFilesReducer} from '../context/ShedFilesContext/ShedFilesReducer';
import {useFocusEffect} from '@react-navigation/native';
import {Styles} from '../styles/Styles';
import DrawerHeaderCompponent from '../components/DrawerHeaderComponent';

function Sheduled(props) {
  const [state, sheddispatch] = useReducer(ShedFilesReducer);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          if (isActive) {
            sheddispatch({type: 'get'});
          }
        } catch (e) {
          console.log(e);
        }
      };

      fetchUser();

      return () => {
        isActive = false;
      };
    }, []),
  );

  useEffect(() => {
    sheddispatch({type: 'get'});
  }, [sheddispatch]);

  return (
    <>
      <DrawerHeaderCompponent
        header={'Scheduled FIles'}
        icon={'menu'}
        navigation={props.navigation}
      />
      <View style={Styles.container}>
        {state && (
          <FilesComponent
            navigation={props.navigation}
            sheddispatch={sheddispatch}
            files={state.files}
          />
        )}
      </View>
    </>
  );
}

export default Sheduled;
