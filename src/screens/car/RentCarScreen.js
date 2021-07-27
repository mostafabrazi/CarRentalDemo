import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class RentCarScreen extends Component {
    render() {
        const {brand, model, price, photo, seats} = this.props.route.params;
        return (
            <View>
                <Text> {brand} </Text>
            </View>
        )
    }
}
