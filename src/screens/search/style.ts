import {StyleSheet} from 'react-native';
import {Colors, FontFamily} from '../../common/common';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      padding: 20,
    },
    searchBarContainer: {
      flexDirection: 'row',
      height: 40,
      alignItems: 'center',
      marginBottom: 10,
    },
    searchBox: {
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 10,
      flex: 1,
      height: 40,
      borderRadius: 20,
      fontFamily: FontFamily.BOLD,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#fff',
    },
    searchIcon: {
      marginRight: 5,
    },

  });
};

export default useStyles;
