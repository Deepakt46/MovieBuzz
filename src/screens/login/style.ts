    import { StyleSheet } from 'react-native';
    import { FontFamily } from '../../common/common';

    const useStyles = () => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#000000', // Dark background
                padding: 20,
                justifyContent: 'space-around',
            },
            title: {
                fontSize: 28,
                fontFamily: FontFamily.BOLD,
                color: '#fff',
                textAlign: 'center',
                marginBottom: 8,
            },
            subtitle: {
                fontSize: 16,
                fontFamily: FontFamily.NORMAL,
                color: '#aaa',
                textAlign: 'center',
                marginBottom: 30,
            },
            input: {
                height: 60,
                borderColor: '#333',
                borderWidth: 1,
                borderRadius: 20,
                paddingHorizontal: 15,
                fontSize: 16,
                fontFamily: FontFamily.LIGHT,
                color: '#fff',
                backgroundColor: '#111', // Darker input background
                marginBottom: 18,
            },
            inputError: {
                borderColor: '#e63946',
            },
            errorText: {
                color: '#e63946',
                fontSize: 12,
                marginBottom: 10,
            },
            forgotPassword: {
                alignSelf: 'flex-end',
                marginBottom: 20,
            },
            forgotPasswordText: {
                color: '#4C6EF5',
                fontSize: 14,
                fontFamily: FontFamily.NORMAL,
            },
            signInButton: {
                backgroundColor: '#4C6EF5',
                height: 60,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
            },
            signInButtonText: {
                color: '#fff',
                fontSize: 16,
                fontFamily: FontFamily.BLACK,
            },

            footerText: {
                textAlign: 'center',
                color: '#aaa',
                fontSize: 14,
                fontFamily: FontFamily.ITALIC,
            },
            signupText: {
                color: '#4C6EF5',
                fontFamily: FontFamily.NORMAL,
            },
            overLay:{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'black',
                opacity: 0.85,
            },
        });
    };

    export default useStyles;
