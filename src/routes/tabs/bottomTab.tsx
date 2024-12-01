/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';

import Home from '../../screens/home';
import Trending from '../../screens/trending';
import Upcoming from '../../screens/upcoming';
import useStyles from './style';
import Icon from '../../common/Icon';

const Tab = createBottomTabNavigator();

interface TabScreen {
  name: string;
  component: React.ComponentType<any>;
  iconSource: string;
}


const tabBarOptions = {
    headerShown: false,
    activeTintColor: '#FBCE04',
    inactiveTintColor: '#fff',
    tabBarStyle: {
      backgroundColor: 'black',
      borderTopWidth: 0, // Removes the border
      elevation: 0, // Removes shadow on Android
    },
  };

const tabScreens: TabScreen[] = [
  {
    name: 'Home',
    component: Home,
    iconSource: 'home',
  },
  {
    name: 'Upcoming',
    component: Upcoming,
    iconSource: 'upload-cloud',
  },
  {
    name: 'Trending',
    component: Trending,
    iconSource: 'trending-up',
  },
];

const CustomTabBarIcon = (source: string, focused: boolean) => {
  const styles = useStyles();
  return (
    <View style={styles.tabStyle}>
      <Icon name={source} size={22} color={focused
              ? tabBarOptions.activeTintColor
              : tabBarOptions.inactiveTintColor}/>
    </View>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={tabBarOptions} >
      {tabScreens.map(({name, component, iconSource}) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({ focused }: { focused: boolean; size: number }) =>
              CustomTabBarIcon(iconSource, focused),
             tabBarLabel: ({ focused }: { focused: boolean }) => (
              <Text style={{ color: focused ? tabBarOptions.activeTintColor : tabBarOptions.inactiveTintColor, fontFamily: 'Lato-Regular', fontSize:13 }}>
                {name}
               </Text>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default MyTabs;
