import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
class FooterTabs extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentTab: "home"
        }
    }
    
    // componentDidUpdate(prevState){
    //     if(this.state.currentTab != prevState.currentTab){
            
    //     }
    // }
    clickOnHome = () => {

        this.setState({
            currentTab: "home"
        });
        this.props.navigation.navigate("Home");
    }

    // clickOnSearch = () => {
    //     this.setState({
    //         currentTab: "search"
    //     });
    //     this.props.navigation.navigate("SearchRestaurants", {
    //         fbId: this.props.fbId
    //     });
    // }

    clickOnInvites = () => {
        this.props.navigation.navigate("Invites", {
            fbId: this.props.fbId,
            me: this.props.me
        });

        this.setState({
            currentTab: "invites"
        });

    }

    clickOnFav = () => {
        console.log(" fbId in footertabs: " + this.props.fbId);
        this.props.navigation.navigate("Interests", {
            fbId: this.props.fbId,
            me: this.props.me
        });

        this.setState({
            currentTab: "fav"
        });

    }
    render() {

        // let displayTabs;
        // if (this.state.currentTab === "home") {

        //     displayTabs = <FooterTab>
        //         <Button vertical active onPress={() => this.clickOnHome()}>
        //             <Icon name="home" />
        //             <Text>Home</Text>
        //         </Button>

        //         <Button vertical onPress={() => this.clickOnSearch()}>
        //             <Icon name="search" />
        //             <Text>Search</Text>
        //         </Button>

        //         <Button vertical onPress={() => this.clickOnInvites()}>
        //             <Icon name="mail-open" />
        //             <Text>Invites</Text>
        //         </Button>

        //         <Button vertical onPress={() => this.clickOnFav()}>
        //             <Icon name="heart" />
        //             <Text>Fav</Text>
        //         </Button>
        //     </FooterTab>
        // }
        
        // if (this.state.currentTab === "search"){
        //     displayTabs = <FooterTab>
        //     <Button vertical onPress={() => this.clickOnHome()}>
        //         <Icon name="home" />
        //         <Text>Home</Text>
        //     </Button>

        //     <Button vertical active onPress={() => this.clickOnSearch()}>
        //         <Icon name="search" />
        //         <Text>Search</Text>
        //     </Button>

        //     <Button vertical onPress={() => this.clickOnInvites()}>
        //         <Icon name="mail-open" />
        //         <Text>Invites</Text>
        //     </Button>

        //     <Button vertical onPress={() => this.clickOnFav()}>
        //         <Icon name="heart" />
        //         <Text>Fav</Text>
        //     </Button>
        // </FooterTab>
        // }

        const home = this.state.currentTab === "home" ?
            <Button vertical onPress={() => this.clickOnHome()}>
            {/* <Button vertical active onPress={() => this.clickOnHome()}> */}
                <Icon name="home" />
                <Text>Home</Text>
            </Button>
            : <Button vertical onPress={() => this.clickOnHome()}>
                <Icon name="home" />
                <Text>Home</Text>
            </Button>

        // const search = this.state.currentTab === "search" ?
        //     <Button vertical onPress={() => this.clickOnSearch()}>
        //     {/* <Button vertical active onPress={() => this.clickOnSearch()}> */}
        //         <Icon name="search" />
        //         <Text>Search</Text>
        //     </Button>
        //     : <Button vertical onPress={() => this.clickOnSearch()}>
        //         <Icon name="search" />
        //         <Text>Search</Text>
        //     </Button>
        const invites = this.state.currentTab === "invites" ?
            <Button vertical onPress={() => this.clickOnInvites()}>
            {/* <Button vertical active onPress={() => this.clickOnInvites()}> */}
                <Icon name="mail-open" />
                <Text>Invites</Text>
            </Button>
            : <Button vertical onPress={() => this.clickOnInvites()}>
                <Icon name="mail-open" />
                <Text>Invites</Text>
            </Button>

        const fav = this.state.currentTab === "fav" ?
            <Button vertical onPress={() => this.clickOnFav()}>
            {/* <Button vertical active onPress={() => this.clickOnFav()}> */}
                <Icon name="heart" />
                <Text>Fav</Text>
            </Button>
            : <Button vertical onPress={() => this.clickOnFav()}>
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