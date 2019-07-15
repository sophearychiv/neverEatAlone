import React from 'react';
import {StyleSheet, AsyncStorage, Text, View, Button} from 'react-native';

class Home extends React.Component {
    async getToken() {
        try {
            let token = await AsyncStorage.getItem('access_token');
            console.log(token);
            if (token && token !== '') {
              this.props.navigation.goBack();
            } else {
                this.props.navigation.dismiss();
                this.props.navigation.navigate('Login');
            }
        }catch(error){
            console.log(error);
        }
    }

    render() {
        this.getToken();

        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text>What would you like to do?</Text>
                <View style={styles.nav}>
                    <Button
                        title="Search Restaurants"
                        onPress={()=> navigate("SearchRestaurants")}
                    />
                </View>
                
                <View style={styles.nav}>
                    <Button 
                        title="Search People"
                        onPress={()=> navigate("SearchPeople")}
                    />
                </View>
                
                <View style={styles.nav}>
                    <Button 
                        title="Go to Your Profile"
                        onPress={()=> navigate("Profile")}
                    />
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
        marginTop: 50
    }
  });

export default Home;