import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BackgroundColor, PlaceholderColor} from '../constants/Theme';
import {Styles} from '../styles/Styles';

const NoFilesComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No files!</Text>
    </View>
  );
};

export default NoFilesComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BackgroundColor,
  },
  text: {
    color: PlaceholderColor,
    fontSize: 22,
  },
});
