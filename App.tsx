import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import auth from '@react-native-firebase/auth';

import { withToast } from './src/services/toast';
import UnAuthRoute from './src/routes/unAuthRoute';
import AuthRoute from './src/routes/authRoute';
import SplashScreen from './src/screens/splash';
import store from './src/redux/store';
import { interceptor } from './src/services/interceptor';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [initializing, setInitializing] = React.useState(true);

  React.useEffect(() => {
    RNBootSplash.hide();
    interceptor(); // error handling
  }, []);

  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setIsAuthenticated(!!user); 
      if (initializing) {
        setTimeout(() => {
          setInitializing(false);
        }, 2000); // Add a timeout of 2 second
      }
    });
    return unsubscribe; // Cleanup on component unmount
  }, [initializing]);

  if (initializing) {
    return <SplashScreen />; //  splash screen while Firebase initializes
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isAuthenticated ? <AuthRoute /> : <UnAuthRoute />}
      </NavigationContainer>
    </Provider>
  );
};

export default withToast(App);
