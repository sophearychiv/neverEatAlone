import React from 'react';
import { AsyncStorage, View } from 'react-native';
import Login from './components/Login';
import Home from './components/Home';
import SearchRestaurants from './components/SearchRestaurants';
import SearchPeople from './components/SearchPeople';
import Availability from './components/Availability';

import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  Login: {screen: Login},
  Login: {screen: Login},
  SearchRestaurants: {screen: SearchRestaurants},
  SearchPeople: {screen: SearchPeople},
  Availability: {screen: Availability}
});

let Navigation = createAppContainer(MainNavigator);

export default Navigation;
// export default class App extends React.Component{


//   render(){
//     this.getToken();
//     if(this.state.status === 'Navigation') {
//       return(<Navigation></Navigation>);
//     }
//     return(
//         <View></View>
//     );
//   }
// };