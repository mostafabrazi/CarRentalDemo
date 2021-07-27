import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react'
import { Dimensions, Keyboard, StyleSheet, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux';
import CRSpinner from '../../components/CRSpinner';
import CRSVGElement from '../../components/CRSVGElement';
import CRText from '../../components/CRText';
import { login, loggedIn } from '../../redux/actions';
import Utils from '../../utils';

const {
    SPACING, INPUT_HEIGHT, STYLES, svgLogo, APP_WHITE_COLOR, APP_DARK_TEXT_COLOR, APP_LIGHTER_DARK, APP_ORANGE_COLOR, APP_RED_COLOR_LIGHT, APP_RED_COLOR, APP_BLUE_COLOR, APP_GREEN_COLOR
} = Utils;

class LoginScreen extends Component {

    constructor(props) {
        super(props);

        // States
        this.state = {
            email: '',
            password: '',
            showLogo: true,
        };
    }

    // Lifecycle methods
    componentDidMount () {
        this._mounted = true;
        Keyboard.addListener('keyboardDidShow', () => {
            if (this._mounted) {
                this.setState({showLogo: false});
            }
        });
        Keyboard.addListener('keyboardDidHide', () => {
            if (this._mounted) {
                this.setState({showLogo: true});
            }
        });
    }
    componentWillUnmount() {
        this._mounted = false;
    }
    componentDidUpdate(prevProps, _prevState) {
        if (this.props.error && prevProps.error !== this.props.error) {
            ToastAndroid.show(this.props.error, ToastAndroid.LONG);
        }
    }

    // Actions
    onLogin() {
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password)
        } else {
            ToastAndroid.show("Merci d'entrer un " + (!username ? "username" : "mode de passe") + " valide !", ToastAndroid.LONG);
        }
    }

    render() {
        const { loading, user, error, isLoggedIn } = this.props;
        const { showLogo } = this.state;
        if (loading) {
            return <CRSpinner />;
        }

        return (
            <View style={styles.container}>
                <StatusBar style="dark" backgroundColor={APP_WHITE_COLOR} />

                {/* Logo */}
                {showLogo ? <CRSVGElement content={svgLogo} width={120} style={{borderRadius: SPACING, marginBottom: 2 * SPACING}} /> : null}

                {/* Hellow text */}
                <CRText bolder big dark>Bonjour!</CRText>
                <CRText dark medium style={{ marginBottom: 2 * SPACING }}>Connectez vous maintenant!</CRText>

                {/* Username & password inputs */}
                <TextInput
                    value={this.state.username}
                    onChangeText={(username) => this.setState({ username })}
                    placeholder='Username ...'
                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                    style={STYLES.input}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Mot de passe ...'}
                    secureTextEntry={true}
                    placeholderTextColor={'rgba(0,0,0,0.3)'}
                    style={STYLES.input}
                />

                {/* Login button */}
                <LinearGradient
                    colors={[APP_RED_COLOR, APP_BLUE_COLOR]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.button_container}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onLogin.bind(this)}>
                        <CRText light bold> Se Connecter </CRText>
                    </TouchableOpacity>
                </LinearGradient>


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

export default connect(mapStateToProps, { login, loggedIn })(LoginScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 2 * SPACING,
        paddingBottom: 100,
        justifyContent: 'center',
        backgroundColor: APP_WHITE_COLOR
    },
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
        color: APP_WHITE_COLOR,
    },
    button_container: { alignSelf: 'center', width: '60%', borderRadius: SPACING, marginVertical: SPACING },
});
