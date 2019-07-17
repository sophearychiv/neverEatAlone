import React from 'react';
import {ActivityIndicator, AsyncStorage, Button, StyleSheet, View} from 'react-native';
import {createStackNavigator, createSwitchNavigator, createAppContainer} from 'react-navigation';
import Login from './components/Login';
import Home from './components/Home';
import SearchRestaurants from './components/SearchRestaurants';
import SearchPeople from './components/SearchPeople';
import Profile from './components/Profile';

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

const AppStack = createStackNavigator({
  Home: {
    screen: Home
  },
  
  SearchRestaurants: {
    screen: SearchRestaurants,
    navigationOptions: {
      title: "Search Restaurants"
    }
  },
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

// export default App;


// import React from 'react';
// import { AsyncStorage, View, Text } from 'react-native';
// import Login from './components/Login';
// import Home from './components/Home';
// import SearchRestaurants from './components/SearchRestaurants';
// import SearchPeople from './components/SearchPeople';
// import Profile from './components/Profile';

// import {createStackNavigator, createAppContainer} from 'react-navigation';


// const MainNavigator = createStackNavigator({

//   Login: {
//     screen: Login,
//     navigationOptions: {
//       headerLeft: null
//     }
//   },


//     Home: {screen: Home},
    
//     SearchRestaurants: {
//       screen: SearchRestaurants,
//       navigationOptions: {
//         title: "Search Restaurants"
//       }
//     },
//     SearchPeople: {screen: SearchPeople},
//     Profile: {
//       screen: Profile,
//       navigationOptions: {
//         title: "Profile"
//       }
//     }
// });

// let Navigation = createAppContainer(MainNavigator);

// export default Navigation;

