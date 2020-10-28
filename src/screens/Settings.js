import React, {useEffect, useState} from 'react';
import {
  View,
  Switch,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import HeaderCompponent from '../components/HeaderComponent';
import {
  BackgroundColor,
  BorderColor,
  HeadingColor,
  IconColor,
  PlaceholderColor,
  SecondaryColor,
} from '../constants/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {LAZY_LOAD_KEY, THEME_KEY} from '../constants/Constants';

function Settings(props) {
  const [switchValue, setSwitchValue] = useState(false);
  const [theme, setTheme] = useState('');
  // const [lazyLoad, setLazyLoad] = useState('');

  const handleToggle = async () => {
    if (switchValue) {
      await AsyncStorage.setItem(LAZY_LOAD_KEY, 'FALSE');
    } else {
      await AsyncStorage.setItem(LAZY_LOAD_KEY, 'TRUE');
    }

    setSwitchValue(!switchValue);
  };

  const onThemeSelection = async (themeName) => {
    await AsyncStorage.setItem(THEME_KEY, themeName);
    setTheme(themeName);
  };

  useEffect(() => {
    getTheme();
    getLazyStatus();
  }, []);

  const getLazyStatus = async () => {
    const isLazyLoadEnabled = await AsyncStorage.getItem(LAZY_LOAD_KEY);
    console.log('=================', isLazyLoadEnabled);
    if (isLazyLoadEnabled === null || isLazyLoadEnabled === undefined) {
      setSwitchValue(false);
    } else {
      if (isLazyLoadEnabled === 'TRUE') {
        setSwitchValue(true);
      } else {
        setSwitchValue(false);
      }
    }
  };

  const getTheme = async () => {
    const themeName = await AsyncStorage.getItem(THEME_KEY);
    console.log(themeName);
    if (themeName === null || themeName === undefined) {
      setTheme('DEFAULT');
    } else {
      setTheme(themeName);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderCompponent header={'Settings'} icon={'cog'} />

      {/* LAZY LOADING */}
      <View style={styles.optioNMain}>
        <View style={styles.optionContainer}>
          <View style={styles.optionLeft}>
            <Icon name="script-text-outline" size={20} color={IconColor} />
            <Text style={styles.text}>Lazy Loading</Text>
          </View>
          <View>
            <Switch
              trackColor={{false: '#767577', true: '#4c6254'}}
              thumbColor={switchValue ? '#6d8c79' : '#f4f3f4'}
              onValueChange={handleToggle}
              value={switchValue}
            />
          </View>
        </View>
        <Text style={styles.description}>
          If enabled it will try to open up all lazy elements but dowloading
          speed may get slow down.
        </Text>
      </View>

      {/* THEME */}
      <View style={styles.optioNMain}>
        <View
          style={[
            styles.optionContainer,
            {flexDirection: 'column', alignItems: 'flex-start'},
          ]}>
          <View style={styles.optionLeft}>
            <Icon name="tab" size={20} color={IconColor} />
            <Text style={styles.text}>Theme</Text>
          </View>
          <View style={styles.tabsContainer}>
            <TouchableHighlight
              onPress={() => onThemeSelection('DEFAULT')}
              style={[
                styles.btn,
                {borderColor: theme === 'DEFAULT' ? '#ff5b77' : BorderColor},
              ]}>
              <Image style={styles.img} source={require('../assets/F1.png')} />
            </TouchableHighlight>
            <TouchableHighlight
              style={[
                styles.btn,
                {borderColor: theme === 'DARK' ? '#ff5b77' : BorderColor},
              ]}
              onPress={() => onThemeSelection('DARK')}>
              <Image style={styles.img} source={require('../assets/F1.png')} />
            </TouchableHighlight>
            <TouchableHighlight
              style={[
                styles.btn,
                {borderColor: theme === 'LIGHT' ? '#ff5b77' : BorderColor},
              ]}
              onPress={() => onThemeSelection('LIGHT')}>
              <Image style={styles.img} source={require('../assets/F1.png')} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
  optioNMain: {
    margin: 10,
    marginBottom: 0,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: SecondaryColor,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: HeadingColor,
    marginLeft: 10,
  },
  description: {
    color: PlaceholderColor,
    marginTop: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    width: '100%',
    justifyContent: 'space-around',
  },
  btn: {
    width: '30%',
    height: 190,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: BorderColor,
    // backgroundColor: BackgroundColor,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 15,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
