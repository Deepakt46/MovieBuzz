import React, { useEffect, useState } from 'react';
import { View, Animated } from 'react-native';
import useStyle from './style';

const SplashScreen = () => {
  const styles = useStyle();

  const [scaleAnim] = useState(new Animated.Value(1)); // Scale animation for "MB"
  const [fadeOutAnim] = useState(new Animated.Value(1)); // Fade-out animation for "MB"
  const [fadeInAnim] = useState(new Animated.Value(0)); // Fade-in animation for "MovieBuzz"
  const [slideAnim] = useState(new Animated.Value(30)); // Slide animation for the description

  useEffect(() => {
    // Start the animations in sequence
    Animated.sequence([
      // Expand "MB"
      Animated.timing(scaleAnim, {
        toValue: 3, // Scale up "MB"
        duration: 800,
        useNativeDriver: true,
      }),
      // Fade-out "MB" and fade-in "MovieBuzz"
      Animated.parallel([
        Animated.timing(fadeOutAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(fadeInAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Slide up and fade-in the description
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, fadeOutAnim, fadeInAnim, slideAnim]);

  return (
    <View style={styles.container}>
      {/* "MB" text */}
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: fadeOutAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        MB
      </Animated.Text>

      {/* "MovieBuzz" text */}
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: fadeInAnim,
            transform: [{ scale: fadeInAnim.interpolate({ inputRange: [0, 1], outputRange: [2, 1] }) }],
            position: 'absolute',
          },
        ]}
      >
        MovieBuzz
      </Animated.Text>

      {/* Description */}
      <Animated.Text
        style={[
          styles.subtext,
          {
            opacity: fadeInAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        Where you can find the movies
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;