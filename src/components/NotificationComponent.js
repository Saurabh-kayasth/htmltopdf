import PushNotification from 'react-native-push-notification';

const NotificationComponent = (message) => {
  PushNotification.localNotification({
    // title: 'title',
    // autoCancel: true,
    // bigText:
    // 'This is local notification demo in React Native app. Only shown, when expanded.',
    // subText: 'Local Notification Demo',
    title: 'Scheduled File',
    message: message,
    // date: new Date(Date.now() + time * 1000),
    vibrate: true,
    vibration: 300,
    playSound: true,
    // soundName: 'default',
    // actions: '["Read Now", "Read Later"]',
  });
};

export default NotificationComponent;
