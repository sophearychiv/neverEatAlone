import React from 'react';
import { ScrollView, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import Restaurant from './Restaurant';
import axios from 'axios';
import FooterTabs from './FooterTabs';

class RestList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            beenMarkedInterested: false,
            restsOfInterest: this.props.navigation.getParam("restsOfInterest"),
            interestedPeople: [],
        }
    }

    checkIsInterested = async (userFbId, selectedRest) => {
        const IN_USE_HTTP = require('../internet.json').IN_USE_HTTP;
        axios.get(IN_USE_HTTP + "/users/" + userFbId + "/interests/" + selectedRest.id)
            .then(response => {
                console.log("rest id in checkIsInterested in RestList: " + JSON.stringify(response.data));
                console.log("rest id in checkIsInterested in RestList: " + response.data.data.restId);
                // this.props.navigation.navigate("RestDetails", {
                //     beenMarkedInterested: true,
                //     loggedInUserFbId: userFbId,
                //     rest: selectedRest,
                // });
                this.setState({
                    beenMarkedInterested: true,
                    loggedInUserFbId: userFbId,
                    selectedRest: selectedRest
                }, () => {
                    this.getInterestedPeople(selectedRest);
                })
            })
            // .then(response => {
            //     this.getInterestedPeople(selectedRest);
            // })
            .catch(error => {
                this.setState({
                    beenMarkedInterested: false,
                    loggedInUserFbId: userFbId,
                    selectedRest: selectedRest
                }, () => {
                    this.getInterestedPeople(selectedRest);
                })
            })
    }

    onItemSelected = (selectedRest) => {
        const userFbId = this.props.navigation.getParam("loggedInUserId", "default user");
        this.checkIsInterested(userFbId, selectedRest);
    }

    getInterestedPeople = async (rest) => {
        const IN_USE_HTTP = require('../internet.json').IN_USE_HTTP;
        return axios.get(IN_USE_HTTP + "/interests/" + rest.id + "/userFbIds") //home
            .then(response => {
                console.log("interested people Ids: " + response.data.data);

                return response.data.data
            })
            .then(async fbIds => {
                let currentPeople = []
                await Promise.all(fbIds.map(async (fbId) => {
                    // fbIds.forEach(async fbId => {
                    const IN_USE_HTTP = require('../internet.json').IN_USE_HTTP;
                    await axios.get(IN_USE_HTTP + "/users/" + fbId)  // home
                        .then(user => {
                            currentPeople.push(user);
                            this.setState({
                                interestedPeople: currentPeople
                            });

                        })
                }));
                console.log("current people array: " + JSON.stringify(currentPeople));

                console.log("current people: " + JSON.stringify(this.state.interestedPeople));
                return currentPeople
                // this.props.navigation.navigate("RestDetails", {
                //     beenMarkedInterested: this.state.beenMarkedInterested,
                //     loggedInUserFbId: this.state.loggedInUserFbId,
                //     rest: this.state.selectedRest,
                //     interestedPeople: this.state.interestedPeople,
                //     me: this.props.navigation.getParam("me")
                // });
            })
            .then(interestedPeople => {
                console.log("interested people in RestList: " + interestedPeople);
                this.props.navigation.navigate("RestDetails", {
                    beenMarkedInterested: true,
                    loggedInUserFbId: this.props.loggedInUserFbId,
                    rest: this.state.selectedRest,
                    interestedPeople: interestedPeople,
                    me: this.props.navigation.getParam("me")
                });
            })
            .catch(error => {
                console.log("in second nested request in PeopleList: " + error);
                this.props.navigation.navigate("RestDetails", {
                    beenMarkedInterested: this.state.beenMarkedInterested,
                    loggedInUserFbId: this.state.loggedInUserFbId,
                    rest: this.state.selectedRest,
                    interestedPeople: [],
                    me: this.props.navigation.getParam("me")
                });
            });
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
            // <View>
            <Container>
                <ScrollView>
                    {restCards}

                </ScrollView>
                <FooterTabs />
            </Container>
        );
    }
}

export default RestList;