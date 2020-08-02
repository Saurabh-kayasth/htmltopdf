import React, {useState, useContext} from 'react';
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
import {FilesContext, FilesContextConsumer} from '../context';

const {width} = Dimensions.get('window');
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function FilesData(props) {
  let {state, dispatch} = useContext(FilesContext);
  const {
    id,
    fileName,
    isScheduled,
    scheduledAt,
    dateTime,
    isFavourite,
  } = props.item;

  const [favourite, setFavourite] = useState(isFavourite);
  const goToFolder = () => {
    props.navigation.navigate('pdf');
  };

  const addToFav = () => {
    setFavourite(!favourite);
    const dataModel = new DataModel();
    console.log(favourite);
    const status = favourite ? 0 : 1;
    console.log(status);
    dataModel.addToFavWithFileId(id, status);
    // props.refresh();
    dispatch({type: 'fav'});
  };

  const renderLeftAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [10, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity style={styles.btnLeft} onPress={() => addToFav()}>
        <AnimatedIcon
          name={favourite ? 'star' : 'star-outline'}
          size={35}
          color={PrimaryColor}
          style={{transform: [{scale}]}}
        />
      </TouchableOpacity>
    );
  };

  const renderRightAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 10],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity style={styles.btn}>
        <AnimatedIcon
          name="delete"
          size={35}
          color={PrimaryColor}
          style={{transform: [{scale}]}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      rightThreshold={20}
      renderRightActions={(progress, dragX) =>
        renderRightAction(progress, dragX)
      }
      renderLeftActions={(progress, dragX) => renderLeftAction(progress, dragX)}
      fricton={2}>
      <TouchableWithoutFeedback onPress={() => goToFolder()}>
        <View style={styles.folderContainer}>
          <View style={styles.filesData}>
            <Icon name="file" color={PrimaryColor} size={50} />
            <View style={styles.data}>
              <Text style={styles.folderName}>{fileName}</Text>
              <Text style={styles.description}>
                {isScheduled
                  ? moment(new Date(scheduledAt)).calendar()
                  : 'Not Scheduled'}
              </Text>
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

function FilesComponent(props) {
  // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <View style={styles.container}>
      <FlatList
        data={props.files}
        renderItem={({item, index}) => {
          return (
            <FilesData
              navigation={props.navigation}
              item={item}
              refresh={props.refresh}
            />
          );
        }}
      />
    </View>
  );
}

export default FilesComponent;

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
  filesData: {
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
    // width: width - 150,
  },
  description: {
    fontSize: 15,
    color: 'gray',
  },
  btn: {
    marginTop: 10,
    width: 80,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  btnLeft: {
    marginTop: 10,
    width: 80,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  dateTime: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  dateTimeText: {
    fontSize: 12,
    color: PlaceholderColor,
  },
});
