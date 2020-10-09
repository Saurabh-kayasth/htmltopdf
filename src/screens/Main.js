import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Clipboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  BackgroundColor,
  HeadingColor,
  PlaceholderColor,
  SecondaryColor,
} from '../constants/Theme';

const Main = () => {
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  // const [copiedText, setCopiedText] = useState('');

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setFileUrl(text);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/down.png')} style={styles.img} />
      <Text style={styles.heading}>Make PDF</Text>
      <TextInput
        placeholder="Enter file name..."
        placeholderTextColor={PlaceholderColor}
        style={styles.input}
        value={fileName}
        onChangeText={(text) => setFileName(text)}
      />
      <View style={styles.pasteContainer}>
        <TextInput
          placeholder="Enter URL..."
          placeholderTextColor={PlaceholderColor}
          style={[styles.input, {width: '82%', marginRight: 10}]}
          value={fileUrl}
          onChangeText={(text) => setFileUrl(text)}
        />
        <TouchableOpacity
          style={styles.paste}
          onPress={() => fetchCopiedText()}>
          <Icon name="content-copy" size={23} color="#fff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Icon name="download" size={20} color={HeadingColor} />
      </TouchableOpacity>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor,
    padding: 20,
  },
  heading: {
    fontSize: 17,
    color: HeadingColor,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: SecondaryColor,
    marginTop: 10,
    borderRadius: 5,
    paddingLeft: 10,
    borderWidth: 0.2,
    borderColor: HeadingColor,
    color: HeadingColor,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: SecondaryColor,
    padding: 10,
    marginTop: 10,
  },
  img: {
    width: '100%',
    height: 250,
  },
  pasteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  paste: {
    width: '15%',
    height: 40,
    borderRadius: 5,
    elevation: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: SecondaryColor,
    padding: 10,
    marginTop: 10,
    borderWidth: 0.2,
    borderColor: HeadingColor,
    color: HeadingColor,
  },
});
