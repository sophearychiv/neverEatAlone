import Login from './components/Login';
import Home from './components/Home';
import SearchRestaurants from './components/SearchRestaurants';
import SearchPeople from './components/SearchPeople';
import Availability from './components/Availability';

import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
  // Login: {screen: Login},
  Home: {screen: Home},
  SearchRestaurants: {screen: SearchRestaurants},
  SearchPeople: {screen: SearchPeople},
  Availability: {screen: Availability}
});

const App = createAppContainer(MainNavigator);

export default App;

