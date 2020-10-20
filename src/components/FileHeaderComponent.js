import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {HeadingColor, SecondaryColor} from '../constants/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

function FileHeaderCompponent(props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.navigation.goBack}>
        <Icon name="arrow-left" size={30} color={HeadingColor} />
      </TouchableOpacity>
      {/* <Icon name={props.icon} size={30} color={HeadingColor} /> */}
      <View style={styles.fileData}>
        <Text style={styles.header}>{props.header}</Text>
        <Text numberOfLines={1} style={styles.location}>
          {props.location}
        </Text>
      </View>

      {/* <View>
        <Icon name="md-more" size={25} color="#fff" />
      </View> */}
    </View>
  );
}

export default FileHeaderCompponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: SecondaryColor,
    // justifyContent: 'center',
    padding: 10,
    paddingLeft: 15,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    color: HeadingColor,
    marginLeft: 10,
  },
  location: {
    fontSize: 14,
    color: HeadingColor,
    marginLeft: 10,
    width: width - 70,
  },
});
