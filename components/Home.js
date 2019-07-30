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
            fbId: null,
            name: null,
            photoUrl: null,
            loading: true,
            isLoggedIn: false,
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
                    photoUrl: userInfo.picture.data.url
                });
                return userInfo;
            })
            .catch(error => {
                console.log(error);
            });
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

                    <Header>
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
                    
                    <SearchRestaurants
                        loggedInUserId={this.state.fbId}
                    />
                    {/* <Content padder>
                            <ImageBackground
                                source={require("../assets/Logo_512.png")}
                                style={{ width: 150, height: 150, marginBottom: 50, marginTop: 20, alignSelf: "center" }}
                            >
                            </ImageBackground>

                        <Button
                            full
                            rounded
                            style={{ marginTop: 20, backgroundColor: "#00deff" }}
                            onPress={() => navigate("SearchRestaurants", {
                                loggedInUserId: this.state.fbId,
                            })}
                        >
                            <Text style={{ color: "black" }}>Search Restaurants</Text>
                        </Button>
                    </Content> */}
                </Container>
                <FooterTabs fbId={this.state.fbId} />

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