import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';

class Restaurant extends React.Component {

    // constructor (props){
    //         super(props);
    //         this.state = {
    //             interested: false
    //         }
    //     }
    
    //     async componentDidMount(){
    //         await this.checkIsInterested();
    //     }
    
    //     checkIsInterested = async (userFbId, restId) => {
    //          return axios.get("http://192.168.1.194:4567/users/" + userFbId + "/interests/" + restId)
    //                 .then(response => {
    //                     this.setState({
    //                         interested: true
    //                     })
    //                     console.log(response);
    //                     // return restId;
    //                 })
    //                 .catch(error => {
    //                     // this.setState({
    //                     //     beenInterested: false
    //                     // })
    //                     // console.log("type of error :" + typeof error);
    //                     // console.log("checking isInterested in RestList: " + error.status);
    //                     // return null;
    //                     // return false;
    //                 })
    //     }
    
    //     onItemSelected = (selectedRest) => {
    //         const userFbId = this.props.loggedInUserFbId;
    //         // const isInterested = this.checkIsInterested(userFbId, selectedRest.id);
    //         this.checkIsInterested(userFbId, selectedRest.id);
    //         // console.log("result of checkIsInterested: " + JSON.stringify(isInterested));
    //         this.props.navigation.navigate("RestDetails", {
    //             // beenInterested: this.state.beenInterested,
    //             // interestedRestId: this.state.interestedRestId,
    //             beenMarkedInterested: this.state.interested,
    //             loggedInUserFbId: userFbId,
    //             rest: selectedRest
    //         });
    //     }

    onItemSelected = (selectedItem) => {
        this.props.onItemPressed(selectedItem);
    }

    render(){
        let categories = this.props.rest.categories.map((cat) => {
            return cat.title
        });
    
        categories = categories.join(", ");
    
        const distance = (this.props.rest.distance * 0.000621371192).toFixed(2);
    
        let finalImageUrl = this.props.rest.image_url
        if (!this.props.rest.image_url) {
            finalImageUrl = "https://anrp.tamu.edu/wp-content/uploads/sites/29/2014/12/Image-Not-Available.jpg"
        }
    
        return (
            <TouchableOpacity onPress={() => this.onItemSelected(this.props.rest)}>
                <View style={styles.container} >
                    <Image 
                        style={styles.image}
                        resizeMode="cover"
                        source={{uri:finalImageUrl}}
                    />
                    <View>
                        <Text style={styles.restName}>{this.props.rest.name}</Text>
                        <Text>{categories}</Text>
                        <Text style={styles.distance}>{distance} miles</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    
        
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