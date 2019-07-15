import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const Restaurant = props => {
    let categories = props.categories.map((cat) => {
        return cat.title
    });

    categories = categories.join(", ");

    const distance = (props.distance * 0.000621371192).toFixed(2);

    let finalImageUrl = props.imageUrl
    if (!props.imageUrl) {
        finalImageUrl = "https://anrp.tamu.edu/wp-content/uploads/sites/29/2014/12/Image-Not-Available.jpg"
    }

        return(
            <TouchableOpacity onPress={props.onItemPressed}>
                <View style={styles.container} >
                    <Image 
                        style={styles.image}
                        resizeMode="cover"
                        source={{uri:finalImageUrl}}
                    />
                    <View>
                        <Text style={styles.restName}>{props.name}</Text>
                        <Text>{categories}</Text>
                        <Text style={styles.distance}>{distance} miles</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    // }
        
        
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginTop: 10,
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 10,
        marginLeft: 10
    },
    restName: {
        fontWeight: "bold"
    },
    distance: {
        color: "grey"
    }
})



export default Restaurant;