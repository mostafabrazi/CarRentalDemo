import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux';
import CRSpinner from '../../components/CRSpinner';
import {login, loggedIn} from '../../redux/actions';
import Utils, { STYLES } from '../../utils';

const {
    SPACING, INPUT_HEIGHT, APP_WHITE, APP_ORANGE_COLOR, APP_RED_COLOR_LIGHT, APP_RED_COLOR, APP_BLUE_COLOR, APP_GREEN_COLOR
} = Utils;

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    onLogin() {
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password)
        } else {
            ToastAndroid.show("Merci d'entrer un " + (!username ? "username" : "mode de passe") + " valide !", ToastAndroid.LONG);
        }
    }

    componentDidUpdate(prevProps, _prevState) {
        if (this.props.error && prevProps.error !== this.props.error) {
            ToastAndroid.show(this.props.error, ToastAndroid.LONG);
        }

        // if (this.props.user && prevProps.user !== this.props.user) {
        //     this.props.loggedIn();
        // }
    }

    render() {
        const {loading, user, error, isLoggedIn} = this.props;
        if (loading) {
            return <CRSpinner />;
        }

        return (
            <View style={{ flex: 1, justifyContent:'center', padding: SPACING, paddingBottom: 70, paddingTop: SPACING, backgroundColor: APP_WHITE }}>
                <StatusBar style="dark" backgroundColor={APP_WHITE} />

                <Image source={require('../../assets/logo.png')} style={{ alignSelf: 'center', width: 170, height: 170, marginBottom: SPACING }} />
                <TextInput
                    value={this.state.username}
                    onChangeText={(username) => this.setState({ username })}
                    placeholder='Username ...'
                    placeholderTextColor={APP_RED_COLOR_LIGHT}
                    style={styles.input}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Mot de passe ...'}
                    secureTextEntry={true}
                    placeholderTextColor={APP_RED_COLOR_LIGHT}
                    style={styles.input}
                />

                {/* {error ? <TouchableOpacity
                        disabled
                        style={{alignItems: 'center'}}
                        onPress={null}>
                        <Text style={{color: 'red'}}> {error} </Text>
                    </TouchableOpacity> : null} */}

                <LinearGradient colors={[ APP_RED_COLOR, APP_BLUE_COLOR]} style={styles.button_container}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onLogin.bind(this)}>
                        <Text style={styles.buttonText}> Se Connecter </Text>
                    </TouchableOpacity>
                </LinearGradient>

                {/* <TouchableOpacity
                        style={{alignItems: 'center'}}
                        onPress={null}>
                        <Text style={{color: 'rgba(0,0,0,0.4)'}}> Mot de passe Oublié? </Text>
                    </TouchableOpacity> */}

            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.authReducer.loading,
        user: state.authReducer.user,
        error: state.authReducer.error,
        isLoggedIn: state.authReducer.isLoggedIn,
    };
};

export default connect(mapStateToProps, {login, loggedIn})(LoginScreen);

const styles = StyleSheet.create({
    titleText: {
        fontSize: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: INPUT_HEIGHT,
        padding: SPACING,
    },
    buttonText: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: APP_WHITE,
    },
    button_container: {alignSelf: 'center', width: '60%', borderRadius: SPACING * 2, marginVertical: SPACING},
    input: {
        width: '100%',
        height: INPUT_HEIGHT,
        padding: SPACING,
        borderWidth: 2,
        color: APP_RED_COLOR,
        borderColor: APP_RED_COLOR,
        borderRadius: SPACING * 2,
        marginVertical: SPACING / 3,
    },
});
