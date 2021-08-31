import React, { Component } from 'react'
import { connect } from 'react-redux';
import AuthNavigatorStack from '../routes/AuthNavigator';
import HomeNavigatorStack from '../routes/HomeNavigator';
import {loggedIn, getCars} from '../redux/actions';

class Root extends Component {
    componentDidMount () {
        // To check if the user already is logged in
        // In case logged in we redirect him directly to Home screen ;)
        this.props.loggedIn();
        // Get cars list once the screen is mounted
        this.props.getCars(0);
    }
    render() {
        const { isLoggedIn } = this.props;
        return (
            <>
                {/* (Auth or Home) switch logic */}
                {/* Switch process: In case the user session already exists 
                -> redirect to HomeStack (default HomeScreen) */}
                {/* Switch process: In case the user session already doesn't exists 
                -> redirect to AuthStack (default LoginScreen) */}
                
                {!isLoggedIn ? <AuthNavigatorStack /> : <HomeNavigatorStack />}
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn,
    };
};
export default connect(mapStateToProps, {loggedIn, getCars})(Root);
