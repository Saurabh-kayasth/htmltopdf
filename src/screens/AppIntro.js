import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {HeadingColor, SecondaryColor} from '../constants/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import {STORAGE_KEY} from '../constants/Constants';

const {width, height} = Dimensions.get('window');

const slides = [
  {
    key: 1,
    title: 'Manage Document',
    text: 'Documents at your finger',
    description:
      'Easily organise your documents in app as well as in file manager',
    image: require('../assets/F1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Other cool stuff',
    description: 'Easily organise your documents',
    image: require('../assets/down.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: "I'm already out of descriptions",
    description: 'Easily organise your documents',
    image: require('../assets/down.png'),
    backgroundColor: '#22bcb5',
  },
];

const AppIntro = (props) => {
  const _renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  const _onDone = async () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    console.log('done');
    props.setShowMainApp(true);
    await AsyncStorage.setItem(STORAGE_KEY, 'true');
  };

  const _onSkip = async () => {
    props.setShowMainApp(true);
    await AsyncStorage.setItem(STORAGE_KEY, 'true');
  };

  const _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="arrow-forward" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };

  return (
    <>
      <StatusBar backgroundColor="#22222d" />
      <AppIntroSlider
        showPrevButton
        showSkipButton
        renderItem={_renderItem}
        data={slides}
        onDone={_onDone}
        onSkip={_onSkip}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
      />
    </>
  );
};

export default AppIntro;

const styles = StyleSheet.create({
  slide: {
    height: height + 50,
    width: width,
    padding: 15,
    backgroundColor: '#22222d',
  },
  title: {
    color: HeadingColor,
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  image: {
    // height: '30%',
    height: height - 230,
    width: width - 125,
    alignSelf: 'center',
    marginTop: 60,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 2350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width - 50,
    height: width - 50,
    backgroundColor: '#2b2b39',
    borderRadius: (width - 50) / 2,
    marginTop: '20%',
    alignSelf: 'center',
    overflow: 'hidden',
    // elevation: 5,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: 20,
    alignSelf: 'center',
    textAlign: 'center',
  },
  description: {
    color: '#e5e5e5',
    // fontWeight: 'bold',
    fontSize: 18,
    // marginTop: 20,
    alignSelf: 'center',
    textAlign: 'center',
    width: width - 115,
  },
});
