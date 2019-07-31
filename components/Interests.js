import React from 'react';
import { View } from 'react-native';
import FooterTabs from './FooterTabs';
import { Container, Text, Content, List } from 'native-base';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import Interest from './Interest';

class Interests extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rests: []
        }
    }

    async componentDidMount() {
        await this.getInterests();
    }

    getInterests = async () => {
        const IN_USE_HTTP = require("../internet.json").IN_USE_HTTP
        axios.get(IN_USE_HTTP + "/users/" + this.props.navigation.getParam("fbId") + "/interests")
            .then(response => {
                return response.data.data
            })
            .then(restIds => {
                const CONFIG = require('../secrets.json');
                const config = {
                    headers: {
                        Authorization: `Bearer ${CONFIG.YELP_API_KEY}`,
                    },
                };

                restIds.forEach((restId) => {
                    axios.get('https://api.yelp.com/v3/businesses/' + restId, config)
                        .then(response => {
                            const rests = this.state.rests;
                            rests.push(response.data);
                            this.setState({ rests });
                        })
                        .catch(error => {
                            console.log("nested request in getting restaurants for interests: " + error);
                        })
                })
            })
            .catch(error => {
                console.log("error getting interests in the interests footer tab: " + error);
            })
    }

    render() {
        const rests = this.state.rests.map((rest, i) => {
            return [<Interest
                key={i}
                rest={rest}
                loggedInUserFbId={this.props.navigation.getParam("fbId")}
                me={this.props.navigation.getParam("me")}
            />]
        })

        return (
            <Container>
                <Content>
                    <List>
                        {rests}

                    </List>
                </Content>
                <FooterTabs
                    badgeCount={this.props.navigation.getParam("badgeCount")} />

            </Container>
        );
    }
}

export default withNavigation(Interests);