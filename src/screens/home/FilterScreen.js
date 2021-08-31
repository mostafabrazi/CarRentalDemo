import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { ScrollView, Switch, TextInput, TouchableOpacity, View } from 'react-native'
import CRRadio from '../../components/CRRadio';
import CRText from '../../components/CRText';
import Utils from '../../utils'
import { getCars } from '../../redux/actions';
import { connect } from 'react-redux';
import CRSpinner from '../../components/CRSpinner';

const { APP_WHITE_COLOR, SPACING, brands, STYLES, APP_RED_COLOR, INPUT_HEIGHT, APP_BLUE_COLOR, APP_RED_COLOR_LIGHT, APP_DARK_TEXT_COLOR, APP_ORANGE_COLOR, APP_GREEN_COLOR } = Utils;

class FilterScreen extends Component {

    state = {
        brand: null,
        price: 200,
        seats: 5,
        model: null,
        mostRent: false,
    };

    // Lifecycle methods
    componentDidMount() {
        const { navigation } = this.props;
        navigation.setOptions({
            title: 'Filtrer votre liste',
            headerTitleStyle: {
                fontFamily: 'roboto-black',
                color: APP_BLUE_COLOR,
            },
            headerStyle: STYLES.header_style,
        });
    }
    componentDidUpdate(prevProps, _prevState) {
        if (this.props.loading && prevProps.loading !== this.props.loading) {
            this.props.navigation.goBack();
        }
    }


    // Actions
    selectedTag = (itemSelected) => {
        this.setState({ brand: itemSelected });
    };
    applyFilter = () => {
        this.props.getCars(0, this.state);
    };
    toggleSwitch = () => this.setState({ mostRent: !this.state.mostRent });

    render() {
        const { brand, price, model, mostRent } = this.state;
        const { loading } = this.props;
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
                    {/* Brand Filter */}
                    <View style={{ marginBottom: SPACING }}>
                        <CRText bold medium dark>Selon la Marque de voiture</CRText>
                        <CRRadio options={brands} selected={this.selectedTag} style={{ marginVertical: SPACING }} />
                    </View>

                    {/* Model Filter */}
                    <View style={{ marginBottom: SPACING }}>
                        <CRText bold medium dark>Selon le modèle de voiture</CRText>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                                value={model}
                                onChangeText={(model) => this.setState({ model })}
                                placeholder='Modèle ...'
                                placeholderTextColor={'rgba(0,0,0,0.3)'}
                                style={STYLES.input}
                            />
                        </View>
                    </View>


                    {/* Price Filter */}
                    <View style={{ marginBottom: SPACING }}>
                        <CRText bold medium dark>Selon le prix MAX de voiture</CRText>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: SPACING / 2 }}>
                            <Slider
                                style={{ flex: 1, height: 70, alignSelf: 'center' }}
                                thumbTintColor={APP_RED_COLOR}
                                thumbImage={require('../../assets/img/thumb.png')}
                                minimumTrackTintColor={APP_ORANGE_COLOR}
                                maximumTrackTintColor={APP_RED_COLOR}
                                onValueChange={(price) => this.setState({ price })}
                                step={1}
                                value={price}
                                minimumValue={0}
                                maximumValue={200}
                            />
                            <CRText big dark bold style={{ color: APP_RED_COLOR }}>{price} € / jour</CRText>
                        </View>
                    </View>

                    {/* Seats */}
                    <View style={{ marginBottom: SPACING }}>
                        <CRText bold medium dark>Selon le nombre de places</CRText>
                        <View style={{ flexDirection: 'row', marginVertical: SPACING }}>
                            {[2, 4, 5, 6, 7, 8, 9].map((element, I) => { // we can change number of seats from here 
                                return (
                                    <TouchableOpacity
                                        key={I + ''}
                                        onPress={() => this.setState({ seats: element })}
                                        style={{ flex: 1, backgroundColor: this.state.seats === (element) ? APP_RED_COLOR : 'rgba(0,0,0,0.1)', height: INPUT_HEIGHT, justifyContent: 'center', alignItems: 'center', marginHorizontal: SPACING / 4 }}>
                                        <CRText big bold dark style={{ color: this.state.seats === (element) ? APP_WHITE_COLOR : APP_DARK_TEXT_COLOR }}>{element}</CRText>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* Auto */}
                    <CRText bold medium dark>Selon les plus louées</CRText>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: SPACING }}>
                        <Switch
                            style={{ marginHorizontal: 1.5 * SPACING, transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                            trackColor={{ false: APP_GREEN_COLOR, true: APP_ORANGE_COLOR }}
                            thumbColor={mostRent ? APP_GREEN_COLOR : APP_ORANGE_COLOR}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.toggleSwitch}
                            value={mostRent}
                        />
                        <CRText dark medium style={{ color: APP_GREEN_COLOR }}>Oui</CRText>
                    </View>

                    {loading ? <CRSpinner /> :
                        <LinearGradient
                            colors={[APP_ORANGE_COLOR, APP_RED_COLOR]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{
                                width: '30%',
                                borderRadius: SPACING,
                                marginVertical: SPACING,
                                marginLeft: SPACING,
                                alignSelf: 'flex-end'
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: INPUT_HEIGHT,
                                    padding: SPACING,
                                }}
                                onPress={this.applyFilter}>
                                <CRText light bold>Confirmer</CRText>
                            </TouchableOpacity>
                        </LinearGradient>}

                </ScrollView>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {

        // Access cars list response data
        loading: state.carsReducer.loading,

    };
};
export default connect(mapStateToProps, { getCars })(FilterScreen);
