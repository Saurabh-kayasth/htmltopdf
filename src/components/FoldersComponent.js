import React from 'react';
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

const {width, height} = Dimensions.get('window');
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

function FolderData(props) {
  const goToFolder = () => {
    props.navigation.navigate('folder');
  };

  const renderRightAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-110, 10],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity style={styles.btn}>
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
      rightThreshold={20}
      renderRightActions={(progress, dragX) =>
        renderRightAction(progress, dragX)
      }
      fricton={2}>
      <TouchableWithoutFeedback onPress={() => goToFolder()}>
        <View style={styles.folderContainer}>
          <Icon name="folder" color={PrimaryColor} size={50} />
          <View style={styles.data}>
            <Text style={styles.folderName}>Folder Name</Text>
            <Text style={styles.description}>Last Added File...</Text>
          </View>
          <View style={styles.dateTime}>
            <Text style={styles.dateTimeText}>29 Feb</Text>
            <Text style={styles.dateTimeText}>12:45 PM</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
}

function FoldersComponent(props) {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <View style={styles.container}>
      <FlatList
        data={arr}
        renderItem={({item, index}) => {
          return <FolderData navigation={props.navigation} />;
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
    borderRadius: 10,
  },
  folderName: {
    fontSize: 16,
    color: PrimaryColor,
    marginTop: 5,
    fontWeight: 'bold',
  },
  data: {
    marginLeft: 10,
    width: width - 150,
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
  },
  dateTimeText: {
    fontSize: 12,
    color: PlaceholderColor,
  },
});
