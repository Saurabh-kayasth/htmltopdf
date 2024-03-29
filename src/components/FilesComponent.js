import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  RefreshControl,
  Switch,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import DateTimePicker from '@react-native-community/datetimepicker';
import {IconColor} from '../constants/Theme';
import moment from 'moment';
import DataModel from '../Data/DataModel';
import {styles} from '../styles/FilesStyles';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const {width} = Dimensions.get('window');

function FilesData(props) {
  const {
    id,
    fileName,
    isScheduled,
    // scheduledAt,
    dateTime,
    isFavourite,
    location,
    scheduledAtDate,
    scheduledAtTime,
  } = props.item;

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [doneSelection, setDoneSelection] = useState(false);
  //   let {state, dispatch} = useContext(FilesContext);
  const [date, setDate] = useState(new Date(scheduledAtDate));
  const [time, setTime] = useState(new Date(scheduledAtTime));
  const [switchValue, setSwitchValue] = useState(false);

  // console.log(isScheduled);

  useEffect(() => {
    if (isScheduled) {
      setSwitchValue(true);
    }
  }, [isScheduled]);

  const [favourite, setFavourite] = useState(isFavourite);
  const goToFolder = () => {
    props.navigation.navigate('pdf', {location: location, fileName: fileName});
  };

  const addToFav = () => {
    setFavourite(!favourite);
    const dataModel = new DataModel();
    // console.log(favourite);
    const status = favourite ? 0 : 1;
    if (favourite) {
      console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=');
      if (props.favdispatch !== undefined) {
        props.favdispatch({type: 'delete', payload: id});
      }
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

    if (props.sheddispatch !== undefined) {
      props.sheddispatch({type: 'delete', payload: id});
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
          color={IconColor}
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
          color={IconColor}
          style={{transform: [{scale}]}}
        />
      </TouchableOpacity>
    );
  };

  const getDisplayDateBySelectedMode = () => {
    // const {selectedMode} = ref.current;
    return new Date();
  };

  const ref = useRef({
    pickerMode: 'time', // used to determine the view the date picker opens in
    selectedMode: null, // should be either assignDate | timeFrom | timeTo
  });

  const handleDateTimePickerChange = (event, selectedDate = new Date()) => {
    console.log(event.type);
    setShowDatePicker(false);

    if (event.type !== 'dismissed') {
      if (!doneSelection) {
        ref.current.selectedMode = 'time';
        setDate(selectedDate);
        console.log('hello ji', new Date(selectedDate).getMinutes());
        setDoneSelection(true);
        setShowDatePicker(true);
      } else {
        console.log('hello jiji', new Date(selectedDate).getMinutes());
        setTime(selectedDate);
        ref.current.selectedMode = 'date';
        setDoneSelection(false);
        // console.log('-------===========------------');
        setSwitchValue(true);
        // console.log(time);
        const dataModel = new DataModel();
        dataModel.setFileSchedule(id, date, selectedDate);
        //   dispatch({type: 'sched'});
      }
    } else {
      setDoneSelection(false);
      setShowDatePicker(false);
    }

    // if (ref.current.selectedMode === 'date') {
    //   setDate(selectedDate);
    // } else if (ref.current.selectedMode === 'time') {
    //   setTime(selectedDate);

    // }
  };

  const handleToggle = () => {
    // console.log(isScheduled);
    console.log(switchValue);
    if (!switchValue) {
      setSelectedAndPickerModeAndOpenPicker();
    } else {
      unshedule();
    }
  };

  const setSelectedAndPickerModeAndOpenPicker = () => {
    console.log(showDatePicker);
    ref.current.selectedMode = 'date';
    setShowDatePicker(true);
  };

  const unshedule = () => {
    const dataModel = new DataModel();
    if (props.sheddispatch !== undefined) {
      props.sheddispatch({type: 'delete', payload: id});
    }
    setSwitchValue(false);
    dataModel.setFileUnshedule(id);
  };

  const getFormattedDate = (date, time) => {
    let newDate = new Date(date);
    let newTime = new Date(time);
    const mm = newDate.getMonth() + 1;
    const newDateStr = `${newDate.getDate()}/${mm}/${newDate.getFullYear()}`;
    const newTimeStr = `${newTime.getHours()}:${newTime.getMinutes()}`;
    console.log(newDateStr + '  ' + newTimeStr);
    return newDateStr + '  ' + newTimeStr;
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
              <Icon name="file" color={IconColor} size={35} />
              <View style={styles.data}>
                <Text style={styles.folderName} numberOfLines={1}>
                  {fileName}
                </Text>
                <Text style={styles.description}>
                  {switchValue ? getFormattedDate(date, time) : 'Not Scheduled'}
                </Text>
              </View>
            </View>

            <View style={styles.dateTime}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="clock" color="#40404c" size={22} />
                <Switch
                  trackColor={{false: '#767577', true: '#cc485f'}}
                  thumbColor={switchValue ? '#ff5b77' : '#f4f3f4'}
                  // style={{marginTop: 30}}
                  onValueChange={handleToggle}
                  value={switchValue}
                />
              </View>
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
  console.log(props.files);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    if (props.favdispatch !== undefined) {
      console.log('refreshing......');
      setRefreshing(true);
      props.favdispatch({type: 'get'});
      setRefreshing(false);
    }
    if (props.sheddispatch !== undefined) {
      console.log('refreshing......');
      setRefreshing(true);
      props.sheddispatch({type: 'get'});
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
              sheddispatch={props.sheddispatch}
            />
          );
        }}
      />
    </View>
  );
}

export default FilesComponent;
