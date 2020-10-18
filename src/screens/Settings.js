import React from 'react';
import {View} from 'react-native';
import HeaderCompponent from '../components/HeaderComponent';
import PdfFileComponent from '../components/PdfFileComponent';
import {Styles} from '../styles/Styles';

function Settings(props) {
  return (
    <View style={Styles.container}>
      <HeaderCompponent header={'Settings'} icon={'cog'} />
    </View>
  );
}

export default Settings;
