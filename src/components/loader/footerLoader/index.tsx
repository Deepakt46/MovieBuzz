import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import useStyles from './styles';
interface FooterLoaderProps {
  loading: boolean;
}
const LoadingFooter: React.FC<FooterLoaderProps> = ({loading}) => {
  const styles = useStyles();
  return (
    <View style={styles.loaderView}>
      {loading && <ActivityIndicator size="small" />}
    </View>
  );
};
export default LoadingFooter;
