import React from 'react';
import {View} from 'react-native';
import HeaderCompponent from '../components/HeaderComponent';
import {Styles} from '../styles/Styles';

function Help(props) {
  return (
    <View style={Styles.container}>
      <HeaderCompponent header={'Help'} icon={'help-circle'} />
    </View>
  );
}

export default Help;
