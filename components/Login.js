import React from 'react';
import {StyleSheet, AsyncStorage, Text, View} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import * as Facebook from 'expo-facebook';
import axios from 'axios';

class Login extends React.Component {

    constructor () {
        super();
        this.state = {
            loggedInUser: null,
            userToBeAdded: null,
            error: null
        }
    }

    mapStateToProps = (state) => {
        return {
            email: state.todos
        };
    }


    cacheLocalLogin = async(obj) => {
        try {
            await AsyncStorage.setItem('access_token', JSON.stringify(obj));
            const user = await AsyncStorage.getItem('access_token');
            console.log("loggedInUser in cacheLocalLogin " + user);

            this.setState({
                loggedInUser: {
                    fbId: user.id,
                    firstName: user.name,
                    lastName: user.name,
                    email: user.email,
                    photoUrl: "string too long"
                }
            });
            
            this.props.navigation.navigate('App');
        } catch (error) {
            console.log(error);
        }
    }

    async componentDidMount() {
       await this.getUserFromDatabase();
      }

    getUserFromDatabase(user){
        // console.log(user.id);
        return axios.get("http://192.168.1.194:4567/users/" + user.fbId)
                .then(response => {
                    if(response.data.fbId){
                        console.log("fbId is true");
                        // this.setState({
                        //     loggedInUser: user
                        // });
                    } else {
                        console.log("fbId is supposed to be false");
                        console.log(response.data.fbId);
                        this.saveUserToDatabase(userId);

                    }
                })
                .catch(error => {
                    this.setState({
                        error
                    });
                })
    }

    async logIn() {
        try {
            const CONFIG = require('../secrets.json');
            
            const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync(`${CONFIG.FB_API_KEY}`, { permissions: ['public_profile','email']});
            
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

    loginFacebook = async() => {
        this.logIn();
    }

    loginLinkedIn = () => {
        alert(`Not yet!`);
    }

    saveUserToDatabase = async(user) => {
        const newUser = {
            fbId: user.id,
            firstName: user.name,
            lastName: user.name,
            email: user.email,
            photoUrl: "string too long"
        }
        return axios.post("http://192.168.1.194:4567/users", newUser)
                .then(response => {
                    if(response === "SUCCESS"){
                        this.setState({
                            userToBeAdded: null,
                            loggedInUser: user
                        });
                    }
                })
                .catch(error => {
                    this.setState({
                        error
                    })
                })
    }

    render() {

        if (this.state.loggedInUser){
            this.getUserFromDatabase(this.state.loggedInUser);
            console.log("loggin user is" + this.state.loggedInUser);
            
        }
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Welcome to Never Eat Alone</Text>
                <View style={styles.nav}>
                    <SocialIcon
                        title='Sign in with Facebook'
                        button
                        type='facebook'
                        iconSize = {24}
                        onPress={this.loginFacebook}>
                    </SocialIcon>
                    <SocialIcon
                        title='Sign in with LinkedIn'
                        button
                        type='linkedin'
                        iconSize = {24}
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