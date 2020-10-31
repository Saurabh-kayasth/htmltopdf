import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';
import {Styles} from '../styles/Styles';
import {BackgroundColor} from '../constants/Theme';
const {width, height} = Dimensions.get('window');

function PdfFileComponent(props) {
  // console.log(props.location);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  // console.log(`file://${props.location}`);
  const source = {
    uri: props.location,
    cache: true,
  };

  const share = async () => {
    Share.open({
      title: 'This is my report ',
      message: 'Message:',
      url: `file://${props.location}`,
      subject: 'Report',
    });
  };

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath, tableContents) => {
          console.log(`number of pages: ${numberOfPages}`);
          console.log(tableContents);
          setNumberOfPages(numberOfPages);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`current page: ${page}`);
          setCurrentPageNumber(page);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link presse: ${uri}`);
        }}
        style={styles.pdf}
      />
      <View style={styles.dataContainer}>
        <View style={[styles.pageContainer, {width: 110}]}>
          <Text style={styles.text}>PAGES : {numberOfPages}</Text>
        </View>
        <View style={styles.pageContainer}>
          <Text style={styles.text}>{currentPageNumber}</Text>
        </View>
      </View>
      <TouchableOpacity style={Styles.btn} onPress={() => share()}>
        <Icon name="share" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

export default PdfFileComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
  pdf: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: BackgroundColor,
  },
  dataContainer: {
    width: width - 10,
    alignSelf: 'center',
    marginTop: 10,
    position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  pageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
});
