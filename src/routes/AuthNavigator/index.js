import React, {Component} from "react";
import LoginScreen from "../../screens/auth/login";
import {createStackNavigator} from '@react-navigation/stack';

// Authentication Stack Navigator
const AuthStackNav = createStackNavigator();
export default class AuthNavigatorStack extends Component {
  render() {
    return (
      <AuthStackNav.Navigator initialRouteName="LOGIN">
        <AuthStackNav.Screen name="LOGIN" component={LoginScreen} options={{headerShown: false}} />
      </AuthStackNav.Navigator>
    );
  }
}