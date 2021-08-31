import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Alert, Dimensions, FlatList, ImageBackground, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import CRText from '../../components/CRText';
import Utils from '../../utils';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { crudRent, clearState } from '../../redux/actions';
import { connect } from 'react-redux';
import CRSpinner from "../../components/CRSpinner";

const {
    STYLES,
    APP_ORANGE_COLOR,
    APP_GREEN_COLOR,
    APP_BLUE_COLOR,
    SPACING,
    APP_WHITE_COLOR,
    APP_DARK_TEXT_COLOR_2,
    APP_LIGHTER_DARK,
    APP_RED_COLOR
} = Utils;
const WIDTH_SCREEN = Dimensions.get('screen').width - (4 * SPACING);

class RentCarScreen extends Component {
    currentDate = new Date();
    state = {
        pickupDate: this.currentDate,
        returnDate: this.currentDate,
        show: false,
        showReturn: false,
        phone: null,
        saved: this.props.route.params.irentit > 0
    };

    // Lifecycle methods
    componentDidMount() {
        const { navigation } = this.props;
        navigation.setOptions({
            headerShown: false,
        });
    }
    componentWillUnmount () {
        this.setState(null);
    }
    componentDidUpdate(prevProps, _prevState) {
        if (this.props.error && prevProps.error !== this.props.error) {
            ToastAndroid.show(this.props.error, ToastAndroid.LONG);
        }

        if (this.props.rented && prevProps.rented !== this.props.rented) {
            // do something after the rent is saved
            this.setState({ saved: true });
            this.props.clearState();
        }
    }

    // Actions
    onChange = (event) => {
        this.setState({ show: false })
        const pickupDate = event.nativeEvent.timestamp || this.state.pickupDate;
        this.setState({ pickupDate });
    };
    onChangeReturnDate = (event) => {
        this.setState({ showReturn: false })
        const returnDate = event.nativeEvent.timestamp || this.state.returnDate;
        this.setState({ returnDate });
    };
    saveRent = () => {
        const { pickupDate, returnDate, phone: mobile } = this.state;
        const { id: car_id } = this.props.route.params;
        const { session } = this.props;

        // handle phone prefix
        if (mobile.length < 9) {
            Alert.alert('Entrez un numero de telephone valide!');
            return;
        }
        var phone = '';
        if (phone.indexOf('+33') === -1) {
            phone = '+33' + mobile;
        }

        this.props.crudRent(null, car_id, session.id, moment(pickupDate).format('YYYY-MM-DD HH:mm:ss'), moment(returnDate).format('YYYY-MM-DD HH:mm:ss'), phone, null, null,'C')
    };

    // Flatlist item
    renderSpecificationItem = ({ item, index }) => {
        const { icon, text, action, color } = item;
        return (
            <TouchableOpacity disabled={!action} onPress={action} style={{ paddingHorizontal: 2 * SPACING, height: 80, marginBottom: SPACING, borderRadius: SPACING, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons name={icon} size={30} color={color} style={{ marginBottom: SPACING / 2 }} />
                <CRText dark small numberOfLines={1} style={{ color: color }}>{text}</CRText>
            </TouchableOpacity>
        );
    };

    render() {

        // Access the properties
        const { session, loading } = this.props;
        // Access the states
        const { show, showReturn, pickupDate, returnDate, phone, saved } = this.state;
        // Acces the route parameters passed from Home screen
        const { brand, id: car_id, model, price, auto, photo, photoUrl, max_speed, pickup_position, fuel, seats, cyl_num } = this.props.route.params;

        /* pickup date styling */
        const pickDateTime = moment(pickupDate).format('D MMM Y');
        const dateTimePickerActive = pickupDate && this.currentDate !== pickupDate;
        const dateTimePickerColor = dateTimePickerActive ? APP_BLUE_COLOR : APP_DARK_TEXT_COLOR_2;

        /* return date styling */
        const returnDateTime = moment(returnDate).format('D MMM Y');
        const returnDateTimePickerActive = returnDate && this.currentDate !== returnDate;
        const returnDateTimePickerColor = returnDateTimePickerActive ? APP_GREEN_COLOR : APP_DARK_TEXT_COLOR_2;

        /* specification of the car */
        const specifications = [
            { id: 0, text: max_speed + ' Km/Hr', icon: 'gauge', action: null, color: APP_RED_COLOR },
            { id: 1, text: (auto + '' === '0') ? 'Manuelle' : 'Auto', icon: 'file-tree-outline', action: null, color: APP_BLUE_COLOR },
            { id: 2, text: cyl_num + ' Cyls', icon: 'hockey-puck', action: null, color: APP_GREEN_COLOR },
            { id: 3, text: seats, icon: 'car-seat', action: null, color: APP_ORANGE_COLOR },
            { id: 4, text: fuel, icon: 'gas-station', action: null, color: APP_RED_COLOR },
            { id: 5, text: 'voir plus...', icon: 'map-marker', action: () => Alert.alert(pickup_position), color: APP_BLUE_COLOR },
        ];

        // Ready to save
        const toSave = dateTimePickerActive && returnDateTimePickerActive && phone;

        if (loading) {
            return <CRSpinner />;
        }

        return (
            <View style={{ flex: 1, backgroundColor: APP_WHITE_COLOR }}>
                <StatusBar style={'dark'} backgroundColor={APP_WHITE_COLOR} />
                {/* Header (Car background + brand + model + price) */}
                <ImageBackground source={{ uri: photoUrl }} style={{ width: '100%', height: 220 }}>
                    <LinearGradient colors={['rgba(255,255,255,0.01)', 'rgba(0,0,0,0.7)']} style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <>
                            <TouchableOpacity onPress={this.props.navigation.goBack} style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,0.5)', width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', top: SPACING, left: SPACING }}>
                                <AntDesign name="arrowleft" size={25} color={APP_WHITE_COLOR} />
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: SPACING }}>
                                <CRText bolder big>{brand} - <CRText medium thin>{model}</CRText></CRText>
                                <CRText><CRText medium bold>€ {price}</CRText> <CRText small thin>/jour</CRText></CRText>
                            </View>
                        </>
                    </LinearGradient>
                </ImageBackground>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    alwaysBounceVertical={false}
                    alwaysBounceHorizontal={false}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    style={{flex:1}}>
                {
                    !saved ? <>
                        {/* More info about the car */}
                        <View style={{ paddingHorizontal: SPACING, backgroundColor: APP_LIGHTER_DARK }}>
                            <CRText dark bold medium style={{ marginVertical: SPACING }}>Plus de details sur la voiture</CRText>
                            {/* make specifications in one array that groups data and styling of all items */}
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={specifications}
                                renderItem={this.renderSpecificationItem}
                                keyExtractor={(item) => item.id + ''}
                            />
                        </View>
                        {/* Pickup date | return date */}
                        < View style={{ paddingHorizontal: SPACING }}>
                            {/* When the client wants the car? */}
                            <CRText dark medium style={{ marginVertical: SPACING }}>Vous aurez besoin de la voiture à partir de</CRText>
                            <View>
                                {/* button to pick date time */}
                                <TouchableOpacity
                                    style={[styles.button, { flexDirection: 'row', justifyContent: 'flex-start', borderWidth: 0.5, borderColor: dateTimePickerColor, borderRadius: SPACING }]}
                                    onPress={() => this.setState({ show: true })}>
                                    <AntDesign name="calendar" size={25} color={dateTimePickerColor} />

                                    {dateTimePickerActive ?
                                        <CRText medium bold style={{ flex: 1, marginLeft: SPACING, color: dateTimePickerColor }}>{pickDateTime}</CRText>
                                        : <CRText dark medium style={{ marginLeft: SPACING, color: dateTimePickerColor }}>Choisissez la date</CRText>}
                                </TouchableOpacity>
                                {/* datetime modal */}
                                {show ?
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={pickupDate}
                                        mode={'datetime'}
                                        is24Hour={true}
                                        display="default"
                                        onChange={this.onChange}
                                        minimumDate={this.currentDate}
                                    /> : null}
                            </View>

                            {/* When the client returns the car ? */}
                            <CRText dark medium style={{ marginVertical: SPACING }}>Vous pouvez la rendre le</CRText>
                            <View>
                                {/* button to pick date time */}
                                <TouchableOpacity
                                    style={[styles.button, { flexDirection: 'row', justifyContent: 'flex-start', borderWidth: 0.5, borderColor: returnDateTimePickerColor, borderRadius: SPACING }]}
                                    onPress={() => this.setState({ showReturn: true })}>
                                    <AntDesign name="calendar" size={25} color={returnDateTimePickerColor} />
                                    {returnDateTimePickerActive ?
                                        <CRText medium bold style={{ flex: 1, marginLeft: SPACING, color: returnDateTimePickerColor }}>{returnDateTime}</CRText>
                                        : <CRText dark medium style={{ marginLeft: SPACING, color: returnDateTimePickerColor }}>Choisissez la date</CRText>}
                                </TouchableOpacity>
                                {/* datetime modal */}
                                {showReturn ?
                                    <DateTimePicker
                                        backgroundColor={APP_BLUE_COLOR}
                                        testID="dateTimePicker2"
                                        value={returnDate}
                                        mode={'datetime'}
                                        is24Hour={true}
                                        display="default"
                                        onChange={this.onChangeReturnDate}
                                        minimumDate={pickupDate} // set the pickup date as the minimum to avoid wrong dates in future
                                    /> : null}
                            </View>

                            {/* Phone number of client ? */}
                            <CRText dark medium style={{ marginVertical: SPACING }}>Votre Téléphone</CRText>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SPACING }}>
                                <TextInput
                                    value={phone}
                                    onChangeText={(phone) => this.setState({ phone })}
                                    placeholder='+33   |   ...'
                                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                                    style={STYLES.input}
                                    keyboardType={'phone-pad'}
                                />
                            </View>
                        </View>

                        {/* Save the rent button */}
                        <TouchableOpacity
                            disabled={!toSave}
                            style={{ elevation: 10, position: 'absolute', bottom: 2 * SPACING, right: 2 * SPACING, alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: 30, backgroundColor: !toSave ? '#999' : APP_RED_COLOR }}
                            onPress={this.saveRent}>
                            <AntDesign name="check" size={25} color={APP_WHITE_COLOR} />
                        </TouchableOpacity>
                    </>
                        :
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 2 * SPACING }}>
                            <AntDesign name="checkcircle" size={40} color={'green'} />
                            <CRText bold medium style={{ color: 'green', textAlign: 'center', marginTop: SPACING, marginBottom: SPACING/2 }}>Votre demande est envoyé à l'administrateur avec success!</CRText>
                            <CRText thin style={{ color: 'green', textAlign: 'center' }}>Vous aurez une réponse dans les prochaines 24 h, vérifiez l'etat de vos demandes en appuyant sur l'icon <AntDesign name="bells" style={{fontWeight: 'bold'}} size={25} color={'green'} /> dans la page d'accueil</CRText>
                        </View>
                }
                </ScrollView>

            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        // Access user object as session
        session: state.authReducer.user,

        // Access crud rent
        loading: state.rentsReducer.loading,
        rented: state.rentsReducer.rented,
        error: state.rentsReducer.error
    };
};
export default connect(mapStateToProps, { crudRent, clearState })(RentCarScreen);

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING,
    },
});