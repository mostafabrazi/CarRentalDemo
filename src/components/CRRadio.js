import React, { Component } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import Utils from '../utils';
import CRText from './CRText';

export default class CRRadio extends Component {
    state = {
        selected: null,
    };

    render() {
        return (
            <FlatList
                style={{height: 2 * Utils.SPACING, flexGrow: 0, marginBottom: Utils.SPACING, ...this.props.style}}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.props.options}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={[Utils.STYLES.tag, {backgroundColor: this.state.selected === item ? 'rgba(0,0,0,0.2)' : Utils.APP_LIGHTER_DARK}]} onPress={() => this.setState({selected: item}, () => {
                            this.props.selected(this.state.selected)
                        })}>
                            <CRText dark thin small style={{fontWeight: this.state.selected === item ? 'bold' : 'normal'}}>{item}</CRText>
                        </TouchableOpacity>
                    );
                }}
            />
        )
    }
}
