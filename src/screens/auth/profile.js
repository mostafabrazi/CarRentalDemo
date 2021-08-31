import React, { Component } from 'react'
import { ScrollView, StyleSheet, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import Utils from '../../utils';
import { editProfile } from '../../redux/actions';
import CRText from '../../components/CRText';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import CRSpinner from '../../components/CRSpinner';

const { STYLES, APP_GREEN_COLOR, APP_BLUE_COLOR, APP_WHITE_COLOR, SPACING, INPUT_HEIGHT } = Utils;

class Profile extends Component {

    state = {
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
        username: this.props.user.username,
        created_at: moment(this.props.user.created_at).format('D MMM Y'),
    };

    // Lifecycle methods
    componentDidMount() {
        const { navigation } = this.props;
        navigation.setOptions({
            title: 'Profil',
            headerTitleStyle: {
                fontFamily: 'roboto-black',
                color: APP_GREEN_COLOR,
            },
            headerStyle: STYLES.header_style,
        });
    }
    componentDidUpdate(prevProps, _prevState) {
        if (this.props.error && prevProps.error !== this.props.error) {
            ToastAndroid.show(this.props.error, ToastAndroid.LONG);
        }
        if (this.props.updated && prevProps.updated !== this.props.updated) {
            ToastAndroid.show(this.props.updated, ToastAndroid.LONG);
        }
    }

    // Actions
    save = () => {
        const { first_name, last_name, username } = this.state;
        if (first_name && last_name && username) {
            this.props.editProfile(this.props.user.id, first_name, last_name, username);
        } else {
            ToastAndroid.show('Merci de remplir les champs necessaires!', ToastAndroid.LONG);
        }
    };

    render() {
        // Acces the props
        const { loading } = this.props;

        if (loading) {
            return <CRSpinner />;
        }

        // Access user state
        const { first_name, last_name, username, created_at } = this.state;
        return (
            <ScrollView
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                alwaysBounceVertical={false}
                alwaysBounceHorizontal={false}
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, backgroundColor: APP_WHITE_COLOR, padding: 2 * SPACING }}>
                {/* First name */}
                <CRText bold medium dark>Nom personnel</CRText>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        value={first_name}
                        onChangeText={(first_name) => this.setState({ first_name })}
                        placeholder='Nom personnel ...'
                        placeholderTextColor={'rgba(0,0,0,0.3)'}
                        style={STYLES.input}
                    />
                </View>

                {/* Last name */}
                <CRText bold medium dark>Nom famille</CRText>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        value={last_name}
                        onChangeText={(last_name) => this.setState({ last_name })}
                        placeholder='Nom famille ...'
                        placeholderTextColor={'rgba(0,0,0,0.3)'}
                        style={STYLES.input}
                    />
                </View>

                {/* username */}
                <CRText bold medium dark>Username</CRText>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        value={username}
                        onChangeText={(username) => this.setState({ username })}
                        placeholder='Username ...'
                        placeholderTextColor={'rgba(0,0,0,0.3)'}
                        style={STYLES.input}
                    />
                </View>

                {/* Joined */}
                <CRText bold medium dark style={{ backgroundColor: 'rgba(0,0,0,0.1)', padding: SPACING, borderRadius: SPACING, marginTop: SPACING }}>Rejoint le <CRText bold medium style={{ color: APP_BLUE_COLOR }}>{created_at}</CRText></CRText>

                {/* Save */}
                <LinearGradient
                    colors={[APP_BLUE_COLOR, APP_GREEN_COLOR]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.button_container}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.save}>
                        <CRText light bold>{'Enregistrer'}</CRText>
                    </TouchableOpacity>
                </LinearGradient>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // Access user loggedin details
        loading: state.authReducer.loading,
        user: state.authReducer.user,

        // Acces editprofile state
        updated: state.authReducer.updated,
        error: state.authReducer.error,
    };
};

export default connect(mapStateToProps, { editProfile })(Profile);
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: INPUT_HEIGHT,
        padding: SPACING,
    },
    button_container: {
        width: '50%',
        borderRadius: SPACING,
        marginVertical: SPACING,
        marginLeft: SPACING,
        alignSelf: 'flex-end'
    }
});