import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {View, Image, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Icon2 from 'react-native-vector-icons/Ionicons';
import MainStack from './router';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import Help from '../screens/Help';
import Privacy from '../screens/Privacy';
import Settings from '../screens/Settings';
import {HeadingColor, SecondaryColor} from '../constants/Theme';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props}>
        <View style={styles.topContainer}>
          <Image source={require('../assets/F1.png')} style={styles.profile} />
          <View>
            <Text style={styles.title}>WPC</Text>
          </View>
          <Text style={styles.username}>Website To PDF Converter</Text>
        </View>
        <DrawerItem
          label={() => <Text style={styles.label}>Home</Text>}
          onPress={() => props.navigation.navigate('tabs')}
          icon={() => <Icon name="home" size={22} color="#898f93" />}
        />
        <DrawerItem
          label={() => <Text style={styles.label}>Settings</Text>}
          onPress={() => props.navigation.navigate('Settings')}
          icon={() => <Icon name="cog" size={22} color="#898f93" />}
        />
        <DrawerItem
          label={() => <Text style={styles.label}>Help</Text>}
          onPress={() => props.navigation.navigate('Help')}
          icon={() => <Icon name="help-circle" size={22} color="#898f93" />}
        />
        <DrawerItem
          label={() => <Text style={styles.label}>Privacy</Text>}
          onPress={() => props.navigation.navigate('Privacy')}
          icon={() => <Icon name="vpn" size={22} color="#898f93" />}
        />
      </DrawerContentScrollView>
    </View>
  );
}

const MyDrawer = () => {
  console.log('init drawer');
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerType="back"
        edgeWidth={0}
        minSwipeDistance={0}
        initialRouteName="HomeStack"
        drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="HomeStack" component={MainStack} />
        <Drawer.Screen name="tabs" component={MainStack} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Help" component={Help} />
        <Drawer.Screen name="Privacy" component={Privacy} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MyDrawer;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: SecondaryColor,
  },
  header: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingRight: 0,
    backgroundColor: '#141f27',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  icon: {
    height: 50,
    width: 50,
  },
  topContainer: {
    padding: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: '#2b353c',
  },
  profile: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  title: {
    fontSize: 18,
    color: HeadingColor,
    fontWeight: 'bold',
    marginTop: 10,
  },
  username: {
    fontSize: 18,
    color: '#898f93',
  },
  data: {
    flexDirection: 'row',
    marginTop: 15,
  },
  following: {
    flexDirection: 'row',
    marginRight: 15,
  },
  followers: {
    flexDirection: 'row',
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    fontSize: 16,
    color: HeadingColor,
  },
  label: {
    fontSize: 18,
    color: HeadingColor,
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
    // fontWeight: 'bold',
  },
  bottomContainer: {
    padding: 10,
    position: 'absolute',
    bottom: 0,
    height: 50,
    borderTopWidth: 0.2,
    borderTopColor: '#2b353c',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  bottomIcon: {
    height: 40,
    width: 40,
  },
});
