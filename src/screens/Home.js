import React, {useState, useEffect, useReducer, useContext} from 'react';
import {View, TouchableOpacity} from 'react-native';
import FoldersComponent from '../components/FoldersComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddFolderComponent from '../components/AddFolderComponent';
import {FolderReducer} from '../context/FoldersContext/FoldersReducer';
import {Styles} from '../styles/Styles';
import {useFocusEffect} from '@react-navigation/native';
import {IconColor} from '../constants/Theme';
import {ThemeContext, ThemeContextConsumer} from '../context/ThemeContext';
import DrawerHeaderCompponent from '../components/DrawerHeaderComponent';

function Home(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [state, dispatch] = useReducer(FolderReducer);
  let {theme, themeDispatch} = useContext(ThemeContext);

  useEffect(() => {
    dispatch({type: 'get'});
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          if (isActive) {
            dispatch({type: 'get'});
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

  const addFolder = () => {
    setModalVisible(true);
  };

  return (
    <ThemeContextConsumer>
      {(value) => {
        console.log('consumervale2222-------', value.state);
        return (
          <>
            <DrawerHeaderCompponent
              header={'Folders'}
              icon={'menu'}
              navigation={props.navigation}
            />
            <View
              style={[
                Styles.container,
                {backgroundColor: value.state.BackgroundColor},
              ]}>
              {state && (
                <FoldersComponent
                  theme={value.state}
                  navigation={props.navigation}
                  data={state}
                  dispatch={dispatch}
                />
              )}

              <TouchableOpacity style={Styles.btn} onPress={() => addFolder()}>
                <Icon name="folder-plus" size={25} color={IconColor} />
              </TouchableOpacity>
              {modalVisible && (
                <AddFolderComponent
                  setModalVisible={setModalVisible}
                  dispatch={dispatch}
                />
              )}
            </View>
          </>
        );
      }}
    </ThemeContextConsumer>
  );
}

export default Home;
