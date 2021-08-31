import React, { Component } from 'react';
import Utils from '../utils';
import CRText from './CRText';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from "@react-native-community/masked-view";
import { View, Text } from 'react-native';


const { INPUT_HEIGHT, SPACING, APP_ORANGE_COLOR, APP_RED_COLOR, APP_BLUE_COLOR } = Utils;

export default class CRGradientText extends Component {
    render() {
        return (
                <MaskedView
                    style={{ height: INPUT_HEIGHT, marginBottom: 0, margin: SPACING, ...this.props.styleContainer }}
                    maskElement={<CRText bold big style={{ fontWeight: "bold", fontSize: 25, ...this.props.style, alignItems: 'center' }}>{this.props.children}</CRText>}
                >
                    {/* <Text style={{}}></Text> */}
                    <LinearGradient
                        colors={[APP_ORANGE_COLOR, APP_RED_COLOR, APP_RED_COLOR, APP_BLUE_COLOR, APP_BLUE_COLOR]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        style={{ flex: 1 }}
                    />
                </MaskedView>
        )
    }
}
