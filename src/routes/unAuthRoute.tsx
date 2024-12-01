import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/login';
import GetStarted from '../screens/getStarted';
import SignUp from '../screens/signup';

const Stack = createNativeStackNavigator();

const UnAuthRoute = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          // First time launch
          setIsFirstLaunch(true);
        } else {
          // Not the first time launch
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking launch status:', error);
      }
    };

    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return null;
  }

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={isFirstLaunch ? 'GetStarted' : 'Login'}>
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
  );
};

export default UnAuthRoute;
