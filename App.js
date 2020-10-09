import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import MainStack from './src/router/router';
import {SecondaryColor, BackgroundColor} from './src/constants/Theme';
import BackgroundFetch from 'react-native-background-fetch';
import NotificationComponent from './src/components/NotificationComponent';
import DataModel from './src/Data/DataModel';
import PushNotification, {
  PushNotificationScheduleObject,
} from 'react-native-push-notification';

BackgroundFetch.configure(
  {
    minimumFetchInterval: 15, // <-- minutes (15 is minimum allowed)
    // Android options
    stopOnTerminate: false,
    forceAlarmManager: true,
    startOnBoot: true,
    requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
    requiresCharging: false, // Default
    requiresDeviceIdle: false, // Default
    requiresBatteryNotLow: false, // Default
    requiresStorageNotLow: false, // Default
    enableHeadless: true,
  },
  async () => {
    markAttendanceWithPiTest();
  },
);

BackgroundFetch.status((status) => {
  switch (status) {
    case BackgroundFetch.STATUS_RESTRICTED:
      console.log('BackgroundFetch restricted');
      break;
    case BackgroundFetch.STATUS_DENIED:
      console.log('BackgroundFetch denied');
      break;
    case BackgroundFetch.STATUS_AVAILABLE:
      console.log('BackgroundFetch is enabled');
      break;
  }
});

let markAttendanceWithPiTest = async () => {
  console.log(
    '============================hello bird============================',
  );
  NotificationComponent('hello message');
  // NotificationComponent('hello message two', 15);

  let persistentData = new DataModel();
  let tasks = persistentData.getTasksDueNow();
  console.log('yyyyyyyyyyyyyyyyyyyy');
  console.log(tasks);
  let notificationMessage = '';

  if (tasks != null && tasks.length > 0) {
    let suffString = '';
    if (tasks.length === 1) {
      suffString = 'is due';
    } else if (tasks.length === 2) {
      suffString = ' and 1 other task is due';
    } else {
      suffString = ' and ' + tasks.length + ' tasks are due';
    }
    let taskName = tasks[0].fileName;
    notificationMessage = taskName + suffString;
    NotificationComponent(notificationMessage);
  }
  try {
    let response = await fetch(
      'https://facebook.github.io/react-native/movies.json',
    );
    let responseJson = await response.json(
      BackgroundFetch.FETCH_RESULT_NEW_DATA,
    );
    console.log('[BackgroundFetch HeadlessTask response: ', responseJson);

    // Notification('message');

    BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
  } catch (error) {
    BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_FAILED);
  }
};

// Register your BackgroundFetch HeadlessTask
BackgroundFetch.registerHeadlessTask(markAttendanceWithPiTest);

function App() {
  console.disableYellowBox = true;
  useEffect(() => {
    // NotificationComponent('hello message', 10);
    // NotificationComponent('hello message two', 15);

    let persistentData = new DataModel();
    let tasks = persistentData.getTasksDueNow();
    console.log('xxxxxxxxxxxxxxxxxxxxxx');
    console.log(tasks);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={SecondaryColor} barStyle="light-content" />
      {/* <FoldersContextProvider> */}
      <MainStack />
      {/* </FoldersContextProvider> */}
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
});
