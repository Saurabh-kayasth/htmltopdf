import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {HeadingColor, PrimaryColor, SecondaryColor} from '../constants/Theme';

function HeaderCompponent(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{props.header}</Text>
    </View>
  );
}

export default HeaderCompponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: SecondaryColor,
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 15,
    elevation: 10,
  },
  header: {
    fontSize: 24,
    color: HeadingColor,
  },
});
