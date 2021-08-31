import React, { Component } from "react";
import { FlatList, ToastAndroid, View, StyleSheet, TouchableOpacity, StatusBar, Dimensions, ImageBackground } from "react-native";
import { connect } from "react-redux";
import CRSpinner from "../../components/CRSpinner";
import Utils from '../../utils';
import { getCars, logout, getRents, getCarsAPI } from '../../redux/actions';
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import CRText from "../../components/CRText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CRGradientText from "../../components/CRGradientText";

const {
    STYLES,
    SPACING,
    INPUT_HEIGHT,
    APP_WHITE_COLOR,
    APP_LIGHTER_DARK,
    APP_LIGHT_DARK,
    APP_ORANGE_COLOR,
    APP_RED_COLOR,
    APP_BLUE_COLOR,
    APP_GREEN_COLOR
} = Utils;

class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.onEndReachedCalledDuringMomentum = true;

        // States
        this.state = {
            // Pagination counter
            page: 0,
            isAdmin: this.props.session && this.props.session.role === 'admin',
            loading: true,
            isFetching: false,
            showMenu: false,
            cars: this.props.cars ? this.props.cars : null,
            fetchMore: false,
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
            this.setState({ cars: this.props.cars, isFetching: false });
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
    fetchMoreCars = () => {
        if(!this.onEndReachedCalledDuringMomentum){
            this.setState({ fetchMore: true, page: this.state.page + 5 },
                async () => {
                    const response = await getCarsAPI(this.state.page, this.props.session);
                    if (response && 'cars' in response) {
                        this.setState({ cars: [...this.state.cars, ...response.cars] });
                    }
                    this.setState({fetchMore: false});
                });
            this.onEndReachedCalledDuringMomentum = true;
        }
    };
    renderItem = ({ item, index }) => {
        return (
            <View style={{ padding: SPACING }}>
                <LinearGradient colors={['white', 'white']} style={styles.card}>
                    {/* 
                         * 
                         * Best practices for images loading in PRODUCTION 
                         * - use small images
                         * - use png instead of jpeg
                         * - convert all to WEBP since it improves loading speed by 28%
                         * - cache images and get them from cache if already loaded 
                         *  (use cache flag of Iamge compnent for iOS <Image source={{uri:...., cache: 'ios-only' }} /> )
                    */}
                    <ImageBackground source={{ uri: item.photoUrl }} resizeMode="cover" style={styles.image}>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: SPACING }}>
                                <CRText bolder dark big>{item.brand}</CRText>
                                <CRText dark thin>{item.model}</CRText>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <CRText dark style={{ padding: SPACING }}><CRText dark bold>€ {item.price}</CRText> <CRText dark small thin>/jour</CRText></CRText>

                                <LinearGradient
                                    colors={item.irentit > 0 && !this.state.isAdmin ? [APP_ORANGE_COLOR, APP_RED_COLOR] : [APP_BLUE_COLOR, APP_GREEN_COLOR]} // change back color in case it's already rent
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ padding: 0, margin: 0, alignItems: 'center', borderTopStartRadius: 1.5 * SPACING, overflow: 'hidden' }}
                                ><TouchableOpacity style={{ flex: 1, paddingHorizontal: 1.5 * SPACING, justifyContent: 'center', alignItems: 'center' }} onPress={this.state.isAdmin ? () => this.editCar(item) : () => this.rentCar(item)}>

                                        <CRText medium light bold>{this.state.isAdmin ? 'Modifier' : item.irentit > 0 ? 'En Attente' : 'Louer'}</CRText>

                                    </TouchableOpacity></LinearGradient>

                            </View>
                        </View>

                    </ImageBackground>
                </LinearGradient>
            </View>


        );
    };

    render() {
        const { loading, loading_user, error, brands } = this.props;
        const { loading: loading_state, showMenu, cars, fetchMore } = this.state;
        const { isAdmin, isFetching } = this.state;
        if ((!isFetching && loading) || loading_user || loading_state) {
            return <CRSpinner />;
        }

        return (
            <View style={{ flex: 1, backgroundColor: APP_WHITE_COLOR }}>
                <StatusBar backgroundColor={APP_LIGHTER_DARK} />
                <View style={{ width: '100%', backgroundColor: APP_LIGHTER_DARK, height: isAdmin ? '9%' : '40%' }}></View>
                <View style={{ flex: 1, backgroundColor: 'transparent', padding: 1.5 * SPACING, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>

                    {/* Top bar */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: isAdmin ? 0 : SPACING }}>
                        {/* Left side top bar */}
                        <TouchableOpacity disabled>
                            {/* TODO: clean the code here */}
                            {/* <MaterialCommunityIcons name="arrow-left" size={ICON_SIZE} color="black" /> */}
                            {/* <Image source={require('../../assets/img/logo-horiz.png')} style={{ alignSelf: 'flex-start', width: 150, height: 46 }} /> */}

                            {/* Open rents (les locations des clients) */}
                            <TouchableOpacity style={[STYLES.icon_button, { marginRight: SPACING }]} onPress={() => this.props.navigation.navigate('RENTED')}>
                                {/* Show red count only in case there is rents in 'waiting' status means new rents */}
                                {this.props.rents_count ? <CRText bold style={{ fontSize: 8, position: 'absolute', textAlignVertical: 'center', left: 0, top: 1, textAlign: 'center', zIndex: 999, backgroundColor: 'red', width: SPACING, height: SPACING, borderRadius: SPACING / 2 }}>
                                    {this.props.rents_count}
                                </CRText> : null}
                                <AntDesign name="bells" size={25} color={APP_ORANGE_COLOR} />
                            </TouchableOpacity>

                        </TouchableOpacity>

                        {/* Right side top bar */}
                        <View style={{ flexDirection: 'row' }}>

                            {showMenu ? <>
                                {/* profile */}
                                <TouchableOpacity style={[STYLES.icon_button, { marginRight: SPACING }]} onPress={() => this.props.navigation.navigate('PROFILE')}>
                                    <AntDesign name="user" size={25} color={APP_RED_COLOR} />
                                </TouchableOpacity>

                                {/* Filter */}
                                <TouchableOpacity style={[STYLES.icon_button, { marginRight: SPACING }]} onPress={() => this.props.navigation.navigate('FILTER')}>
                                    <AntDesign name="filter" size={25} color={APP_BLUE_COLOR} />
                                </TouchableOpacity>

                                {/* Logout */}
                                {
                                    !isAdmin ?
                                        <TouchableOpacity style={STYLES.icon_button} onPress={this.props.logout}>
                                            <AntDesign name="logout" size={24} color={APP_GREEN_COLOR} />
                                        </TouchableOpacity>
                                        : null}
                            </>
                                : null}
                            {/* profile */}
                            <TouchableOpacity
                                style={[STYLES.icon_button, { marginLeft: SPACING, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: SPACING }]}
                                onPress={() => this.setState({ showMenu: !showMenu })}>
                                <MaterialCommunityIcons name="dots-vertical" size={27} color={'rgba(0,0,0,0.6)'} />
                            </TouchableOpacity>
                        </View>

                    </View>

                    {/* Text Intro */}
                    {!isAdmin ? <CRGradientText>Quel est votre choix?</CRGradientText> : null}

                    {/* Brands filter */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: isAdmin ? 2*SPACING : INPUT_HEIGHT, paddingHorizontal: SPACING }}>
                        {/* Brands Categories filter */}
                        {
                            !isAdmin ?
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    data={brands && brands.length > 0 ? brands : cars ? [...cars].splice(0,4) : [{brand:'Mercedess'}, {brand:'Ford'}, {brand:'Kia'}]}
                                    keyExtractor={(item) => item.brand}
                                    renderItem={({ item }) => {
                                        return (
                                            <TouchableOpacity disabled style={STYLES.tag}>
                                                <CRText dark thin small>{item.brand}</CRText>
                                            </TouchableOpacity>
                                        );
                                    }}
                                /> : null
                        }

                        {/* All Filter button */}
                        {/* <View style={{ flexDirection: 'row', marginBottom: SPACING/2 }}>
                            
                            {
                                isAdmin ? <TouchableOpacity
                                    style={{ ...STYLES.icon_button, width: 3 * SPACING, height: 3 * SPACING, borderRadius: SPACING * 1.5, marginBottom: SPACING / 2 }}
                                    onPress={() => this.props.navigation.navigate('FILTER')}>
                                    <AntDesign name="filter" size={25} color={APP_GREEN_COLOR} />
                                </TouchableOpacity> : null
                            }
                        </View> */}


                    </View>

                    {isAdmin ? <CRText dark style={{ fontSize: 22, margin: SPACING, marginTop: 0 }}>Gérer vos voitures</CRText> : null}
                    {/* Display List of cars for all roles: admin or client */}
                    {cars && cars.length > 0 ?
                        <FlatList
                            style={{ marginBottom: isAdmin ? INPUT_HEIGHT : 0 }}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={cars}
                            keyExtractor={(item) => item.id + ''}
                            renderItem={this.renderItem}
                            onRefresh={() => {
                                this.onEndReachedCalledDuringMomentum = true;
                                this.setState({ isFetching: true, fetchMore: false },
                                    () => {
                                        this.props.getCars(0);
                                        this.props.getRents(0);
                                    });
                            }}
                            refreshing={isFetching}
                            onEndReached={this.fetchMoreCars}
                            onEndReachedThreshold={1}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                            ListFooterComponent={fetchMore ? <CRSpinner small /> : null}
                            ListFooterComponentStyle={{flex:1, justifyContent: 'flex-end'}}
                        />
                        : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 60 }}>
                            <AntDesign name="car" size={24} color={'rgba(0,0,0,0.15)'} />
                            <CRText dark bold style={{ color: 'rgba(0,0,0,0.15)' }}>Aucune voiture disponible</CRText>
                            <TouchableOpacity style={{ padding: SPACING }} onPress={() => this.props.getCars(0)}>
                                <MaterialIcons name="refresh" size={28} color={APP_GREEN_COLOR} />
                            </TouchableOpacity>
                        </View>}

                    {/* ToolBar: For admin only */}
                    {isAdmin ? <View style={styles.toolbar}>
                        {/* add car */}
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CRUD', { CRUD: 'C' })}>
                            <LinearGradient
                                colors={[APP_RED_COLOR, APP_BLUE_COLOR]}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.toolbar_item}
                            >
                                <AntDesign name="plus" size={32} color={APP_WHITE_COLOR} />
                            </LinearGradient></TouchableOpacity>
                        {/* Logout */}
                        <TouchableOpacity onPress={this.props.logout}>
                            <LinearGradient
                                colors={[APP_BLUE_COLOR, APP_GREEN_COLOR]}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.toolbar_item}
                            >
                                <AntDesign name="logout" size={32} color={APP_WHITE_COLOR} />
                            </LinearGradient></TouchableOpacity>
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

        // Access rents
        rents: state.rentsReducer.rents,
        rents_count: state.carsReducer.rents_count,
        brands: state.carsReducer.brands,

    };
};
export default connect(mapStateToProps, { getCars, logout, getRents })(HomeScreen);

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