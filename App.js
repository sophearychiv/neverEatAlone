import React from 'react';
import { AsyncStorage, View, Text } from 'react-native';
import Login from './components/Login';
import Home from './components/Home';
import SearchRestaurants from './components/SearchRestaurants';
import SearchPeople from './components/SearchPeople';
import Profile from './components/Profile';

import {createStackNavigator, createAppContainer} from 'react-navigation';


const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  Login: {
    screen: Login,
    navigationOptions: {
      headerLeft: null
    }
  },
  SearchRestaurants: {
    screen: SearchRestaurants,
    navigationOptions: {
      title: "Search Restaurants"
    }
  },
  SearchPeople: {screen: SearchPeople},
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: "Profile"
    }
  }
});

let Navigation = createAppContainer(MainNavigator);

export default Navigation;

