    import { StyleSheet } from 'react-native';
    import { FontFamily } from '../../common/common';

    const useStyles = () => {
        return StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#000', // Dark background
                paddingHorizontal: 20,
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
            signUpButton: {
                backgroundColor: '#4C6EF5',
                height: 50,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
            },
            signUpButtonText: {
                color: '#fff',
                fontSize: 18,
                fontFamily: FontFamily.BLACK,
            },
            footerText: {
                textAlign: 'center',
                color: '#aaa',
                fontSize: 14,
                fontFamily: FontFamily.ITALIC,
            },
            signInText: {
                color: '#4C6EF5',
                fontWeight: 'bold',
                fontFamily: FontFamily.NORMAL,
            },
        });
    };

    export default useStyles;
