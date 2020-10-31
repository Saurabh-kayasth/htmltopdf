import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {HeadingColor, SecondaryColor} from '../constants/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerActions} from '@react-navigation/native';

function DrawerHeaderCompponent(props) {
  const openDrawer = () => {
    props.navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openDrawer}>
        <Icon name={props.icon} size={25} color={HeadingColor} />
      </TouchableOpacity>
      <Text style={styles.header}>{props.header}</Text>
      {/* <View>
        <Icon name="md-more" size={25} color="#fff" />
      </View> */}
    </View>
  );
}

export default DrawerHeaderCompponent;

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
    fontSize: 24,
    color: HeadingColor,
    marginLeft: 10,
  },
});
