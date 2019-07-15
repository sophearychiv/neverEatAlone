import React from 'react';
import {StyleSheet, AsyncStorage, Text, View} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import * as Facebook from 'expo-facebook';

class Login extends React.Component {
  
    mapStateToProps = (state) => {
        return {
            email: state.todos
        };
    }

    cacheLocalLogin = async(obj) => {
        try {
            debugger;
            console.log(obj);
            await AsyncStorage.setItem('access_token', JSON.stringify(obj));
            this.props.navigation.navigate('Home');
        } catch (error) {
            console.log(error);
        }
    }

    async logIn() {
        try {
            const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync('458524521370882', { permissions: ['public_profile','email']});
            
            if (type === 'success') {
                fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`)
                .then(res => res.json())
                .then(obj => this.cacheLocalLogin(obj));
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

    render() {
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