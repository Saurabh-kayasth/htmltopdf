import React from 'react';
import {View} from 'react-native';
import HeaderCompponent from '../components/HeaderComponent';
import PdfFileComponent from '../components/PdfFileComponent';
import {Styles} from '../styles/Styles';

function Privacy(props) {
  return (
    <View style={Styles.container}>
      <HeaderCompponent header={'Privacy'} icon={'vpn'} />
    </View>
  );
}

export default Privacy;
