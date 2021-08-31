import React, { Component } from 'react'
import { FlatList, Text, View, Image, TouchableOpacity, Linking, ToastAndroid } from 'react-native'
import { connect } from 'react-redux';
import CRSpinner from '../../components/CRSpinner';
import Utils from '../../utils';
import { getRents, crudRent, clearState } from '../../redux/actions';
import CRText from '../../components/CRText';
import moment from 'moment';
import { AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const {
    STYLES,
    SPACING,
    brands,
    INPUT_HEIGHT,
    APP_WHITE_COLOR,
    APP_LIGHTER_DARK,
    APP_LIGHT_DARK,
    APP_ORANGE_COLOR,
    APP_RED_COLOR,
    APP_BLUE_COLOR,
    APP_GREEN_COLOR
} = Utils;

class RentedCarsScreen extends Component {

    state = {
        isAdmin: this.props.session && this.props.session.role === 'admin',
        isFetching: false,
        showMessageAccept: false,
        currentRent: null,
    }

    // Lifecycle methods
    componentDidMount() {
        const { navigation } = this.props;
        navigation.setOptions({
            title: this.props.session && this.props.session.role === 'admin' ? 'Les demandes des clients' : 'Vos demandes de location',
        });

        // load rents list
        this.props.getRents(0);
    }
    componentDidUpdate(prevProps, _prevState) {
        if (this.props.error && prevProps.error !== this.props.error) {
            ToastAndroid.show(this.props.error, ToastAndroid.LONG);
        }

        if (this.props.rents && prevProps.rents !== this.props.rents) {
            this.setState({ isFetching: false });
        }

        if (this.props.rented && prevProps.rented !== this.props.rented) {
            // do something after the rent is saved
            this.props.clearState();
            this.props.getRents(0);
        }
    }

    // Actions
    acceptRent = (item) => {
        const { id } = item;
        this.props.crudRent(id, null, null, null, null, null, null, 'accepted', 'U');
    };
    refuseRent = (item) => {
        const { id } = item;
        this.props.crudRent(id, null, null, null, null, null, null, 'refused', 'U');
    };

    // Flatlist item
    remderRentItem = ({ item, index }) => {
        const { isAdmin, showMessageAccept, currentRent } = this.state;
        const { photoUrl, pickup_date, return_date, status: s, client_phone, pickup_position, first_name, last_name } = item;

        // Status handling
        const status = s === 'waiting' ? 'En attente' : s === 'accepted' ? 'Accepté' : s === 'renting' ? 'Louée' : 'Refusé';
        const statusColor = s === 'waiting' ? 'orange' : s === 'accepted' ? 'green' : s === 'renting' ? 'rgba(0,0,0,0.3)' : 'red';
        const backStatusColor = s === 'waiting' ? 'rgba(252,199,67,0.06)' : s === 'accepted' ? 'rgba(0,255,0,0.06)' : s === 'renting' ? 'rgba(0,0,0,0.1)' : 'rgba(255,0,0,0.06)';

        // Accept process
        const folderNum = item.id + "" + item.car_id + "" + item.user_id; // TODO: to be changed to a number (8 characters) and to be saved the moment the client request a rent

        return (
            <View style={{ flex: 1, marginBottom: SPACING / 2 }}>
                <View style={{ flexDirection: 'row', marginBottom: SPACING / 2, backgroundColor: backStatusColor, padding: 5 }}>
                    <Image source={{ uri: photoUrl }} style={{ width: '30%', height: 76, alignSelf: 'center', marginBottom: SPACING }} />
                    <View style={{ borderLeftWidth: 0.5, borderColor: 'rgba(0,0,0,0.3)', paddingLeft: SPACING, marginLeft: SPACING, justifyContent: 'center' }}>

                        {/* CLIENT */}
                        <View style={{ flexDirection: 'row', marginBottom: SPACING / 3 }}>
                            <CRText dark medium bold small >Client: </CRText>
                            <CRText dark medium style={{ marginHorizontal: SPACING / 2 }}>{first_name + " " + last_name}</CRText>
                        </View>
                        {/* PICKUP DATE */}
                        <View style={{ flexDirection: 'row', marginBottom: SPACING / 3 }}>
                            <CRText dark medium bold small >Date {isAdmin ? 'sortie' : 'récuperation'}: </CRText>
                            <CRText dark medium style={{ marginHorizontal: SPACING / 2 }}>{moment(pickup_date).format('D MMM YY')}</CRText>
                        </View>
                        {/* RETURN DATE */}
                        <View style={{ flexDirection: 'row', marginBottom: SPACING / 3 }}>
                            <CRText dark medium bold small >Date retour: </CRText>
                            <CRText dark medium style={{ marginHorizontal: SPACING / 2 }}>{moment(return_date).format('D MMM YY')}</CRText>
                        </View>
                        {/* STATUS */}
                        <View style={{ flexDirection: 'row', marginBottom: SPACING / 3 }}>
                            <CRText dark medium bold small >Status: </CRText>
                            <CRText dark medium bold style={{ marginHorizontal: SPACING / 2, color: statusColor }}>{status}</CRText>
                        </View>

                        {/* PHONE */}
                        {isAdmin ? <View style={{ flexDirection: 'row', marginBottom: SPACING / 3 }}>
                            <CRText dark medium bold small >Tél client: </CRText>
                            <TouchableOpacity disabled={s === 'refused'} onPress={() => Linking.openURL(`tel:${client_phone}`)}>{/* Open phone call with pre-filled number */}
                                <CRText dark medium bold style={{ marginHorizontal: SPACING / 2.5, color: s === 'refused' ? 'rgba(0,0,0,0.4)' : APP_RED_COLOR }}><AntDesign name="phone" size={20} color={s === 'refused' ? 'rgba(0,0,0,0.4)' : APP_RED_COLOR} /> {client_phone}</CRText>
                            </TouchableOpacity>
                        </View> : null}

                        {/* Button COMPLETE interview */}
                        {
                            s === 'accepted' ? <>
                                {!isAdmin ?
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: SPACING / 2, borderRadius: SPACING, alignSelf: 'flex-end' }}
                                        onPress={() => this.setState({ currentRent: item, showMessageAccept: !showMessageAccept })}>
                                        <CRText dark medium bold style={{ color: APP_BLUE_COLOR, marginRight: SPACING / 2 }}>Passer l'entretien</CRText>
                                        <AntDesign name={showMessageAccept ? "caretdown" : "caretright"} size={18} color={APP_BLUE_COLOR} />
                                    </TouchableOpacity> :
                                    <TouchableOpacity
                                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: SPACING / 3, borderRadius: SPACING, backgroundColor: 'rgba(0,0,0,0.6)' }}
                                        onPress={() => {
                                            ToastAndroid.show('Cette voiture est loué pour ce client et plus disponible pour les autres', ToastAndroid.LONG);
                                            this.props.crudRent(item.id, null, null, null, null, null, null, 'renting', 'U');
                                        }}>
                                        <CRText dark medium bold style={{ color: APP_WHITE_COLOR, marginRight: SPACING / 2 }}>Réserver pour ce client</CRText>
                                        <AntDesign name={"check"} size={18} color={APP_WHITE_COLOR} />
                                    </TouchableOpacity>}
                            </> : null
                        }
                        {/* Delete rent in case all is done with the client */}
                        {
                            s === 'renting' || s === 'refused' ? <>
                                {isAdmin ?
                                    <TouchableOpacity
                                        style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: SPACING / 3, borderRadius: SPACING, backgroundColor: 'rgba(0,0,0,0.6)' }}
                                        onPress={() => {
                                            ToastAndroid.show('Supprimé avec success, la voiture est disponible pour les autres clients.', ToastAndroid.LONG);
                                            this.props.crudRent(item.id, null, null, null, null, null, null, null, 'D');
                                        }}>
                                        <CRText dark medium bold style={{ color: APP_WHITE_COLOR, marginRight: SPACING / 2 }}>Supprimer</CRText>
                                        <AntDesign name={"delete"} size={18} color={APP_WHITE_COLOR} />
                                    </TouchableOpacity> : null
                                }
                            </> : null
                        }
                    </View>

                </View>
                {
                    isAdmin ?
                        <View style={{ flexDirection: 'row' }}>
                            {
                                s !== 'waiting' ? null : <>
                                    <TouchableOpacity onPress={() => this.acceptRent(item)} style={{ flex: 1, alignItems: 'center', backgroundColor: 'green', marginRight: SPACING / 4, padding: SPACING / 4 }}>
                                        <CRText bold medium>Accepter</CRText>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.refuseRent(item)} style={{ flex: 1, alignItems: 'center', backgroundColor: 'red', marginLeft: SPACING / 4, padding: SPACING / 4 }}>
                                        <CRText bold medium>Refuser</CRText>
                                    </TouchableOpacity></>
                            }

                        </View> :
                        <>
                            {s === 'accepted' && showMessageAccept && currentRent.id === item.id ?
                                <View style={{ backgroundColor: backStatusColor, padding: SPACING }}>
                                    <CRText dark bold>Numero de dossier: <CRText dark bold style={{ color: APP_RED_COLOR }}>{folderNum}</CRText></CRText>
                                    <CRText dark>Votre demande a été accépté et comme prochaine étape, nous vous invitons à visiter notre local (voir addresse ci-dessous) pour terminer l'entretien en apportant les documents suivants:</CRText>
                                    <CRText dark bold>- La carte d'identité</CRText>
                                    <CRText dark bold>- Le permis de conduire</CRText>
                                    <CRText dark bold>- Un justificatif de domicile (voire même un justificatif de revenus)</CRText>
                                    <CRText dark bold style={{ marginTop: SPACING, color: APP_BLUE_COLOR }}><MaterialCommunityIcons name="map-marker" size={22} color={APP_BLUE_COLOR} /> {pickup_position}</CRText>
                                </View> : null
                            }
                        </>
                }

            </View>
        );
    };

    render() {
        const { loading_rents, rents } = this.props;
        const { isFetching } = this.state;
        if (!isFetching && loading_rents) {
            return <CRSpinner />;
        }

        return (
            <View style={{ flex: 1, padding: SPACING, backgroundColor: APP_WHITE_COLOR }}>
                {
                    rents && rents.length > 0 ?
                        <FlatList
                            data={rents}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id + ''}
                            renderItem={this.remderRentItem}
                            onRefresh={() => {
                                this.setState({ isFetching: true },
                                    () => {
                                        this.props.getRents(0);
                                    });
                            }}
                            refreshing={isFetching}
                        />
                        : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 60 }}>
                            <AntDesign name="car" size={24} color={'rgba(0,0,0,0.15)'} />
                            <CRText dark bold style={{ color: 'rgba(0,0,0,0.15)' }}>Aucune demande disponible</CRText>
                            <TouchableOpacity style={{ padding: SPACING }} onPress={() => this.props.getRents(0)}>
                                <MaterialIcons name="refresh" size={28} color={APP_GREEN_COLOR} />
                            </TouchableOpacity>
                        </View>
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // Access user object as session
        session: state.authReducer.user,
        loading_user: state.authReducer.loading,

        // Access rents list
        rents: state.rentsReducer.rents,
        loading_rents: state.rentsReducer.loading,
        rented: state.rentsReducer.rented,

    };
};

export default connect(mapStateToProps, { getRents, crudRent, clearState })(RentedCarsScreen);