import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
class FooterTabs extends Component {

    state = {
        activeHome: false,
        activeSearch: false,
        activeInvites: false,
        activeFav: false
    }

    clickOnHome = () => {
        this.props.navigation.navigate("Home");

        this.setState({
            activeHome: true,
            activeSearch: false,
            activeInvites: false,
            activeFav: false
        });

    }

    clickOnSearch = () => {
        this.props.navigation.navigate("SearchRestaurants");

        this.setState({
            activeHome: false,
            activeSearch: true,
            activeInvites: false,
            activeFav: false
        });

    }

    clickOnInvites = () => {
        this.props.navigation.navigate("Invites");

        this.setState({
            activeHome: false,
            activeSearch: false,
            activeInvites: true,
            activeFav: false
        });

    }

    clickOnFav = () => {
        console.log(" fbId in footertabs: " + this.props.fbId);
        this.props.navigation.navigate("Interests", {
            fbId: this.props.fbId,
        });

        this.setState({
            activeHome: false,
            activeSearch: false,
            activeInvites: false,
            activeFav: true
        });

    }
    render() {

        const home = this.state.activeHome ?
            <Button vertical active onPress={() => this.clickOnHome()}>
                <Icon name="home" />
                <Text>Home</Text>
            </Button>
            : <Button vertical onPress={() => this.clickOnHome()}>
                <Icon name="home" />
                <Text>Home</Text>
            </Button>

        const search = this.state.activeSearch ?
            <Button vertical active onPress={() => this.clickOnSearch()}>
                <Icon name="search" />
                <Text>Search</Text>
            </Button>
            : <Button vertical onPress={() => this.clickOnSearch()}>
                <Icon name="search" />
                <Text>Search</Text>
            </Button>
        const invites = this.state.activeInvites ?
            <Button vertical active onPress={() => this.clickOnInvites()}>
                <Icon name="mail-open" />
                <Text>Invites</Text>
            </Button>
            : <Button vertical onPress={() => this.clickOnInvites()}>
                <Icon name="mail-open" />
                <Text>Invites</Text>
            </Button>

        const fav = this.state.activeFav ?
            <Button vertical active onPress={() => this.clickOnFav()}>
                <Icon name="heart" />
                <Text>Fav</Text>
            </Button>
            : <Button vertical onPress={() => this.clickOnFav()}>
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