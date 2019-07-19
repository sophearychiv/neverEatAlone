import React from 'react';
import {ScrollView, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Restaurant from './Restaurant';

const RestList = props => {
    const restList = props.navigation.getParam('rests', 'defaultValue');
    console.log("rests in restList " + restList);
    const restCards = restList.map((rest, i) => {
        return (
                    <Restaurant
                        key={i}
                        id={rest.id}
                        name={rest.name}
                        imageUrl={rest.image_url}
                        categories={rest.categories}
                        distance={rest.distance}
                        // onItemPressed={() => this.onItemSelected(rest.id)}
                        // selectedRest={this.state.selectedRest}
                    />
                )
        });
    return (
        <ScrollView>
            {restCards}
        </ScrollView>
    );
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



export default RestList;