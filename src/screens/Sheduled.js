import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import HeaderCompponent from '../components/HeaderComponent';

function Scheduled() {
  return (
    <View style={styles.container}>
      {/* <HeaderCompponent header={'Scheduled'} /> */}
    </View>
  );
}

export default Scheduled;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
