import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import HeaderCompponent from '../components/HeaderComponent';
import {PrimaryColor} from '../constants/Theme';
import PdfFileComponent from '../components/PdfFileComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function Pdf() {
  const shareFile = () => {};

  return (
    <View style={styles.container}>
      <HeaderCompponent header={'Pdf_name'} />
      <PdfFileComponent />
      <TouchableOpacity style={styles.btn} onPress={() => shareFile()}>
        <Icon name="share" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

export default Pdf;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    backgroundColor: PrimaryColor,
    elevation: 10,
    position: 'absolute',
    bottom: 30,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
