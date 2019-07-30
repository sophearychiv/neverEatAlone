import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import Badge from './Badge';
import IconBadge from 'react-native-icon-badge';
import { View } from 'react-native';
import axios from 'axios';

const IN_USE_HTTP = require("../internet.json").IN_USE_HTTP


class FooterTabs extends Component {

    constructor(props) {
        super(props);

        // const badgeCount = this.props.pendingInvites.length - this.props.readPendingInvites.length
        this.state = {
            // currentTab: "home",
            badgeCount: props.badgeCount || 0,
            readInvites: []
            // badgeCount: 0
        }
        // this.getReadInvites();
    }

    async componentDidMount(){
        await this.getReadInvites();
    }

    getReadInvites = async() => {
        console.log("fbId in FooterTabs: " + this.props.fbId);
        axios.get(IN_USE_HTTP + "/users/" + this.props.fbId + "/invites/read")
            .then(response => {
                console.log("read invites in FooterTabs: " + JSON.stringify(response.data.data));
                console.log("pending invites in FooterTabs: " + JSON.stringify(this.props.pendingInvites));
                if(response.data.data.length < this.props.pendingInvites.length){
                    this.setState({
                        //pendingInvites is from Home
                        badgeCount: this.props.pendingInvites.length - response.data.data.length,
                        readInvites: response.data.data
                    })
                }
            })
            .catch(error => {
                console.log("error getting read invites in FooterTabs: " + error);
            })
    }

    // getReadInvites = () => {
    //     this.setState({
    //         badgeCount: this.props.pendingInvites.length - this.props.readPendingInvites.length
    //     })
    // }

    clickOnHome = () => {

        this.setState({
            currentTab: "home"
        });
        this.props.navigation.navigate("Home", {
            badgeCount: this.state.badgeCount,
        });
    }

    clickOnSearch = () => {
        this.setState({
            currentTab: "search"
        });
        this.props.navigation.navigate("SearchRestaurants", {
            fbId: this.props.fbId,
            badgeCount: this.state.badgeCount,
        });
    }

    clickOnInvites = () => {
        this.setState({
            currentTab: "invites",
        }, () => {
            this.props.navigation.navigate("Invites", {
                fbId: this.props.fbId,
                pendingInvites: this.props.pendingInvites,
                readPendingInvites: this.state.readInvites,
                // readPendingInvites: this.props.readPendingInvites,
                badgeCount: this.state.badgeCount,
            });
        });
    }

    clickOnFav = () => {
        this.props.navigation.navigate("Interests", {
            fbId: this.props.fbId,
            badgeCount: this.state.badgeCount,
        });

        this.setState({
            currentTab: "fav"
        });

    }
    render() {

        const home = <Button vertical onPress={() => this.clickOnHome()}>
                        <Icon name="home" />
                        <Text>Home</Text>
                    </Button>

        const search = <Button vertical onPress={() => this.clickOnSearch()}>
                            <Icon name="search" />
                            <Text>Search</Text>
                        </Button>
        const invites = <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <IconBadge
                                MainElement={
                                    <Button vertical onPress={() => this.clickOnInvites()}>
                                        <Icon name="mail-open" />
                                        <Text>Invites</Text>
                                    </Button>
                                }
                                BadgeElement={
                                    <Text style={{ color: '#FFFFFF' }}>{this.state.badgeCount}</Text>
                                }
                                IconBadgeStyle={
                                    {
                                        width: 15,
                                        height: 20,
                                        backgroundColor: 'red',
                                        marginRight: 20,
                                    }
                                }
                                Hidden={this.state.badgeCount === 0}
                            />
                        </View>

        const fav = <Button vertical onPress={() => this.clickOnFav()}>
                        <Icon name="heart" />
                        <Text>Fav</Text>
                    </Button>

        return (
            <Footer>
                <FooterTab>
                    {home}
                    {search}
                    {invites}
                    {fav}
                </FooterTab>
            </Footer>
        );
    }
}

export default withNavigation(FooterTabs);