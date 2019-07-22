import React from 'react';
import {ScrollView, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Restaurant from './Restaurant';
import axios from 'axios';

class RestList extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            beenMarkedInterested: false,
            restsOfInterest: this.props.navigation.getParam("restsOfInterest")
        }
    }

    checkIsInterested = async (userFbId, selectedRest) => {
         axios.get("http://192.168.1.194:4567/users/" + userFbId + "/interests/" + selectedRest.id)
                .then(response => {
                    console.log("rest id in checkIsInterested in RestList: " + JSON.stringify(response.data));
                    console.log("rest id in checkIsInterested in RestList: " + response.data.data.restId);
                    this.props.navigation.navigate("RestDetails", {
                        beenMarkedInterested: true,
                        loggedInUserFbId: userFbId,
                        rest: selectedRest,
                    });
                })
                .catch(error => {
                    this.props.navigation.navigate("RestDetails", {
                        beenMarkedInterested: false,
                        loggedInUserFbId: userFbId,
                        rest: selectedRest,
                    });
                })
    }

    onItemSelected = (selectedRest) => {
        const userFbId = this.props.navigation.getParam("loggedInUserId", "default user");
        this.checkIsInterested(userFbId,selectedRest);
    }

    render() {
        console.log("rendering RestList");
        const restList = this.props.navigation.getParam('rests', 'defaultValue');
        const restCards = restList.map((rest, i) => {
            return (
                        <Restaurant
                            key={i}
                            rest={rest}
                            loggedInUserFbId={this.props.navigation.getParam("loggedInUserId")}
                            onItemPressed={() => this.onItemSelected(rest)}
                        />
                    )
            });
        return (
            <ScrollView>
                {restCards}
            </ScrollView>
        );
    }
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