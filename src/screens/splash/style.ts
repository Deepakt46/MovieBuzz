import {StyleSheet} from 'react-native';
import { Colors, FontFamily } from '../../common/common';

const useStyle = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FBCE04',
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      fontFamily: FontFamily.BLACK,
      marginBottom: 20,
      color: Colors.background,
    },
    subtext: {
      fontSize: 18,
      textAlign: 'center',
      fontFamily: FontFamily.ITALIC,
      color: Colors.background,
    },
  });
};

export default useStyle;
