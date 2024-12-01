import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {useSharedValue, useAnimatedStyle, withRepeat, withTiming} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

const MovieCardSkeleton: React.FC = () => {
  const translateX = useSharedValue(-width);

  // Animate the shimmer effect
  React.useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, {duration: 1500}),
      -1, // Repeat infinitely
      false
    );
  }, [translateX]);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <View style={styles.container}>
      {Array.from({length: 2}).map((_, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.skeleton} />
          <View style={styles.skeletonText} />
          <View style={[styles.skeleton, {height: 10, width: width / 3 - 30}]} />
          <Animated.View style={[styles.gradientWrapper, shimmerStyle]}>
            <LinearGradient
              colors={['transparent', 'rgba(255, 255, 255, 0.3)', 'transparent']}
              style={styles.gradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
            />
          </Animated.View>
        </View>
      ))}
    </View>
  );
};

export default MovieCardSkeleton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  card: {
    alignItems: 'center',
  },
  skeleton: {
    width: width / 2 - 30,
    height: height / 3,
    backgroundColor: 'gray',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  skeletonText: {
    width: width / 2 - 30,
    height: 20,
    backgroundColor: 'grey',
    borderRadius: 5,
    marginBottom: 10,
  },
  gradientWrapper: {
    position: 'absolute',
    height: '100%',
    width: '200%', // Ensures the gradient covers the entire component when animated
  },
  gradient: {
    flex: 1,
  },
});