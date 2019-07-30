import React, {Fragment} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';
import Restaurant from './Restaurant';
import SearchBar from './SearchBar';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import FooterTabs from './FooterTabs';
import RestDetails from './RestDetails';
import SearchableDropdown from 'react-native-searchable-dropdown';

class SearchRestaurants extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rests : [],
            message: 'something',
            location: "Current Location",
            // location: "Seattle, WA 98161",
            category: "italian, thai",
            // restsOfInterest: this.props.navigation.getParam("restsOfInterest")
        };
    }

    async componentDidMount() {
        await this.fetchData();
      }

    async fetchData(category, location, latitude, longitude) {
        const CONFIG = require('../secrets.json');
        let config = null;
        if (location != null){
            config = {
                headers: {
                    Authorization: `Bearer ${CONFIG.YELP_API_KEY}`,
                },
                params: {
                    term: 'restaurants',
                    location: location,
                    // eslint-disable-next-line camelcase
                    sort_by: 'distance',
                    categories: category,
                    limit: 15
                }
            };
        } else {
            config = {
                headers: {
                    Authorization: `Bearer ${CONFIG.YELP_API_KEY}`,
                },
                params: {
                    term: 'restaurants',
                    latitude: latitude,
                    longitude: longitude,
                    // eslint-disable-next-line camelcase
                    sort_by: 'distance',
                    categories: category,
                    limit: 15
                }
            };
        }
        return axios.get('https://api.yelp.com/v3/businesses/search', config)
                    .then(response => {
                        const restList = response.data.businesses.map(rest => rest);
                        this.setState({
                            rests: restList,
                            message: 'success'
                        });
                        console.log("loggedInUser in SearchRestaurants is " + this.props.navigation.getParam("loggedInUser", "default user"));
                        this.props.navigation.navigate("RestList", {
                            rests: restList,
                            loggedInUserId: this.props.navigation.getParam("loggedInUserId"),
                        });
                    })
                    .catch(error => {
                        console.log("error searching for rests: " + error);
                    });
    }

    search = (location, category) => {
        category = category.toLowerCase();
        if (location != "" && location != "Current Location") {
            this.fetchData(category, location);
            console.log("rests in SearchRestaurants: " + this.state.rests);
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    this.fetchData(category, null, latitude, longitude);
                },
                (error) => this.setState({ error: error.message }),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
                );
            }
    }

    updateLocationState = (val) => {
        this.setState({
            location: val
        });
    }

    updateCategoryState = (val) => {
        this.setState({
            category: val
        });
    }

    render() {
        this.items = [
            {id: 1,
            name: 'Current Location'}
        ];
        console.log("loggedInUser in SearchRestaurants is " + this.props.navigation.getParam("loggedInUserId"));
        console.log("restsOfInterest in SearchRestaurants is " + this.props.navigation.getParam("restsOfInterest"));
        const {navigate} = this.props.navigation;
        return(
            <Container>
                <Content>
                    <Form>
                        {/* <Item fixedLabel>
                            <Label>Location</Label>
                            <Input 
                                value={this.state.location}
                                onChangeText={val => this.updateLocationState(val)}
                            />
                        </Item> */}
                        <Item fixedLabel>
                            <Label>Location:</Label>
                            <Fragment>
                            <SearchableDropdown
                                onItemSelect={(item) => {
                                }}
                                containerStyle={{ padding: 5 }}
                                onRemoveItem={(item, index) => {
                                }}
                                itemStyle={{
                                padding: 5,
                                marginTop: 1,
                                backgroundColor: '#fff',
                                borderColor: '#bbb',
                                borderWidth: 1,
                                borderRadius: 5,
                                width: 250
                                }}
                                itemTextStyle={{ color: '#222' }}
                                itemsContainerStyle={{ maxHeight: 140 }}
                                items={this.items}
                                defaultIndex={2}
                                resetValue={false}
                                textInputProps={
                                {
                                    placeholder: "placeholder",
                                    underlineColorAndroid: "transparent",
                                    style: {
                                        padding: 5,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 5,
                                        width: 250
                                    },
                                    onTextChange: text => {
                                        this.updateLocationState(text);
                                    }
                                }
                                }
                                listProps={
                                {
                                    nestedScrollEnabled: true,
                                }
                                }
                            />
                            </Fragment>
                        </Item>
                        <Item fixedLabel>
                            <Label>Categories</Label>
                            <Input 
                                value={this.state.category}
                                onChangeText={val => this.updateCategoryState(val)}
                            />
                        </Item>
                        <Button
                            primary
                            style={styles.submitButton}
                            onPress={() => this.search(this.state.location, this.state.category)}
                        >
                            <Text style={styles.submitText}> Submit </Text>
                        </Button>
                    </Form>
                </Content>
                <FooterTabs/>
            </Container>
        );
          
    }
}


const styles = StyleSheet.create({
    header: {
        color: "white",
        textAlignVertical: "center"
    },
    listContainer: {
        width: "100%"
    },
    submitButton: {
        marginTop: 20,
        alignSelf: "center",
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: "#00deff"
    },
    submitText: {
        color: "white",
        fontWeight: "bold"
    }
})

export default SearchRestaurants;