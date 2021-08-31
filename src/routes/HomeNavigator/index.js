import React, {Component} from "react";
import HomeScreen from '../../screens/home';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import FilterScreen from "../../screens/home/FilterScreen";
import CrudCarScreen from "../../screens/car/CrudCarScreen";
import RentCarScreen from "../../screens/car/RentCarScreen";
import RentedCarsScreen from "../../screens/car/RentedCarsScreen";
import Profile from "../../screens/auth/profile";

// Homeentication Stack Navigator
const HomeStackNav = createStackNavigator();
export default class HomeNavigatorStack extends Component {
  render() {
    return (
      <HomeStackNav.Navigator initialRouteName="HOME" screenOptions={{...TransitionPresets.SlideFromRightIOS}} >
        <HomeStackNav.Screen name="HOME" component={HomeScreen} options={{headerShown: false}} />
        <HomeStackNav.Screen name="FILTER" component={FilterScreen} />
        <HomeStackNav.Screen name="CRUD" component={CrudCarScreen} />
        <HomeStackNav.Screen name="RENT" component={RentCarScreen} />
        <HomeStackNav.Screen name="RENTED" component={RentedCarsScreen} />
        <HomeStackNav.Screen name="PROFILE" component={Profile} />
      </HomeStackNav.Navigator>
    );
  }
}