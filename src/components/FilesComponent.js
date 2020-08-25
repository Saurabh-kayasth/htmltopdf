import React, {useState, useContext, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import OptionsMenu from 'react-native-options-menu';
import DateTimePicker from '@react-native-community/datetimepicker';
import {PrimaryColor, PlaceholderColor} from '../constants/Theme';
import moment from 'moment';
import DataModel from '../Data/DataModel';
// import {FilesContext, FilesContextConsumer} from '../context/indexxx';

const {width} = Dimensions.get('window');
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function FilesData(props) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [doneSelection, setDoneSelection] = useState(false);
  //   let {state, dispatch} = useContext(FilesContext);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

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
    // console.log(favourite);
    const status = favourite ? 0 : 1;
    if (favourite) {
      console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
      props.favdispatch({type: 'delete', payload: id});
    }
    // console.log(status);
    dataModel.addToFavWithFileId(id, status);
    // props.refresh();
  };

  const deleteFile = () => {
    const dataModel = new DataModel();

    if (props.dispatch !== undefined) {
      props.dispatch({type: 'delete', payload: id});
    }

    if (props.favdispatch !== undefined) {
      props.favdispatch({type: 'delete', payload: id});
    }

    dataModel.deleteFileWithId(id);
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
      <TouchableOpacity style={styles.btn} onPress={() => deleteFile()}>
        <AnimatedIcon
          name="delete"
          size={35}
          color={PrimaryColor}
          style={{transform: [{scale}]}}
        />
      </TouchableOpacity>
    );
  };

  const getDisplayDateBySelectedMode = () => {
    const {selectedMode} = ref.current;
    return new Date();
  };

  const ref = useRef({
    pickerMode: 'time', // used to determine the view the date picker opens in
    selectedMode: null, // should be either assignDate | timeFrom | timeTo
  });

  const handleDateTimePickerChange = (event, selectedDate = new Date()) => {
    setShowDatePicker(false);

    if (!doneSelection) {
      ref.current.selectedMode = 'time';
      setDate(selectedDate);
      console.log(date);
      setDoneSelection(true);
      setShowDatePicker(true);
    } else {
      setTime(selectedDate);
      ref.current.selectedMode = 'date';
      setDoneSelection(false);
      console.log(time);
      const dataModel = new DataModel();
      dataModel.setFileSchedule(id, date, time);
      //   dispatch({type: 'sched'});
    }

    // if (ref.current.selectedMode === 'date') {
    //   setDate(selectedDate);
    // } else if (ref.current.selectedMode === 'time') {
    //   setTime(selectedDate);

    // }
  };

  const setSelectedAndPickerModeAndOpenPicker = () => {
    ref.current.selectedMode = 'date';
    setShowDatePicker(true);
  };

  return (
    <>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={getDisplayDateBySelectedMode()}
          mode={ref.current.selectedMode}
          is24Hour
          display="default"
          onChange={(event, selectedDate) =>
            handleDateTimePickerChange(event, selectedDate)
          }
        />
      )}
      <Swipeable
        rightThreshold={20}
        renderRightActions={(progress, dragX) =>
          renderRightAction(progress, dragX)
        }
        renderLeftActions={(progress, dragX) =>
          renderLeftAction(progress, dragX)
        }
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
                {/* {moment(new Date(dateTime)).format('DD/MM/YY')} */}
                <OptionsMenu
                  customButton={<Icon name="menu" size={25} color="#000" />}
                  options={['Delete', 'Add To Favourite', 'Schedule This File']}
                  actions={[
                    setSelectedAndPickerModeAndOpenPicker,
                    setSelectedAndPickerModeAndOpenPicker,
                    setSelectedAndPickerModeAndOpenPicker,
                  ]}
                />
                {/* <Icon name="clock" color="#2b2b39" size={25} /> */}
              </Text>
              <Text style={styles.dateTimeText}>
                {moment(new Date(dateTime)).calendar()}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Swipeable>
    </>
  );
}

function FilesComponent(props) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    if (props.favdispatch !== undefined) {
      console.log('refreshing......');
      setRefreshing(true);
      props.favdispatch({type: 'get'});
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={props.files}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }
        renderItem={({item, index}) => {
          return (
            <FilesData
              navigation={props.navigation}
              item={item}
              refresh={props.refresh}
              dispatch={props.dispatch}
              favdispatch={props.favdispatch}
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
