import React from 'react';
import {View} from 'react-native';
import FileHeaderCompponent from '../components/FileHeaderComponent';
import PdfFileComponent from '../components/PdfFileComponent';
import {Styles} from '../styles/Styles';

function Pdf(props) {
  console.log(props);
  return (
    <View style={Styles.container}>
      <FileHeaderCompponent
        header={props.route.params.fileName}
        icon={'file'}
        location={props.route.params.location}
        navigation={props.navigation}
      />
      <PdfFileComponent location={props.route.params.location} />
    </View>
  );
}

export default Pdf;
