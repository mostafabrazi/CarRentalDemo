import React, { Component } from 'react'
import { Button, Dimensions, Image, Platform, ScrollView, StatusBar, StyleSheet, Switch, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import CRText from '../../components/CRText';
import Utils from '../../utils';
import { AntDesign } from '@expo/vector-icons';
import CRRadio from '../../components/CRRadio';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import { addCar, getCars } from '../../redux/actions';
import CRSpinner from "../../components/CRSpinner";

const { STYLES, brands, APP_LIGHTER_DARK, INPUT_HEIGHT, APP_LIGHT_DARK, APP_ORANGE_COLOR, APP_BLUE_COLOR, APP_GREEN_COLOR, APP_RED_COLOR, APP_WHITE_COLOR, SPACING } = Utils;

class CrudCarScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showTags: false,
            showGaz: false,
            CRUD: this.props.route.params ? this.props.route.params.CRUD : null,
            id: null,
            brand: null,
            model: null,
            price: null,
            auto: false,
            photo: null,
            photoUrl: null,
            max_speed: null,
            pickup_position: null,
            fuel: null,
            seats: null,
            cyl_num: null,
            step: 1,
        };
    }

    // Lifecycle methods
    componentDidMount() {
        this._mounted = true;
        const { CRUD, brand, model } = this.state;

        // In case we are in edit car we fill car info by the route params passed via navigate func of navigation
        if (CRUD === 'U') {
            this.setState({ ...this.props.route.params, auto: this.props.route.params.auto === 1 });
        }

        // Update header title
        this.props.navigation.setOptions({
            title: CRUD === 'C' ? 'Creer une voiture' : 'Gérer ' + this.props.route.params.brand + ' - ' + this.props.route.params.model,
            headerTitleStyle: {
                fontFamily: 'roboto-black',
                color: APP_RED_COLOR,
            },
            headerStyle: STYLES.header_style,
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => this.deleteCar(this.props.route.params.id)}
                    style={styles.delete_icon}>
                    <AntDesign name="delete" size={22} color={'red'} />
                </TouchableOpacity>
            ),
        });

        // Imagepicker
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!'); // TODO: CHANGE MESSAGE
                }
            }
        })();
    }
    componentWillUnmount() {
        this._mounted = false;
    }
    componentDidUpdate(prevProps, _prevState, _snapshot) {
        if (this.props.error && prevProps.error !== this.props.error) {
            ToastAndroid.show(this.props.error, ToastAndroid.LONG);
        }

        if (this.props.crud && prevProps.crud !== this.props.crud) {
            // Call get cars to reload cars list
            this.props.getCars(0);
            // go back to home
            this.props.navigation.goBack();
        }
    }

    // Actions
    selectedTag = (itemSelected) => {
        this.setState({ brand: itemSelected });
    };
    selectedGaz = (itemSelected) => {
        this.setState({ fuel: itemSelected });
    };
    nextStep = () => {
        const { CRUD, id, brand, model, price, auto, photo, max_speed, pickup_position, fuel, seats, cyl_num, step } = this.state;
        if (step <= 3) {
            // Validation
            if ((step === 1 && (!brand || !model || !seats)) ||
                (step === 2 && (!fuel || !max_speed || !cyl_num)) ||
                (step === 3 && (!price || !pickup_position || !photo))) {
                ToastAndroid.show('Remplissez tous les chanps!', ToastAndroid.LONG);
                return;
            }
            if (step === 3) {
                // Save action
                console.log('id: ', id);
                this.props.addCar(id, brand, model, price, auto, photo, max_speed, pickup_position, fuel, seats, cyl_num, CRUD);
                return;
            }
            this.setState({ step: step + 1 });
        }
    };
    deleteCar = () => {
        const { id, brand, model, price, auto, photo, max_speed, pickup_position, fuel, seats, cyl_num } = this.state;
        this.props.addCar(id, brand, model, price, auto, photo, max_speed, pickup_position, fuel, seats, cyl_num, 'D');
    };
    backStep = () => {
        if (this.state.step > 1) {
            this.setState({ step: this.state.step - 1 });
        }
    };
    toggleSwitch = () => this.setState({ auto: !this.state.auto });


    // Image Picker
    openImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            this.setState({ photo: result.uri, photoUrl: null });
        }
    };


    render() {
        // states access
        const { CRUD, car, brand, model, price, auto, photo, photoUrl, max_speed, pickup_position, fuel, seats, cyl_num, step } = this.state;
        // props access
        const { loading } = this.props;
        if (loading) {
            return <CRSpinner />
        }

        return (
            <>
                <StatusBar backgroundColor={APP_WHITE_COLOR} />
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    alwaysBounceVertical={false}
                    alwaysBounceHorizontal={false}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    style={[STYLES.container, { padding: 1.5 * SPACING }]}>

                    {/* Step 1 */}
                    {step === 1 ?
                        <>
                            {/* Brand */}
                            <CRText bold medium dark>Marque de voiture</CRText>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    value={brand}
                                    onChangeText={(brand) => this.setState({ brand })}
                                    placeholder='Marque ...'
                                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                                    style={[STYLES.input, { width: Dimensions.get('screen').width - 5 * SPACING, marginRight: SPACING / 3 }]}
                                />
                                <TouchableOpacity style={STYLES.icon_button} onPress={() => this.setState({ showTags: !this.state.showTags })}>
                                    <AntDesign name="caretdown" size={18} color={APP_BLUE_COLOR} />
                                </TouchableOpacity>
                            </View>
                            {this.state.showTags ? <CRRadio options={brands} selected={this.selectedTag} /> : null}

                            {/* Model */}
                            <CRText bold medium dark>Modèle de voiture</CRText>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    value={model}
                                    onChangeText={(model) => this.setState({ model })}
                                    placeholder='Modèle ...'
                                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                                    style={STYLES.input}
                                />
                            </View>

                            {/* Seats */}
                            <CRText bold medium dark>Nombre de places</CRText>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    value={seats}
                                    onChangeText={(seats) => this.setState({ seats })}
                                    placeholder='Places ...'
                                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                                    style={STYLES.input}
                                    keyboardType={'numeric'}
                                />
                            </View>

                            {/* Auto */}
                            <CRText bold medium dark>Automatic / Manuelle</CRText>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: SPACING }}>
                                <CRText dark medium style={{ color: APP_ORANGE_COLOR }}>Manuelle</CRText>
                                <Switch
                                    style={{ marginHorizontal: 1.5 * SPACING, transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                                    trackColor={{ false: APP_GREEN_COLOR, true: APP_ORANGE_COLOR }}
                                    thumbColor={auto ? APP_GREEN_COLOR : APP_ORANGE_COLOR}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={this.toggleSwitch}
                                    value={auto}
                                />
                                <CRText dark medium style={{ color: APP_GREEN_COLOR }}>Automatique</CRText>
                            </View>
                        </>
                        : null}
                    {/* Step 2 */}
                    {step === 2 ?
                        <>
                            {/* Fuel */}
                            < CRText bold medium dark>Type de Gaz</CRText>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    value={fuel}
                                    onChangeText={(fuel) => this.setState({ fuel })}
                                    placeholder='GAZ ...'
                                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                                    style={[STYLES.input, { width: Dimensions.get('screen').width - 5 * SPACING, marginRight: SPACING / 3 }]}
                                />
                                <TouchableOpacity style={STYLES.icon_button} onPress={() => this.setState({ showGaz: !this.state.showGaz })}>
                                    <AntDesign name="caretdown" size={18} color={APP_BLUE_COLOR} />
                                </TouchableOpacity>
                            </View>
                            {this.state.showGaz ? <CRRadio options={['Diesel', 'Essence', 'Electrique']} selected={this.selectedGaz} /> : null}

                            {/* Max speed */}
                            <CRText bold medium dark>Vitesse max de voiture (Km/Hr)</CRText>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    value={max_speed}
                                    onChangeText={(max_speed) => this.setState({ max_speed })}
                                    placeholder='Vitesse ...'
                                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                                    style={STYLES.input}
                                    keyboardType={'numeric'}
                                />
                            </View>

                            {/* Cylindres number */}
                            <CRText bold medium dark>Nombre de cylindres</CRText>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    value={cyl_num}
                                    onChangeText={(cyl_num) => this.setState({ cyl_num })}
                                    placeholder='Cylindres ...'
                                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                                    style={STYLES.input}
                                    keyboardType={'numeric'}
                                />
                            </View>
                        </>
                        : null
                    }
                    {/* Step 3 */}
                    {step === 3 ?
                        <>
                            {/* Pickup position */}
                            <CRText bold medium dark>Lieu de récupération</CRText>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    value={pickup_position}
                                    onChangeText={(pickup_position) => this.setState({ pickup_position })}
                                    placeholder='Client récupére la voiture de ...'
                                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                                    style={STYLES.input}
                                />
                            </View>

                            {/* Price */}
                            <CRText bold medium dark>Prix de voiture (€)</CRText>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    value={price}
                                    onChangeText={(price) => this.setState({ price })}
                                    placeholder='Prix ...'
                                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                                    style={STYLES.input}
                                    keyboardType={'numeric'}
                                />
                            </View>

                            {/* Photo */}
                            <CRText bold medium dark>Photo de voiture</CRText>

                            <TouchableOpacity
                                style={[styles.button, { flexDirection: 'row', justifyContent: 'flex-start', borderWidth: 0.5, borderColor: APP_BLUE_COLOR, marginVertical: SPACING }]}
                                onPress={this.openImagePicker}>

                                <AntDesign name="upload" size={25} color={APP_BLUE_COLOR} />
                                <CRText dark medium bold style={{ marginLeft: SPACING, color: APP_BLUE_COLOR }}>Choisissez la photo</CRText>

                            </TouchableOpacity>
                            {photo && !photoUrl ? <Image source={{ uri: photo }} style={{ width: '100%', height: 240, borderRadius: SPACING }} /> : null}
                            {CRUD === 'U' && photoUrl ? <Image source={{ uri: photoUrl }} style={{ width: '100%', height: 240, borderRadius: SPACING }} /> : null}

                        </>
                        : null}


                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        {/* Back Button */}
                        {
                            step >= 2 ? <LinearGradient
                                colors={[APP_ORANGE_COLOR, APP_RED_COLOR]}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.button_container}
                            >
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={this.backStep}>
                                    <CRText light bold>Précedent</CRText>
                                </TouchableOpacity>
                            </LinearGradient> : null
                        }
                        {/* Next Button or save if last step (step === 3) */}
                        <LinearGradient
                            colors={[APP_BLUE_COLOR, APP_GREEN_COLOR]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.button_container}
                        >
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this.nextStep}>
                                <CRText light bold>{step <= 2 ? 'Suivant' : 'Enregistrer'}</CRText>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>


                </ScrollView >
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.carsReducer.loading,

        crud: state.carsReducer.crud,
    };
};
export default connect(mapStateToProps, { addCar, getCars })(CrudCarScreen);

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: INPUT_HEIGHT,
        padding: SPACING,
    },
    button_container: {
        width: '30%',
        borderRadius: SPACING,
        marginVertical: SPACING,
        marginLeft: SPACING
    },
    delete_icon: {
        width: 3 * SPACING,
        height: 2 * SPACING,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 1.3 * SPACING
    }
});