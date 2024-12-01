  import React, { useState } from 'react';
  import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
  import { useForm, Controller, FieldValues } from 'react-hook-form';
  import { useNavigation } from '@react-navigation/native';
  import * as Yup from 'yup';
  import { yupResolver } from '@hookform/resolvers/yup';
  import useStyles from './style';
  import { registerWithEmail } from '../../services/authentication';
  import { notifiError, notifiSuccess } from '../../services/toast';

  // Yup validation schema - Name, Email, Password, Confirm Password
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email Address is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const SignUp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { control, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(validationSchema),
    });

    const onSubmit = async(data: FieldValues) => {
      try {
        setLoading(true);
        const user = await registerWithEmail(data.email, data.password); // Register User with email and password in Firebase
        await user.updateProfile({displayName: data.fullName});
        await user.sendEmailVerification();
        notifiSuccess('Sign Up Success!', `Welcome ${data.fullName}`); // Show success message using toast, which is setup as a HOC
        setLoading(false);
      } catch (error) {
        setLoading(false);
        notifiError('Sign Up Failed', 'Please try again');
      }
    };

    const navigation = useNavigation<any>();
    const styles = useStyles();

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Create new account</Text>
          <Text style={styles.subtitle}>Please fill in the form to continue</Text>

          {/*Name Input Section, Used React Hook Form */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.fullName && styles.inputError]}
                placeholder="Full Name"
                placeholderTextColor="#aaa"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="fullName"
          />
          {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}

          {/* Email Address Input */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Email Address"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

          {/* Password Input */}
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
          />
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

          {/* Confirm Password Input */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.confirmPassword && styles.inputError]}
                placeholder="Confirm Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

        </View>

        <View>
          {/* Sign Up Button, which is disabled if loading */}
          <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit(onSubmit)} disabled={loading}>
           {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.signUpButtonText}>Sign Up</Text>}
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.footerText}>
            Have an Account?{' '}
            <Text style={styles.signInText} onPress={() => navigation.navigate('Login')}>
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    );
  };

  export default SignUp;
