import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import HeaderCompponent from '../components/HeaderComponent';
import PdfFileComponent from '../components/PdfFileComponent';

function Pdf() {
  const shareFile = () => {};

  return (
    <View style={styles.container}>
      <HeaderCompponent header={'Pdf_name'} />
      <PdfFileComponent />
    </View>
  );
}

export default Pdf;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
