import React, {useEffect, useState} from 'react';
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
import {Styles} from '../styles/Styles';
import DropDownPicker from 'react-native-dropdown-picker';
import DataModel from '../Data/DataModel';

const Main = () => {
  const [fileName, setFileName] = useState('');
  const [folderName, setFolderName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [state, setState] = useState('');
  const [folderList, setFolderList] = useState([]);

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setFileUrl(text);
  };

  useEffect(() => {
    const dataModel = new DataModel();
    let folders = dataModel.getFolders();
    let foldersArr = [];
    for (let i = 0; i < folders.length; i++) {
      let folderObj = {};
      folderObj.value = folders[i].id;
      folderObj.label = folders[i].folderName;
      folderObj.icon = () => <Icon name="folder" size={18} color="#fff" />;
      foldersArr.push(folderObj);
    }
    setState(foldersArr[0].value);
    setFolderList(foldersArr);
  }, []);

  const onChangeItem = (item) => {
    console.log(item);
    setState(item.value);
    setFolderName(item.label);
  };

  const handleDropDownOpen = () => {
    const dataModel = new DataModel();
    let folders = dataModel.getFolders();
    let foldersArr = [];
    for (let i = 0; i < folders.length; i++) {
      let folderObj = {};
      folderObj.value = folders[i].id;
      folderObj.label = folders[i].folderName;
      folderObj.icon = () => <Icon name="folder" size={18} color="#fff" />;
      foldersArr.push(folderObj);
    }
    setState(foldersArr[0].value);
    setFolderList(foldersArr);
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require('../assets/down.png')} style={styles.img} /> */}
      <Text style={styles.heading}>Create PDF</Text>
      <TextInput
        placeholder="Enter file name..."
        placeholderTextColor={PlaceholderColor}
        style={styles.input}
        value={fileName}
        onChangeText={(text) => setFileName(text)}
      />
      <View style={Styles.pasteContainer}>
        <TextInput
          placeholder="Enter URL..."
          placeholderTextColor={PlaceholderColor}
          style={[styles.input, {width: '82%', marginRight: 10}]}
          value={fileUrl}
          onChangeText={(text) => setFileUrl(text)}
        />
        <TouchableOpacity
          style={Styles.paste}
          onPress={() => fetchCopiedText()}>
          <Icon name="content-copy" size={23} color="#fff" />
        </TouchableOpacity>
      </View>

      <DropDownPicker
        items={folderList}
        defaultValue={state}
        placeholder="Select a folder..."
        containerStyle={styles.dropmain}
        style={styles.dropdownContainer}
        labelStyle={styles.label}
        selectedtLabelStyle={styles.selectedtLabelStyle}
        searchable={true}
        searchablePlaceholder="Search for a folder"
        searchableError={() => <Text style={{color: '#fff'}}>Not Found</Text>}
        searchablePlaceholderTextColor="gray"
        seachableStyle={{color: '#fff'}}
        itemStyle={styles.itemStyle}
        dropDownStyle={styles.dropDownStyle}
        onChangeItem={(item) => onChangeItem(item)}
        arrowStyle={styles.arrowStyle}
        arrowColor="#fff"
        zIndex={400}
        onOpen={handleDropDownOpen}
      />
      <View style={Styles.pasteContainer}>
        <TextInput
          placeholder="Enter new folder or choose from above..."
          placeholderTextColor={PlaceholderColor}
          style={[styles.input, {width: '82%', marginRight: 10}]}
          value={folderName}
          onChangeText={(text) => setFolderName(text)}
        />
        <TouchableOpacity style={styles.btn}>
          <Icon name="download" size={20} color={HeadingColor} />
        </TouchableOpacity>
      </View>
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
  dropmain: {
    height: 40,
    // width: '80%',
    marginTop: 10,
  },
  dropdownContainer: {
    backgroundColor: '#22222d',
    borderWidth: 1,
    borderColor: '#40404c',
  },
  label: {
    fontSize: 14,
    textAlign: 'left',
    color: '#fff',
    marginLeft: 15,
  },
  selectedtLabelStyle: {
    color: '#fff',
  },
  itemStyle: {
    justifyContent: 'flex-start',
  },
  dropDownStyle: {
    backgroundColor: '#333333',
    borderWidth: 1,
    borderColor: '#40404c',
  },
  arrowStyle: {
    marginRight: 10,
  },
});
