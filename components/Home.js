import React from 'react';
import { StyleSheet, AsyncStorage, View, ImageBackground } from 'react-native';
import { Drawer } from 'native-base';
import SideBar from './SideBar';
import { AppLoading } from "expo";
import * as Font from 'expo-font'
import {
    Thumbnail,
    Button,
    Text,
    Container,
    Card,
    CardItem,
    Body,
    Content,
    Header,
    Title,
    Left,
    Icon,
    Right
} from 'native-base';
import FooterTabs from './FooterTabs';
import axios from 'axios';
import SearchRestaurants from './SearchRestaurants';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            me: null,
            fbId: null,
            name: null,
            photoUrl: null,
            loading: true,
            isLoggedIn: false,
            pendingInvites: this.props.navigation.getParam("pendingInvites") || [],
            seenPendingInvites: this.props.navigation.getParam("seenPendingInvites") || []
        }
        this.getToken();
    }


    async getToken() {

        await AsyncStorage.getItem('access_token')
            .then(response => {
                const userInfo = JSON.parse(response);
                this.setState({
                    fbId: userInfo.id,
                    isLoggedIn: true,
                    name: userInfo.name,
                    photoUrl: userInfo.picture.data.url,
                    me: {
                        fbId: userInfo.id,
                        name: userInfo.name,
                        photoUrl: userInfo.picture.data.url,
                    }
                });
                return userInfo;
            })
            .then(userInfo => {
                this.getPendingInvites(userInfo.id);
                // this.getReadPendingInvites(userInfo);
            })
            .catch(error => {
                console.log(error);
            });
    }

    getPendingInvites = async (fbId) => {
        const IN_USE_HTTP = require("../internet.json").IN_USE_HTTP
        await axios.get(IN_USE_HTTP + "/users/" + fbId + "/invites/received")
            .then(response => {
            console.log("getting pending invites in Home", response.data.data);

                this.setState({
                    pendingInvites: response.data.data,
                });
            })
            .then(response => {
                this.getSeenPendingInvites(this.state.fbId);
            })

            .catch(error => {
                console.log("error requesting invites in Invites component");
            })
    }

    getSeenPendingInvites = async (fbId) => {
        const IN_USE_HTTP = require("../internet.json").IN_USE_HTTP
        await axios.get(IN_USE_HTTP + "/users/" + fbId + "/pendingInvites/seen")
            .then(response => {
                console.log("getting seen invites in Home", response.data.data);

                this.setState({
                    seenPendingInvites: response.data.data,
                });
            })
            
            .catch(error => {
                console.log("error requesting invites in Invites component");
            })
    }


    async UNSAFE_componentWillMount() {
        await Font.loadAsync({
            Roboto: require("../node_modules/native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ loading: false });
    }

    closeDrawer = () => {
        this.drawer._root.close()
    }

    openDrawer = () => {
        this.drawer._root.open()
    }


    async logout() {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render() {
        console.log(this.state);
        const { navigate } = this.props.navigation;

        if (this.state.loading) {
            return (
                <View><AppLoading /></View>
            );
        }

        let badgeCount;
        if(this.props.navigation.getParam("pendingInvites") && this.props.navigation.getParam("seenPendingInvites")){
            badgeCount = this.props.navigation.getParam("pendingInvites").length - this.props.navigation.getParam("seenPendingInvites").length
        }else{
            badgeCount = this.state.pendingInvites.length - this.state.seenPendingInvites.length
        }
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar
                    navigator={this.navigator}
                    logout={() => this.logout()}
                    isLoggedIn={this.state.isLoggedIn}
                />}
                onClose={() => this.closeDrawer()}
            >

                <Container>

                    <Header style={{backgroundColor: "#00deff", marginBottom: 20}}>
                        <Button
                            transparent
                            onPress={() => this.openDrawer()}
                        >
                            <Icon name="menu" />
                        </Button>
                        <Body>
                            <Title>Never Eat Alone</Title>
                        </Body>
                        <Right>
                            <Thumbnail style={{ marginBottom: 20 }} size={80} source={{ uri: this.state.photoUrl }} />
                        </Right>

                    </Header>

                    <ImageBackground
                        source={require("../assets/Logo_512.png")}
                        style={{ width: 150, height: 150, marginBottom: 50, marginTop: 20, alignSelf: "center" }}
                    >
                    </ImageBackground>

                    <Text style={{textAlign: "center", fontSize: 20, marginBottom: 20}}> Let's find a great restaurant!</Text>

                    <SearchRestaurants
                        loggedInUserId={this.state.fbId}
                        me={this.state.me}
                        badgeCount={badgeCount}
                    />
                   
                </Container>
                <FooterTabs 
                    fbId={this.state.fbId}
                    me={this.state.me}
                    badgeCount={badgeCount}
                 />

            </Drawer>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nav: {
        marginTop: 50
    }
});

export default Home;