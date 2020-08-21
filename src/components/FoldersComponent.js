import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {PrimaryColor, PlaceholderColor} from '../constants/Theme';
import moment from 'moment';
import DataModel from '../Data/DataModel';
// import {FilesContext, FilesContextConsumer} from '../context/indexxx';

const {width} = Dimensions.get('window');
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function FolderData(props) {
  // let {state, dispatch} = useContext(FilesContext);

  const goToFolder = (id, folderName, dateTime) => {
    const item = {};
    item.id = id;
    item.folderName = folderName;
    item.dateTime = dateTime;
    props.navigation.navigate('folder', {
      item: item,
    });
  };

  const {id, folderName, dateTime} = props.item;

  const deleteFolder = () => {
    const dataModel = new DataModel();
    dataModel.deleteFolderWithId(id);
    props.dispatch({type: 'delete', payload: id});
  };

  const renderRightAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [10, 110],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity style={styles.btn} onPress={() => deleteFolder()}>
        <AnimatedIcon
          name="delete"
          size={45}
          color={PrimaryColor}
          style={{transform: [{scale}]}}
        />
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable
      leftThreshold={20}
      renderLeftActions={(progress, dragX) =>
        renderRightAction(progress, dragX)
      }
      fricton={2}>
      <TouchableWithoutFeedback
        onPress={() => goToFolder(id, folderName, dateTime)}>
        <View style={styles.folderContainer}>
          <View style={styles.folderData}>
            <Icon name="folder" color={PrimaryColor} size={50} />
            <View style={styles.data}>
              <Text style={styles.folderName}>{folderName}</Text>
              <Text style={styles.description}>Number of files....</Text>
            </View>
          </View>
          <View style={styles.dateTime}>
            <Text style={styles.dateTimeText}>
              {moment(new Date(dateTime)).format('DD/MM/YY')}
            </Text>
            <Text style={styles.dateTimeText}>
              {moment(new Date(dateTime)).calendar()}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
}

function FoldersComponent(props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={props.data.folders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <FolderData
              navigation={props.navigation}
              item={item}
              dispatch={props.dispatch}
            />
          );
        }}
      />
    </View>
  );
}

export default FoldersComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  folderContainer: {
    width: width - 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    padding: 10,
    paddingLeft: 5,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  folderData: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  folderName: {
    fontSize: 16,
    color: PrimaryColor,
    marginTop: 5,
    fontWeight: 'bold',
  },
  data: {
    marginLeft: 10,
    // width: '55%',
  },
  description: {
    fontSize: 15,
    color: 'gray',
  },
  btn: {
    marginTop: 10,
    width: 110,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  dateTime: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  dateTimeText: {
    fontSize: 12,
    color: PlaceholderColor,
  },
});
