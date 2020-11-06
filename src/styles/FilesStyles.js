import {StyleSheet, Dimensions} from 'react-native';
import {HeadingColor, IconColor, SecondaryColor} from '../constants/Theme';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  folderContainer: {
    width: '96%',
    alignSelf: 'center',
    backgroundColor: SecondaryColor,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    padding: 10,
    paddingLeft: 5,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  filesData: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  folderName: {
    fontSize: 16,
    color: HeadingColor,
    marginTop: 5,
    fontWeight: 'bold',
  },
  data: {
    marginLeft: 10,
  },
  description: {
    fontSize: 15,
    color: 'gray',
  },
  btn: {
    marginTop: 10,
    width: 80,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SecondaryColor,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  btnLeft: {
    marginTop: 10,
    width: 80,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SecondaryColor,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  dateTime: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  dateTimeText: {
    fontSize: 12,
    color: IconColor,
  },
});
