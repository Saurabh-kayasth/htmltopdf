import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import HeaderCompponent from '../components/HeaderComponent';

function Folder() {
  return (
    <View style={styles.container}>
      <HeaderCompponent header={'Folder name'} />
    </View>
  );
}

export default Folder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
