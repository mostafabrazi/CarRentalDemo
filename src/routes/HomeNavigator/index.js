import React, {Component} from "react";
import HomeScreen from '../../screens/home';
import CarScreen from '../../screens/car';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import FilterScreen from "../../screens/home/FilterScreen";
import CrudCarScreen from "../../screens/car/CrudCarScreen";
import RentCarScreen from "../../screens/car/RentCarScreen";

// Homeentication Stack Navigator
const HomeStackNav = createStackNavigator();
export default class HomeNavigatorStack extends Component {
  render() {
    return (
      <HomeStackNav.Navigator initialRouteName="HOME" screenOptions={{...TransitionPresets.SlideFromRightIOS}} >
        <HomeStackNav.Screen name="HOME" component={HomeScreen} options={{headerShown: false}} />
        <HomeStackNav.Screen name="CAR" component={CarScreen} />
        <HomeStackNav.Screen name="FILTER" component={FilterScreen} />
        <HomeStackNav.Screen name="CRUD" component={CrudCarScreen} />
        <HomeStackNav.Screen name="RENT" component={RentCarScreen} />
      </HomeStackNav.Navigator>
    );
  }
}