import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BackgroundColor} from '../constants/Theme';

const Main = () => {
  return <View style={styles.container}></View>;
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
});
