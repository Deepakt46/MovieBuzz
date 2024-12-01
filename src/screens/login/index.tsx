/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator} from 'react-native';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import useStyles from './style';
import { notifiError, notifiSuccess } from '../../services/toast';
import { loginWithEmail } from '../../services/authentication';


const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = React.useState<boolean>(false);
  const onSubmit = async (data: FieldValues) => {
    const { username, password } = data as { username: string; password: string };
    try {
      setLoading(true);
      const user = await loginWithEmail(username, password); // Login User with email and password in Firebase
      setLoading(false);
      notifiSuccess('Login Success!', `Welcome ${user.email}`);
    } catch (error: Error | any) {
      notifiError('Invalid email or password'); // Show error message, if invalid credentials entered
      setLoading(false);
    }
  };
  const navigation = useNavigation<any>();
  const styles = useStyles();

  return (
    <ImageBackground source={require('../../../assets/images/imgBg.png')} style={styles.container}>
     <View style={styles.overLay} />
     <View>
        <View style={{marginBottom: 20}}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Please sign in to your account</Text>
        </View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.username && styles.inputError]}
            placeholder="robertfox@mail.com"
            placeholderTextColor="#aaa"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
        rules={{ required: 'Email is required' }}
      />
      {errors.username && <Text style={styles.errorText}>{errors.username.message as string}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="password"
        rules={{ required: 'Password is required' }}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message as string}</Text>}

      </View>
     <View>
      <TouchableOpacity style={styles.signInButton} onPress={handleSubmit(onSubmit)} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" animating={true} /> : <Text style={styles.signInButtonText}>Sign In</Text>}
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Don’t have an Account?{' '}
        <Text style={styles.signupText} onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </Text>
      </View>
    </ImageBackground>
  );
};

export default Login;

