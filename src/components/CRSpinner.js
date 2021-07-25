import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Bounce, Chase, Flow, Fold, Grid, Pulse, Swing, Wander, Wave } from 'react-native-animated-spinkit';
import Utils from '../utils';

const {
    SPACING, INPUT_HEIGHT, APP_WHITE, APP_ORANGE_COLOR, APP_RED_COLOR_LIGHT, APP_RED_COLOR, APP_BLUE_COLOR, APP_GREEN_COLOR
} = Utils;

export default class CRSpinner extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: APP_WHITE, alignItems: 'center', justifyContent: 'center'}}>
                <Wave size={50} color={APP_RED_COLOR} />
            </View>
        )
    }
}
