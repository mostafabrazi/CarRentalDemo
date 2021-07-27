import React, { Component } from "react";
import { Text, FlatList, ToastAndroid, View, StyleSheet, TouchableOpacity, Image, StatusBar, Dimensions, ImageBackground } from "react-native";
import { connect } from "react-redux";
import CRSpinner from "../../components/CRSpinner";
import Utils from '../../utils';
import { getCars, logout } from '../../redux/actions';
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, AntDesign } from '@expo/vector-icons';
import CRText from "../../components/CRText";
import MaskedView from "@react-native-community/masked-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from 'firebase';

const {
    STYLES, SPACING, brands, INPUT_HEIGHT, APP_WHITE_COLOR, APP_DARK_TEXT_COLOR, APP_LIGHTER_DARK, APP_LIGHT_DARK, APP_ORANGE_COLOR, APP_RED_COLOR_LIGHT, APP_RED_COLOR, APP_BLUE_COLOR, APP_GREEN_COLOR
} = Utils;

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        // States
        this.state = {
            // Pagination counter
            page: 0,
            isAdmin: this.props.session && this.props.session.role === 'admin',
            loading: true,
            isFetching: false,
        };
    }

    // Lifecycle ethods
    async componentDidMount() {
        // Get cars list once the screen is mounted
        this.props.getCars(this.state.page);

        const isAdmin = JSON.parse(await AsyncStorage.getItem('SESSION'))['role'] === 'admin';
        this.setState({ isAdmin, loading: false });
    }
    componentWillUnmount() {
        this.setState(null);
    }
    componentDidUpdate(prevProps, _prevState) {
        if (this.props.error && prevProps.error !== this.props.error) {
            ToastAndroid.show(this.props.error, ToastAndroid.LONG);
        }

        if (this.props.cars && prevProps.cars !== this.props.cars) {
            this.setState({isFetching:false});
        }
    }

    // Admin actions
    editCar = (item) => {
        this.props.navigation.navigate('CRUD', { ...item, CRUD: 'U' });
    };

    // Client actions
    rentCar = (item) => {
        this.props.navigation.navigate('RENT', item);
    };

    // Item of the flatlist  
    renderItem = ({ item, index }) => {
        return (
            <View style={{ padding: SPACING }}>
                <LinearGradient colors={['white', 'white']} style={styles.card}>
                    {/* 
                         * 
                         * Best practices for images loading
                         * - use small images
                         * - use png instead of jpeg
                         * - convert all to WEBP since it improves loading speed by 28%
                         * - cache images and get them from cache if already loaded 
                         *  (use cache flag of Iamge compnent for iOS <Image source={{uri:...., cache: 'ios-only' }} /> )
                    */}
                    <ImageBackground source={{uri: item.photoUrl}} resizeMode="cover" style={styles.image}>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: SPACING }}>
                                <CRText bolder dark big>{item.brand}</CRText>
                                <CRText dark thin>{item.model}</CRText>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <CRText dark style={{ padding: SPACING }}><CRText dark bold>€ {item.price}</CRText> <CRText dark small thin>/jour</CRText></CRText>

                                <LinearGradient
                                    colors={[APP_BLUE_COLOR, APP_GREEN_COLOR]}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ padding: 0, margin: 0, justifyContent: 'center', alignItems: 'center', borderTopStartRadius: 1.5 * SPACING, paddingHorizontal: 1.5 * SPACING, overflow: 'hidden' }}
                                ><TouchableOpacity onPress={this.state.isAdmin ? () => this.editCar(item) : () => this.rentCar(item)}>

                                        <CRText medium light bold>{this.state.isAdmin ? 'Modifier' : 'Louer'}</CRText>

                                    </TouchableOpacity></LinearGradient>

                            </View>
                        </View>

                    </ImageBackground>
                </LinearGradient>
            </View>


        );
    };

    render() {
        const { loading, loading_user, error, cars } = this.props;
        const { loading: loading_state } = this.state;
        const { isAdmin, isFetching } = this.state;
        if ((!isFetching && loading) || loading_user || loading_state) {
            return <CRSpinner />;
        }

        return (
            <View style={{ flex: 1, backgroundColor: APP_WHITE_COLOR }}>
                <StatusBar backgroundColor={APP_LIGHTER_DARK} />
                <View style={{ width: '100%', backgroundColor: APP_LIGHTER_DARK, height: isAdmin ? '10%' : '40%' }}></View>
                <View style={{ flex: 1, backgroundColor: 'transparent', padding: 1.5 * SPACING, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>

                    {/* Top bar */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: isAdmin ? 0 : SPACING }}>
                        {/* Left side top bar */}
                        <TouchableOpacity disabled>
                            {/* <MaterialCommunityIcons name="arrow-left" size={ICON_SIZE} color="black" /> */}
                            {/* <Image source={require('../../assets/img/logo-horiz.png')} style={{ alignSelf: 'flex-start', width: 150, height: 46 }} /> */}
                        </TouchableOpacity>

                        {/* Right side top bar */}
                        {
                            !isAdmin ?
                                <View style={{ flexDirection: 'row' }}>
                                    {/* Search */}
                                    <TouchableOpacity style={{ ...STYLES.icon_button, marginHorizontal: SPACING / 1.5 }}>
                                        <AntDesign name="search1" size={24} color={APP_BLUE_COLOR} />
                                    </TouchableOpacity>
                                    {/* Logout */}
                                    <TouchableOpacity style={STYLES.icon_button} onPress={this.props.logout}>
                                        <AntDesign name="logout" size={24} color={APP_GREEN_COLOR} />
                                    </TouchableOpacity>
                                </View>
                                : null}
                    </View>

                    {/* Text Intro */}
                    {
                        !isAdmin ?
                            <MaskedView
                                style={{ height: INPUT_HEIGHT, marginBottom: SPACING / 2, margin: SPACING }}
                                maskElement={<CRText bold big style={{ fontWeight: "bold", fontSize: 25 }}>Quel est votre choix?</CRText>}
                            >
                                <LinearGradient
                                    colors={[APP_ORANGE_COLOR, APP_RED_COLOR, APP_RED_COLOR, APP_BLUE_COLOR, APP_BLUE_COLOR, APP_BLUE_COLOR]}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ flex: 1 }}
                                />
                            </MaskedView>
                            : null}

                    {/* Brands filter */}
                    <View style={{ flexDirection: 'row', marginHorizontal: SPACING, marginBottom: SPACING, alignItems: 'center' }}>
                        {/* Brands Categories filter */}
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={brands}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity style={STYLES.tag}>
                                        <CRText dark thin small>{item}</CRText>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                        {/* All Filter button */}
                        <TouchableOpacity
                            style={{ ...STYLES.icon_button, width: 3 * SPACING, height: 3 * SPACING, borderRadius: SPACING * 1.5, backgroundColor: APP_LIGHTER_DARK, padding: SPACING / 2, marginLeft: SPACING }}
                            onPress={() => this.props.navigation.navigate('FILTER')}>
                            <AntDesign name="filter" size={24} color={APP_DARK_TEXT_COLOR} />
                        </TouchableOpacity>
                    </View>

                    {/* Display List of cars for all roles: admin or client */}
                    {cars ?
                        <FlatList
                            style={{ marginBottom: isAdmin ? INPUT_HEIGHT : 0 }}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={cars ? cars : tmpCars}
                            keyExtractor={(item) => item.id + ''}
                            renderItem={this.renderItem}
                            onRefresh={() => {
                                this.setState({isFetching: true}, 
                                    () => this.props.getCars(0));
                            }}
                            refreshing={isFetching}
                        />
                        : null}

                    {/* ToolBar: For admin only */}

                    {isAdmin ? <View style={styles.toolbar}>
                        {/* logout */}
                        <LinearGradient
                            colors={[APP_ORANGE_COLOR, APP_RED_COLOR]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.toolbar_item}
                        ><TouchableOpacity >
                                <AntDesign name="search1" size={32} color={APP_WHITE_COLOR} />
                            </TouchableOpacity></LinearGradient>
                        {/* add car */}
                        <LinearGradient
                            colors={[APP_RED_COLOR, APP_BLUE_COLOR]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.toolbar_item}
                        ><TouchableOpacity onPress={() => this.props.navigation.navigate('CRUD', { CRUD: 'C' })}>
                                <AntDesign name="plus" size={32} color={APP_WHITE_COLOR} />
                            </TouchableOpacity></LinearGradient>
                        {/* search */}
                        <LinearGradient
                            colors={[APP_BLUE_COLOR, APP_GREEN_COLOR]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.toolbar_item}
                        ><TouchableOpacity onPress={this.props.logout}>
                                <AntDesign name="logout" size={32} color={APP_WHITE_COLOR} />
                            </TouchableOpacity></LinearGradient>
                    </View> : null}
                </View>

            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        // Access user object as session
        session: state.authReducer.user,
        loading_user: state.authReducer.loading,

        // Access cars list response data
        loading: state.carsReducer.loading,
        cars: state.carsReducer.cars,
        error: state.carsReducer.error,

    };
};
export default connect(mapStateToProps, { getCars, logout })(HomeScreen);

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 240,
        marginBottom: SPACING,
        borderRadius: 1.5 * SPACING,
        overflow: 'hidden',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 8,
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: INPUT_HEIGHT,
        width: Dimensions.get('screen').width,
        height: 1.4 * INPUT_HEIGHT,
        paddingVertical: SPACING,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    toolbar_item: {
        width: INPUT_HEIGHT,
        height: INPUT_HEIGHT,
        borderRadius: INPUT_HEIGHT / 2,
        marginHorizontal: SPACING,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
});