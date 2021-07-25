import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { STYLES } from './src/utils';
import Root from './src/screens/';
import { enableScreens } from 'react-native-screens';
enableScreens();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaView style={STYLES.root_container}>
            <StatusBar style="auto" />
            {/* Root Component that groud all other components */}
            <Root />
          </SafeAreaView>

        </NavigationContainer>
      </Provider>
    );
  }
}
