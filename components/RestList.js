import React from 'react';
import {ScrollView, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Restaurant from './Restaurant';
import axios from 'axios';

class RestList extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            // interestedRestId: null,
            beenMarkedInterested: false,
            restsOfInterest: this.props.navigation.getParam("restsOfInterest")
        }
    }

    // async componentDidMount(){
    //     await this.checkIsInterested();
    // }

    checkIsInterested = async (userFbId, restId) => {
         axios.get("http://192.168.1.194:4567/users/" + userFbId + "/interests/" + restId)
                .then(response => {
                    this.setState({
                        // interestedRestId: restId,
                        beenMarkedInterested: true
                    })
                    console.log("running .then in checkIsInterested, beenMarkedInterested for " + restId + " is " + this.state.beenMarkedInterested);
                    // return restId;
                })
                .catch(error => {
                    this.setState({
                        beenMarkedInterested: false
                    })
                    // console.log("type of error :" + typeof error);
                    // console.log("checking isInterested in RestList: " + error.status);
                    // return null;
                    // return false;
                })
    }

    onItemSelected = (selectedRest) => {
        const userFbId = this.props.navigation.getParam("loggedInUserId", "default user");
        // this.checkIsInterested(userFbId, selectedRest.id);
        // const interestedRestId = this.checkIsInterested(userFbId, selectedRest.id);
        // console.log("result of checkIsInterested: " + JSON.stringify(isInterested));
        // console.log("running in onItemSelected in RestList, beenMarkedInterested is: " + this.state.beenMarkedInterested)
        this.props.navigation.navigate("RestDetails", {
            beenMarkedInterested: this.state.beenMarkedInterested,
            // interestedRestId: this.state.interestedRestId,
            loggedInUserFbId: userFbId,
            rest: selectedRest,
            restsOfInterest: this.props.navigation.getParam("restsOfInterest")
        });
    }

    render() {
        console.log("rendering RestList");
        // console.log("interested restId is: " + this.state.interestedRestId);
        // console.log("loggedInUserId in RestList is " + this.props.navigation.getParam("loggedInUserId"));
        const restList = this.props.navigation.getParam('rests', 'defaultValue');
        const restCards = restList.map((rest, i) => {
            return (
                        <Restaurant
                            key={i}
                            rest={rest}
                            loggedInUserFbId={this.props.navigation.getParam("loggedInUserId")}
                            // id={rest.id}
                            // name={rest.name}
                            // imageUrl={rest.image_url}
                            // categories={rest.categories}
                            // distance={rest.distance}
                            onItemPressed={() => this.onItemSelected(rest)}
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
    // console.log("rests in restList " + restList);

   
   
    
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