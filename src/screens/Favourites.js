import React, {useEffect, useReducer} from 'react';
import {View} from 'react-native';
import FilesComponent from '../components/FilesComponent';
import {FavFilesReducer} from '../context/FavFilesContext/FavFilesReducer';
import {useFocusEffect} from '@react-navigation/native';
import {Styles} from '../styles/Styles';
import DrawerHeaderCompponent from '../components/DrawerHeaderComponent';

function Favourites(props) {
  const [state, favdispatch] = useReducer(FavFilesReducer);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          if (isActive) {
            favdispatch({type: 'get'});
            console.log('focusing................');
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
    favdispatch({type: 'get'});
  }, [favdispatch]);

  return (
    <>
      <DrawerHeaderCompponent
        header={'Favourites'}
        icon={'menu'}
        navigation={props.navigation}
      />
      <View style={Styles.container}>
        {state && (
          <FilesComponent
            navigation={props.navigation}
            favdispatch={favdispatch}
            files={state.files}
          />
        )}
      </View>
    </>
  );
}

export default Favourites;
