import React, { Component } from "react";
import { Text, FlatList, ToastAndroid, View, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import CRSpinner from "../../components/CRSpinner";
import Utils from "../../utils";
import { getCars } from '../../redux/actions';
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';

const {
    SPACING, INPUT_HEIGHT, APP_WHITE, ICON_SIZE, APP_ORANGE_COLOR, APP_RED_COLOR_LIGHT, APP_RED_COLOR, APP_BLUE_COLOR, APP_GREEN_COLOR
} = Utils;

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // Pagination counter
            page: 0,
        };
    }
    componentDidMount() {
        // Get cars list once the screen is mounted
        this.props.getCars(this.state.page);
    }

    componentDidUpdate(prevProps, _prevState) {
        if (this.props.error && prevProps.error !== this.props.error) {
            ToastAndroid.show(this.props.error, ToastAndroid.LONG);
        }
    }

    // Item of the flatlist  
    renderItem = ({ item, index }) => {
        // "auto": "1",
        // "brand": "Citroen",
        // "cyl_num": "4",
        // "fuel": "Diesel",
        // "id": "8",
        // "max_speed": "180Km/Hr",
        // "model": "Tepee",
        // "photo": "test115.png",
        // "pickup_position": "[48.2,31.2]",
        // "price": "80€/jr",
        // "seats": "7",
        return (
            <View style={{padding: SPACING}}>
                <LinearGradient colors={['white', 'white']} style={styles.card}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: SPACING }}>
                            <Text style={{ fontSize: ICON_SIZE, fontWeight: 'bold' }}>{item.brand}</Text>
                            <Text>{item.model}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ padding: SPACING }}><Text style={{ fontSize: ICON_SIZE, fontWeight: 'bold' }}>€ {item.price}</Text> /jr</Text>
                            <TouchableOpacity style={{ backgroundColor: APP_GREEN_COLOR, padding: 0, margin: 0, justifyContent: 'center', alignItems: 'center', borderTopStartRadius: 1.5 * SPACING, paddingHorizontal: 2 * SPACING }}>
                                <Text style={{ color: APP_WHITE, fontWeight: 'bold' }}>Louer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </View>


        );
    };

    render() {
        const { loading, error, cars } = this.props;
        if (loading) {
            return <CRSpinner />;
        }

        return (
            <View style={{ flex: 1, backgroundColor: APP_WHITE, padding: SPACING }}>
                {/* Top bar */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: SPACING }}>
                    {/* Go back */}
                    <TouchableOpacity>
                        {/* <MaterialCommunityIcons name="arrow-left" size={ICON_SIZE} color="black" /> */}
                    </TouchableOpacity>

                    {/* Go back */}
                    <TouchableOpacity>
                        <Fontisto name="zoom" size={ICON_SIZE} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Text Intro */}
                <Text style={{ fontSize: 25, fontWeight: '100', color: '#454545', marginBottom: 1.5 * SPACING, margin: SPACING }}>
                    Quel est votre <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'black' }}>choix </Text>?</Text>

                {/* Display List of cars for all roles: admin or client */}
                {cars ?
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={cars}
                        keyExtractor={(item) => item.id + ''}
                        renderItem={this.renderItem}
                    />
                    : null}
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        // Access user object as session
        session: state.authReducer.user,

        // Access cars list response data
        loading: state.carsReducer.loading,
        cars: state.carsReducer.cars,
        error: state.carsReducer.error,

    };
};
export default connect(mapStateToProps, { getCars })(HomeScreen);

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 240,
        marginBottom: 1.5 * SPACING,
        borderRadius: 1.5 * SPACING,
        overflow: 'hidden',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 5,
    },
});