import React, {Component} from "react";
import HomeScreen from '../../screens/home';
import CarScreen from '../../screens/car';
import {createStackNavigator} from '@react-navigation/stack';

// Homeentication Stack Navigator
const HomeStackNav = createStackNavigator();
export default class HomeNavigatorStack extends Component {
  render() {
    return (
      <HomeStackNav.Navigator initialRouteName="HOME">
        <HomeStackNav.Screen name="HOME" component={HomeScreen} options={{headerShown: false}} />
        <HomeStackNav.Screen name="CAR" component={CarScreen} />
      </HomeStackNav.Navigator>
    );
  }
}