import React from 'react';
import { StyleSheet, AsyncStorage, Text, View, ImageBackground } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import * as Facebook from 'expo-facebook';
import axios from 'axios';


class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            loggedInUser: null,
            isLoggedIn: false,
            error: null,
            opacity: 1
        }
    }

    mapStateToProps = (state) => {
        return {
            email: state.todos
        };
    }

    cacheLocalLogin = async (obj) => {
        try {
            await AsyncStorage.setItem('access_token', JSON.stringify(obj))
            // await AsyncStorage.setItem('access_token', JSON.stringify(obj));
                const user = await AsyncStorage.getItem('access_token');
                this.props.navigation.navigate('App', {
                    loggedInUser: JSON.parse(user)
                });
                this.getUserFromDatabase(JSON.parse(user));
        } catch (error) {
            console.log(error);
        }
    }

   async getUserFromDatabase(user) {
        console.log("user is " + JSON.stringify(user));
        console.log("user.id is " + user.id);
        console.log("type of user is " + typeof user);
        const IN_USE_HTTP = require('../internet.json').IN_USE_HTTP;
        return axios.get(IN_USE_HTTP + "/users/" + user.id)
            .then(response => {
                console.log('response is', JSON.stringify(response));
                console.log(typeof user);
                
            })
            .catch(error => {
                console.log(error);
                console.log("data type of error: " + typeof error);
                console.log(error.response.status);
                if (error.response.status === 404) {
                    this.saveUserToDatabase(user);
                }
            })
    }

    async logIn() {
        try {
            const CONFIG = require('../secrets.json');
            this.setState({opacity: 0});
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync(`${CONFIG.FB_API_KEY}`, { permissions: ['public_profile', 'email'] });

            if (type === 'success') {
                fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`)
                    .then(res => res.json())
                    .then(obj => this.cacheLocalLogin(obj))
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    loginFacebook = async () => {
        this.logIn();
    }

    loginLinkedIn = () => {
        alert(`Not yet!`);
    }

    saveUserToDatabase = async (user) => {
        const userEmail = user.email ? user.email : "na"
        const newUser = {
            fbId: user.id,
            firstName: user.name,
            lastName: user.name,
            email: userEmail,
            photoUrl: user.picture.data.url
        }

        const IN_USE_HTTP = require('../internet.json').IN_USE_HTTP;
        return axios.post(IN_USE_HTTP + "/users", newUser)
            .then(response => {
                if (response === "SUCCESS") {
                    console.log("new user added");
                }
            })
            .catch(error => {
                console.log("error with post request");
            })
    }

    render() {
        const { navigate } = this.props.navigation;
        return (

                <View style={{
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    opacity: this.state.opacity
                }}>
                    <ImageBackground 
                        source={require("../assets/Logo_512.png")} 
                        style={{ width: 150, height: 150, marginBottom: 100 }}
                        >
                    </ImageBackground>

                    <Text style={{
                        textAlign: "center", 
                        fontSize: 20, 
                        marginBottom: 20,
                        // color: "#00deff",
                        // fontWeight: "bold"
                        }}>
                        A great meal needs great companions
                    </Text>

                    <View style={styles.nav}>
                        <SocialIcon
                            title='Sign in with Facebook'
                            button
                            type='facebook'
                            iconSize={24}
                            onPress={this.loginFacebook}>
                        </SocialIcon>
                        <SocialIcon
                            title='Sign in with LinkedIn'
                            button
                            type='linkedin'
                            iconSize={24}
                            onPress={this.loginLinkedIn}>
                        </SocialIcon>
                    </View>
                </View>
            
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nav: {
        marginTop: 20,
        width: 300
    }
});

export default Login;