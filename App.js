import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Root from './src/screens/';
import { enableScreens } from 'react-native-screens';
enableScreens();
import * as Font from 'expo-font';
import CRSpinner from './src/components/CRSpinner';
import Utils from './src/utils';
import * as firebase from 'firebase';
import { LogBox } from 'react-native';

export default class App extends Component {

  state = {
    assetsLoaded: false
  };

  async componentDidMount () {
    // Pre loading configuration
    // Load font
    await Font.loadAsync({
      'roboto-regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
      'roboto-black': require('./src/assets/fonts/Roboto-Black.ttf'),
      'roboto-bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
      'roboto-italic': require('./src/assets/fonts/Roboto-Italic.ttf'),
      'roboto-thin': require('./src/assets/fonts/Roboto-Thin.ttf'),
      'roboto-light': require('./src/assets/fonts/Roboto-Light.ttf')
    });
    this.setState({ assetsLoaded: true });

    // FireBase setup
    var firebaseConfig = {
      apiKey: "AIzaSyCiB5cFn5UOih58RE7-rlo6RvzLZG4Gfk8",
      authDomain: "carrentaldemo-faa91.firebaseapp.com",
      projectId: "carrentaldemo-faa91",
      storageBucket: "carrentaldemo-faa91.appspot.com",
      messagingSenderId: "87809400501",
      appId: "1:87809400501:web:9475e2bb65e84ef91da8fc",
      measurementId: "G-MKTTZ9CMVJ"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    LogBox.ignoreLogs(['Setting a timer']);
  }

  render() {
    const {assetsLoaded} = this.state;
    if( assetsLoaded ) {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <SafeAreaView style={Utils.STYLES.root_container}>
              <StatusBar style="auto" />
              {/* Root Component that groud all other components */}
              <Root />
            </SafeAreaView>
  
          </NavigationContainer>
        </Provider>
      );
    } else {
      return <CRSpinner />;
    }
    
  }
}
