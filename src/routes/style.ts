import {StyleSheet} from 'react-native';
import {FontFamily, Colors} from '../common/common';

const useStyles = () => {
  return StyleSheet.create({
    header: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Colors.background,
    },
    headerText: {
      fontSize: 20,
      fontFamily: FontFamily.BOLD,
      color: '#FBCE04',
      marginLeft: 10,
    },
    searchIcon: {
      height: 24,
      width: 24,
      resizeMode: 'contain',
    },
    headerWrap:{
      flexDirection: 'row',
      alignItems: 'center',
    },
    drawerContainer: {
      flex: 1,
      backgroundColor: '#000',
    },
    profileSection: {
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#333',
      alignItems: 'center',
    },
    profilePlaceholder: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#4C6EF5',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    profileInitial: {
      color: '#fff',
      fontSize: 32,
      fontWeight: 'bold',
    },
    profileName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    profileEmail: {
      fontSize: 14,
      color: '#aaa',
      marginTop: 5,
    },
    navItems: {
      flex: 1,
      paddingTop: 20,
    },
    navItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#333',
    },
    navText: {
      marginLeft: 10,
      fontSize: 16,
      color: '#fff',
    },
    logoutButton: {
      backgroundColor: '#e63946',
      margin: 20,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    logoutButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
};

export default useStyles;
