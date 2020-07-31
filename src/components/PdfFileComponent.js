import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Share,
  TouchableOpacity,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {PrimaryColor} from '../constants/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

function PdfFileComponent() {
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const source = {
    uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    cache: true,
  };

  const share = () => {
    var shareOptions = {
      title: 'Covid-19',
      message:
        'File Name : ' +
        'userName' +
        '\n' +
        'props.item.message' +
        '\nCredit : Covid Tracker',
      // message: video.content + " " + "http://freehitnews.com?link=" + video.media_uri,
      // url: this.props.item.img_url,
      // subject: this.props.item.img_url, //  for email
    };
    Share.share(
      Object.assign(shareOptions, {
        social: 'whatsapp',
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
          console.log(filePath);
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
      <TouchableOpacity style={styles.btn} onPress={() => share()}>
        <Icon name="share" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

export default PdfFileComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: width,
    height: height,
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
