import {StyleSheet} from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    skeleton: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default useStyles;
