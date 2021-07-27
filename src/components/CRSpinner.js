import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Bounce, Chase, Flow, Fold, Grid, Pulse, Swing, Wander, Wave } from 'react-native-animated-spinkit';
import Utils from '../utils';

const {
    SPACING, INPUT_HEIGHT, APP_WHITE_COLOR, STATUS_BAR_PADDING_TOP_INGHERIT, APP_ORANGE_COLOR, APP_RED_COLOR_LIGHT, APP_RED_COLOR, APP_BLUE_COLOR, APP_GREEN_COLOR
} = Utils;

export default class CRSpinner extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: APP_WHITE_COLOR, alignItems: 'center', justifyContent: 'center', paddingTop: STATUS_BAR_PADDING_TOP_INGHERIT}}>
                <Wave size={50} color={APP_RED_COLOR} />
            </View>
        )
    }
}
