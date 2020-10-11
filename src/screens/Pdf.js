import React from 'react';
import {View} from 'react-native';
import HeaderCompponent from '../components/HeaderComponent';
import PdfFileComponent from '../components/PdfFileComponent';
import {Styles} from '../styles/Styles';

function Pdf(props) {
  return (
    <View style={Styles.container}>
      <HeaderCompponent header={'Pdf_name'} />
      <PdfFileComponent location={props.route.params.location} />
    </View>
  );
}

export default Pdf;
