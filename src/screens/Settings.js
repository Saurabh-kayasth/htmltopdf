import React, {useState} from 'react';
import {View, Switch, Text, StyleSheet, TouchableOpacity} from 'react-native';
import HeaderCompponent from '../components/HeaderComponent';
import {
  BackgroundColor,
  HeadingColor,
  IconColor,
  SecondaryColor,
} from '../constants/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DataModel from '../Data/DataModel';

function Settings(props) {
  const [switchValue, setSwitchValue] = useState(false);

  const handleToggle = () => {
    setSwitchValue(!switchValue);
    const dataModel = new DataModel();
    dataModel.setLazyLoad(!switchValue);
  };

  const onTabSelection = (tabName) => {};

  return (
    <View style={styles.container}>
      <HeaderCompponent header={'Settings'} icon={'cog'} />

      {/* LAZY LOADING */}
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

      {/* DEFAULT TAB */}
      {/* <View
        style={[
          styles.optionContainer,
          {flexDirection: 'column', alignItems: 'flex-start'},
        ]}>
        <View style={styles.optionLeft}>
          <Icon name="tab" size={20} color={IconColor} />
          <Text style={styles.text}>Default Tab</Text>
        </View>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => onTabSelection('home')}>
            <Icon name="home-outline" color={IconColor} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => onTabSelection('folder')}>
            <Icon name="folder-outline" color={IconColor} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => onTabSelection('favourite')}>
            <Icon name="star-outline" color={IconColor} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => onTabSelection('scheduled')}>
            <Icon name="clock-outline" color={IconColor} size={25} />
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
  optionContainer: {
    margin: 10,
    marginBottom: 0,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: SecondaryColor,
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
  tabsContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  btn: {
    width: '23%',
    backgroundColor: BackgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
});
