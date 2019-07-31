import React from 'react';
import { ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { withNavigation } from 'react-navigation';
import axios from 'axios';

class Interest extends React.Component {

    constructor(props) {
        super(props);
        // this.getInterestedPeople(this.props.rest);
    }


    handleClickOnView = async (rest) => {
        const IN_USE_HTTP = require('../internet.json').IN_USE_HTTP;
        return axios.get(IN_USE_HTTP + "/interests/" + rest.id + "/userFbIds") //home
            .then(response => {
                console.log("interested people: " + response.data.data);

                return response.data.data
            })
            .then( async fbIds => {
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
                        .catch(error => {
                            console.log("in forEach loop in PeopleList: " + error);
                        });
                }));
                return currentPeople;
            })
            .then(currentPeople => {
                this.props.navigation.navigate("RestDetails", {
                    beenMarkedInterested: true,
                    loggedInUserFbId: this.props.loggedInUserFbId,
                    rest: this.props.rest,
                    interestedPeople: currentPeople,
                    me: this.props.navigation.getParam("me"),
                    badgeCount: this.props.badgeCount
                });
            })
            .catch(error => {
                console.log("in second nested request in PeopleList: " + error);
                this.props.navigation.navigate("RestDetails", {
                    beenMarkedInterested: this.state.beenMarkedInterested,
                    loggedInUserFbId: this.state.loggedInUserFbId,
                    rest: this.state.selectedRest,
                    interestedPeople: [],
                    me: this.props.me
                });
            });
    }

    render() {
        let categories = this.props.rest.categories.map((cat) => {
            return cat.title
        });

        categories = categories.join(", ");
        return (
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: this.props.rest.image_url }} />
                </Left>
                <Body>
                    <Text>{this.props.rest.name}</Text>
                    <Text note numberOfLines={1}>{categories}</Text>
                </Body>
                <Right>
                    <Button
                        transparent
                        onPress={() => this.handleClickOnView(this.props.rest)}
                    >
                        <Text>View</Text>
                    </Button>
                </Right>
            </ListItem>
        );
    }
}

export default withNavigation(Interest);