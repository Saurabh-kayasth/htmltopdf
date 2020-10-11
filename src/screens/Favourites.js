import React, {useEffect, useReducer} from 'react';
import {View} from 'react-native';
import FilesComponent from '../components/FilesComponent';
import {FavFilesReducer} from '../context/FavFilesContext/FavFilesReducer';
import {useFocusEffect} from '@react-navigation/native';
import {Styles} from '../styles/Styles';

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
    <View style={Styles.container}>
      {state && (
        <FilesComponent
          navigation={props.navigation}
          favdispatch={favdispatch}
          files={state.files}
        />
      )}
    </View>
  );
}

export default Favourites;
