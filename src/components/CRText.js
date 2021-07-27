import React, { Component } from 'react';
import { Text } from 'react-native';
import Utils from '../utils';

const {
    APP_DARK_TEXT_COLOR, APP_LIGHT_TEXT_COLOR
} = Utils;

export default class CRText extends Component {
    render() {
        const {bold, bolder, thin, big, medium, small, dark, children, style, ...props} = this.props;
        return (
           <Text 
            style={{
                fontFamily: bolder ? 'roboto-black' : bold ? 'roboto-bold' : thin ? 'roboto-light' : 'roboto-regular',
                fontSize: big ? 19 : medium ? 17 : small ? 13 : 16, 
                color: dark ? APP_DARK_TEXT_COLOR : APP_LIGHT_TEXT_COLOR, 
                alignItems: "center", 
                justifyContent: "center", 
                ...style 
            }} 
            {...props}>
                {children}
            </Text> 
        )
    }
}
