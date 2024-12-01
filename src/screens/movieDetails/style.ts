import {StyleSheet, useWindowDimensions} from 'react-native';
import {FontFamily, Colors} from '../../common/common';

const useStyles = () => {
  const {height, width} = useWindowDimensions();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    posterWrap: {
      flex: 1,
      justifyContent: 'flex-end',
      resizeMode: 'center',
    },
    titleText: {
      fontFamily: FontFamily.BOLD,
      fontSize: 35,
      marginBottom: 8,
      textAlign: 'center',
      color: Colors.text,
    },
    dateText: {
      fontFamily: FontFamily.BOLD,
      fontSize: 16,
      color: '#717171',
      marginBottom: 5,
      textAlign: 'center',
    },
    description: {
      flex: 0.4,
      backgroundColor: Colors.background,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
    scrollViewWrap: {
      padding: 20,
      paddingBottom: 30,
    },
    duration: {
      fontSize: 16,
      fontFamily: FontFamily.BOLD,
      marginBottom: 20,
      textAlign: 'center',
      color: '#717171',
    },
    overView: {
      fontFamily: FontFamily.BOLD,
      fontSize: 18,
      marginBottom: 10,
      textAlign: 'center',
      color: Colors.text,
    },
    review: {
      fontFamily: FontFamily.NORMAL,
      fontSize: 14,
      textAlign: 'center',
      color: Colors.text,
    },
    backButton: {
      position: 'absolute',
      left: 20,
      top: 40,
      height: 40,
      width: 40,
    },

    noData: {
      height: height / 2,
      width: width - 40,
    },
    noDataWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rating: {
      fontSize: 16,
      fontFamily: FontFamily.NORMAL,
      textAlign: 'center',
      color: Colors.primary,
      marginBottom: 8,
    },
  });
};

export default useStyles;
