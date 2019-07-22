import React from 'react';
import {StyleSheet, AsyncStorage, View} from 'react-native';
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
import axios from 'axios';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fbId: null,
            name: null,
            photoUrl: null,
            loading: true,
            isLoggedIn: false,
            // restsOfInterest: []
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
            // .then(userInfo => {
            //     console.log("userid is " +userInfo.id);
            //     return axios.get("http://localhost:4567/users/" + userInfo.id + "/interests")
            // })
            // .then(interestResponse => {
            //     console.log("interest response " + JSON.stringify(interestResponse.data.data));
            //     // return interestResponse;
            //     this.setState({
            //         restsOfInterest: interestResponse.data.data
            //     });
            // })
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
    };

    openDrawer = () => {
        this.drawer._root.open()
    };


    async logout() {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render() {
        console.log(this.state);
        const {navigate} = this.props.navigation;

        if (this.state.loading) {
            return (
            <View><AppLoading/></View>
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
                    <Left>
                        <Button
                        transparent
                        onPress={() => this.openDrawer()}
                        >
                        <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Home</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Thumbnail size={80} source={{uri: this.state.photoUrl}} />
                    <Card>
                        <CardItem>
                        <Body>
                            <Text style={{alignSelf: "center"}}>Never Eat Alone!</Text>
                        </Body>
                        </CardItem>
                    </Card>
                    <Button
                        full
                        rounded
                        dark
                        style={{ marginTop: 10 }}
                        onPress={() => navigate("SearchRestaurants", {
                            loggedInUserId: this.state.fbId,
                            restsOfInterest: this.state.restsOfInterest
                        })}
                    >
                        <Text>Search Restaurants</Text>
                    </Button>
                    <Button
                        full
                        rounded
                        success
                        style={{ marginTop: 10 }}
                        onPress={() => navigate("SearchPeople")}
                    >
                        <Text>Search People</Text>
                    </Button>
                    <Button
                        full
                        rounded
                        primary
                        style={{ marginTop: 10 }}
                        onPress={() => {
                            /* 1. Navigate to the Profile route with params */
                            navigate('Profile', {
                                name: this.state.name,
                                photoUrl: this.state.photoUrl,
                            });
                            }}
                    >
                        <Text>Go to Profile</Text>
                    </Button>
                </Content>
            </Container>
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