import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import IconBadge from 'react-native-icon-badge';
import { View, AsyncStorage } from 'react-native';
import axios from 'axios';

const IN_USE_HTTP = require("../internet.json").IN_USE_HTTP
class FooterTabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTab: "home",
            fbId: null,
            isLoggedIn: null,
            name: null,
            photoUrl: null,
            badgeCount: props.badgeCount || 0,
            seenPendingInvites: props.seenPendingInvites || [],
            pendingInvites: props.pendingInvites || []
        }
    }


    clickOnHome = () => {

        this.setState({
            currentTab: "home"
        });
        this.props.navigation.navigate("Home", {
            badgeCount: this.state.badgeCount,
            pendingInvites: this.state.pendingInvites,
            seenPendingInvites: this.state.seenPendingInvites
        });
    }

    clickOnInvites = () => {
        this.props.navigation.navigate("Invites", {
            fbId: this.props.fbId,
            me: this.props.me,
            pendingInvites: this.state.pendingInvites
        });

        this.setState({
            currentTab: "invites"
        });

    }

    clickOnFav = () => {
        console.log(" fbId in footertabs: " + this.props.fbId);
        this.props.navigation.navigate("Interests", {
            fbId: this.props.fbId,
            me: this.props.me,
            badgeCount: this.props.badgeCount
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

        
        const invites = <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <IconBadge
                                MainElement={
                                    <Button vertical onPress={() => this.clickOnInvites()}>
                                        <Icon name="mail-open" />
                                        <Text>Invites</Text>
                                    </Button>
                                }
                                BadgeElement={
                                    // <Text style={{ color: '#FFFFFF' }}>{this.state.badgeCount}</Text>
                                    <Text style={{ color: '#FFFFFF' }}>{this.props.badgeCount}</Text>
                                }
                                IconBadgeStyle={
                                    {
                                        width: 15,
                                        height: 20,
                                        backgroundColor: 'red',
                                        marginRight: 20,
                                    }
                                }
                                Hidden={this.props.badgeCount === 0}
                                // Hidden={this.state.badgeCount === 0}
                            />
                        </View>

        const fav = <Button vertical onPress={() => this.clickOnFav()}>
                        <Icon name="heart" />
                        <Text>Fav</Text>
                    </Button>


        return (
            <Footer>
                {/* {displayTabs} */}
                <FooterTab>
                    {home}
                    {/* {search} */}
                    {invites}
                    {fav}
                </FooterTab>
            </Footer>
        );
    }
}

export default withNavigation(FooterTabs);