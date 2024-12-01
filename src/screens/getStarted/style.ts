import { StyleSheet } from 'react-native';
import { FontFamily } from '../../common/common';

const useStyles = () => {
    return StyleSheet.create({
        background: {
            flex: 1,
            justifyContent: 'space-between',
            padding: 20,
            paddingVertical: 40,
            backgroundColor: '#000',
          },
          contentContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: 40,
          },
          title: {
            fontSize: 36,
            fontFamily: FontFamily.BLACK,
            color: '#fff',
            marginBottom: 20,
          },
          description: {
            fontSize: 15,
            color: '#fff',
            textAlign: 'center',
            fontFamily: FontFamily.ITALIC_THIN,
            paddingHorizontal: 10,
          },
          button: {
            backgroundColor: '#4F46E5',
            borderRadius: 25,
            paddingVertical: 15,
            alignItems: 'center',
            justifyContent: 'center',
          },
          buttonText: {
            color: '#fff',
            fontSize: 16,
            fontFamily: FontFamily.BOLD,
          },
    });
};

export default useStyles;
