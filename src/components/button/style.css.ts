import {StyleSheet} from 'react-native';
import {COLOR} from '../../util/global-style.css';

export default StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
    fontFamily: 'OpenSans',
  },
  button: {
    backgroundColor: COLOR.BASE,
    padding: 8,
    height: 48,
    borderRadius: 30,
  },
});
