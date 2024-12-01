/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView} from 'react-native-safe-area-context';
import { TouchableOpacity, Text, View, Alert } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import Icon from '../common/Icon';
import MyTabs from './tabs/bottomTab';
import Search from '../screens/search';
import MovieDetails from '../screens/movieDetails';
import useStyles from './style';
import auth from '@react-native-firebase/auth';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Header = ({ navigation }: { navigation: any }) => {
  const styles = useStyles();
  const user = auth().currentUser;
  return (
    <SafeAreaView edges={['top']} style={styles.header}>
      <View style={styles.headerWrap}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Icon name="align-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Hello, {user?.displayName || 'Guest'}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('search')}>
        <Icon name="search" size={20} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const AuthStack = () => (
  <Stack.Navigator initialRouteName="bottomTab" screenOptions={{animation: 'fade'}}>
    <Stack.Screen
      name="bottomTab"
      component={MyTabs}
      options={({ navigation }) => ({
        header: () => <Header navigation={navigation} />,
      })}
    />
    <Stack.Screen
      name="search"
      component={Search}
      options={{ headerShown: false, animation: 'slide_from_bottom' }}
    />
    <Stack.Screen
      name="movieDetails"
      component={MovieDetails as any}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const CustomDrawerContent: React.FC<{ navigation: any; children?: React.ReactNode }> = (props) => {
  const user = auth().currentUser;
  const styles = useStyles();

  const handleLogout = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await auth().signOut();
            } catch (error) {
              console.error('Error logging out:', error);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.drawerContainer}>
      <View style={styles.profileSection}>
        <View style={styles.profilePlaceholder}>
          <Text style={styles.profileInitial}>
            {user?.displayName?.charAt(0)?.toUpperCase() || 'G'}
          </Text>
        </View>
        <Text style={styles.profileName}>
          {user?.displayName || 'Guest User'}
        </Text>
        <Text style={styles.profileEmail}>{user?.email || 'No Email Available'}</Text>
      </View>
      <View style={styles.navItems}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => props.navigation.navigate('Home')}
        >
          <Icon name="home" size={18} color="#fff" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}>
          <Icon name="share-2" size={18} color="#fff" />
          <Text style={styles.navText}>Share</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const AuthRoute = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: '#1c1c1c' }, // Dark drawer background
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={AuthStack} />
    </Drawer.Navigator>
  );
};

export default AuthRoute;
