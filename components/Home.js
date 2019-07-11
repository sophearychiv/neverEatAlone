import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

class Home extends React.Component {
    render() {
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
                        title="Check Your Availability"
                        onPress={()=> navigate("Availability")}
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