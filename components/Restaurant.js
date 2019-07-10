import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Restaurant = props => {
    let finalImageUrl = props.imageUrl
    if (!props.imageUrl) {
        finalImageUrl = "https://anrp.tamu.edu/wp-content/uploads/sites/29/2014/12/Image-Not-Available.jpg"
    }
    return (

    <View style={styles.container} >
        <Image 
            style={styles.image}
            resizeMode="cover"
            source={{uri:finalImageUrl}}/>
        <Text>{props.name}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 10
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10
    }
})



export default Restaurant;