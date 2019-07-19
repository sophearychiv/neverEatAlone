import React from 'react';
import {ActivityIndicator, AsyncStorage, Button, StyleSheet, View} from 'react-native';
import {createStackNavigator, createSwitchNavigator, createAppContainer} from 'react-navigation';
import Login from './components/Login';
import Home from './components/Home';
import SearchRestaurants from './components/SearchRestaurants';
import SearchPeople from './components/SearchPeople';
import Profile from './components/Profile';
import RestList from './components/RestList';

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("access_token");
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  }

  render(){
    return(
      <View>
        <ActivityIndicator/>
      </View>
    );
  }
}

const RestStack = createStackNavigator({
  SearchRestaurants: {
    screen: SearchRestaurants,
    navigationOptions: {
      title: "Search Restaurants",
      header: {
        left: null
      }
    }
  },
  RestList: {
    screen: RestList,
    navigationOptions: {
      title: "Restaurants Found"
    }
  }
})

const AppStack = createStackNavigator({
  Home: {
    screen: Home
  },
  
  // SearchRestaurants: {
  //   screen: SearchRestaurants,
  //   navigationOptions: {
  //     title: "Search Restaurants"
  //   }
  // },

  SearchRestaurants: RestStack,

  SearchPeople: {
    screen: SearchPeople
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: "Profile"
    }
  }
});

const AuthStack = createStackNavigator({Login: Login})

const App = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: "AuthLoading",
  }
);

let Navigation = createAppContainer(App);

export default Navigation;

