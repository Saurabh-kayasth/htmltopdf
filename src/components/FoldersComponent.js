import React from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {IconColor} from '../constants/Theme';
import moment from 'moment';
import DataModel from '../Data/DataModel';
import {styles} from '../styles/FilesStyles';
import MainStack from '../router/router';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function FolderData(props) {
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

  const deleteFolder = (e) => {
    const dataModel = new DataModel();
    props.dispatch({type: 'delete', payload: id});
    dataModel.deleteFolderWithId(id);
  };

  const renderRightAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [10, 110],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity style={styles.btn} onPress={deleteFolder}>
        <AnimatedIcon
          name="delete"
          size={45}
          color={IconColor}
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
          <View style={styles.filesData}>
            <Icon name="folder" color={IconColor} size={35} />
            <View style={styles.data}>
              <Text style={styles.folderName} numberOfLines={1}>
                {folderName}
              </Text>
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
