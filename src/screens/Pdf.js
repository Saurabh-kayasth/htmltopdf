import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import HeaderCompponent from '../components/HeaderComponent';
import PdfFileComponent from '../components/PdfFileComponent';

function Pdf(props) {
  console.log(props.route.params.location);
  const shareFile = () => {};

  return (
    <View style={styles.container}>
      <HeaderCompponent header={'Pdf_name'} />
      <PdfFileComponent location={props.route.params.location} />
    </View>
  );
}

export default Pdf;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
