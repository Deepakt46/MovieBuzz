import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {useSharedValue, useAnimatedStyle, withRepeat, withTiming} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

const TrendingMovieCardSkeleton: React.FC = () => {
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

  const skeletonItems = [
    {width: width / 2 - 30, height: height / 4, marginTop: 10}, // Large card
    {width: width / 3 - 30, height: 20, marginTop: 10}, // Smaller text block
  ];

  return (
    <View style={styles.container}>
      {[...Array(2)].map((_, colIndex) => (
        <View key={colIndex} style={styles.column}>
          {skeletonItems.map((item, index) => (
            <View
              key={`${colIndex}-${index}`}
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
      ))}
    </View>
  );
};

export default TrendingMovieCardSkeleton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  column: {
    marginRight: 10,
    alignItems: 'center',
  },
  skeleton: {
    backgroundColor: 'grey',
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  gradientWrapper: {
    ...StyleSheet.absoluteFillObject,
    width: '200%', // Ensures gradient fully covers the component
  },
  gradient: {
    flex: 1,
  },
});