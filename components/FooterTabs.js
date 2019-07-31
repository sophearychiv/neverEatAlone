import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import Badge from './Badge';
import IconBadge from 'react-native-icon-badge';
import { View, AsyncStorage } from 'react-native';
import axios from 'axios';

const IN_USE_HTTP = require("../internet.json").IN_USE_HTTP


class FooterTabs extends Component {

    constructor(props) {
        super(props);

        // const badgeCount = this.props.pendingInvites.length - this.props.readPendingInvites.length
        this.state = {
            // currentTab: "home",
            badgeCount: props.badgeCount || 0,
            readInvites: props.readPendingInvites || [],
            pendingInvites: props.pendingInvites || []
            // badgeCount: 0
        }

        console.log("footertabs initiated");
        // this.getReadInvites();
        // this.getToken();
    }


    // componentDidUpdate(){
    //     if(this.state.readInvites !== prevState.readInvites){
    //         this.getToken();
    //     }
    // }

    // async componentDidMount(){
    //     await this.getReadInvites();
    // }

    async getToken() {

        await AsyncStorage.getItem('access_token')
            .then(response => {
                const userInfo = JSON.parse(response);
                this.setState({
                    fbId: userInfo.id,
                    isLoggedIn: true,
                    name: userInfo.name,
                    photoUrl: userInfo.picture.data.url
                });
                return userInfo;
            })
            .then(userInfo => {
                this.getPendingInvites(userInfo);
                // this.getReadPendingInvites(userInfo);
            })
            .catch(error => {
                console.log(error);
            });
    }

    getPendingInvites = async (userInfo) => {
        const IN_USE_HTTP = require("../internet.json").IN_USE_HTTP
        axios.get(IN_USE_HTTP + "/users/" + userInfo.id + "/invites/received")
            .then(response => {
                this.setState({
                    pendingInvites: response.data.data,
                });
                console.log("pending invites in FooterTabs: " + JSON.stringify(response.data.data));

                return response.data.data
            })
            .then(pendingInvites => {
                console.log("fbId in FooterTab: " + userInfo.fbId);
                console.log("fbId in state in FooterTab: " + this.state.fbId);

                axios.get(IN_USE_HTTP + "/users/" + this.state.fbId + "/invites/read")
                    .then(response => {
                        console.log("read invites in FooterTabs: " + JSON.stringify(response));
                        if(response.data.data.length < pendingInvites.length){
                            this.setState({
                                badgeCount: pendingInvites.length - response.data.data.length,
                                readInvites: response.data.data
                            })
                        }
                    })
                    .catch(error => {
                        console.log("error getting read invites in FooterTabs: " + error);
                    })
            })

            .catch(error => {
                console.log("error requesting invites in FooterTabs component: " + error);
            })
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
            badgeCount: 0,
            // badgeCount: this.state.badgeCount,
            readPendingInvites: this.state.readInvites,
            pendingInvites: this.state.readInvites
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
        console.log("badeCount in FooterTabs: " + this.props.badgeCount);


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