import React from 'react';
import {View, Dimensions, ActivityIndicator, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {useSharedValue, useAnimatedStyle, withRepeat, withTiming} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

const Skeleton: React.FC = () => {
  const translateX = useSharedValue(-width);

  // Animate the shimmer effect
  React.useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, {duration: 1500}),
      -1, // Infinite repetitions
      false
    );
  }, [translateX]);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <View style={styles.skeletonContainer}>
      {[
        {width: width / 2 - 30, height: 20, marginTop: 10},
        {width: width / 3 - 30, height: 10, marginTop: 10},
        {width: width / 2 - 30, height: 20, marginTop: 10},
        {width: width - 40, height: height / 4, marginTop: 20},
      ].map((item, index) => (
        <View
          key={index}
          style={[
            styles.skeleton,
            {
              width: item.width,
              height: item.height,
              marginTop: item.marginTop,
            },
          ]}>
          <Animated.View style={[styles.gradientWrapper, shimmerStyle]}>
            <LinearGradient
              colors={['transparent', 'rgba(255,255,255,0.3)', 'transparent']}
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

const MovieDetailSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ActivityIndicator size={'large'} color="#000" />
      </View>
      <View style={styles.wrapper}>
        <Skeleton />
      </View>
    </View>
  );
};

export default MovieDetailSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeleton: {
    backgroundColor: 'gray',
    opacity: 0.5,
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  gradientWrapper: {
    ...StyleSheet.absoluteFillObject,
    width: '200%', // Ensures the gradient covers the full component when animated
  },
  gradient: {
    flex: 1,
  },
});