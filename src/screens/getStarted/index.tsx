import {Text, ImageBackground, View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import useStyles from './style';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GetStarted = () => {
    const styles = useStyles();
    const navigation = useNavigation<any>();
    const handleGetStarted = async () => {
        await AsyncStorage.setItem('hasLaunched', 'true');
        navigation.navigate('Login');
      };
  return (
    <ImageBackground source={require('../../../assets/images/imgBg.png')}
     style={styles.background}
    >
    <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 1)']}
        start={{ x: 0.5, y: 0.4 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject} // Ensures it covers the entire screen
      />
     <View style={styles.contentContainer}>
        <Text style={styles.title}>MovieBuzz</Text>
        <Text style={styles.description}>
        Uncover the ideal movie for your next watch! Our app allows you to easily explore a wide range of films, access detailed information, and find the ratings that matter most.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default GetStarted;
