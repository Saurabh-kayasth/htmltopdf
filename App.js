import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import MainStack from './src/router/router';
import {SecondaryColor} from './src/constants/Theme';

function App() {
  console.disableYellowBox = true;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={SecondaryColor} barStyle="light-content" />
      <MainStack />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
