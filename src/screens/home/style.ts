import {StyleSheet, useWindowDimensions} from 'react-native';
import {Colors, FontFamily} from '../../common/common';

const useStyles = () => {
  const {height, width} = useWindowDimensions();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      padding: 20,
    },
    upcomingMovies: {
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      fontFamily: FontFamily.BOLD,
      fontSize: 16,
      color: Colors.text,
      marginVertical: 5,
    },
    movieCard: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    poster: {
      borderRadius: 20,
      height: height * 0.4,
      width: width * 0.6,
    },
    rating: {
      fontFamily: FontFamily.LIGHT,
      fontSize: 12,
      color: Colors.text,
    },
    upcomingMovieTxt: {
      fontFamily: FontFamily.BOLD,
      textAlign: 'left',
      marginBottom: 20,
      fontSize: 18,
      color: Colors.text,
    },
    movieCardHeaderText: {
      fontFamily: FontFamily.BOLD,
      textAlign: 'left',
      marginBottom: 10,
      fontSize: 18,
      color: Colors.text,
    },
    emptyComponent: {
      flex: 1,
    },
    noDataImg: {
      height: height / 3,
      width: width - 40,
    },
  });
};

export default useStyles;
