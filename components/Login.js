import React from 'react';
import {StyleSheet,TouchableHighlight, Text, View} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import * as Facebook from 'expo-facebook';

class Home extends React.Component {

    loginFacebook = () => {
        Facebook.logInWithReadPermissionsAsync('458524521370882', { permissions: ['public_profile']});
    }

    loginLinkedIn = () => {

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

export default Home;