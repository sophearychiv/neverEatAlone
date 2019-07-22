import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';
import Restaurant from './Restaurant';
import SearchBar from './SearchBar';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';

import RestDetails from './RestDetails';

class SearchRestaurants extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rests : [],
            message: 'something',
            location: "Seattle, WA 98161",
            category: "italian, thai",
            restsOfInterest: this.props.navigation.getParam("restsOfInterest")
        };
    }

    async componentDidMount() {
        await this.fetchData();
      }

    async fetchData(location, category) {
        const CONFIG = require('../secrets.json');

        const config = {
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
                            // restsOfInterest: this.props.navigation.getParam("restsOfInterest")
                        });
                    })
                    .catch(error => {
                        this.setState({
                            message: error
                        })
                    });
    }

    search = (location, category) => {
        category = category.toLowerCase();
        this.fetchData(location, category);
        // this.props.navigation.navigate("RestList", {
        //     rests: this.state.rests,
        //     loggedInUserId: this.props.navigation.getParam("loggedInUserId"),
        //     // restsOfInterest: this.props.navigation.getParam("restsOfInterest")
        // });
        console.log("rests in SearchRestaurants: " + this.state.rests);
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
        console.log("loggedInUser in SearchRestaurants is " + this.props.navigation.getParam("loggedInUserId"));
        console.log("restsOfInterest in SearchRestaurants is " + this.props.navigation.getParam("restsOfInterest"));
        const {navigate} = this.props.navigation;
        return(
            <Container>
                <Content>
                    <Form>
                        <Item fixedLabel>
                            <Label>Location</Label>
                            <Input 
                                value={this.state.location}
                                onChangeText={val => this.updateLocationState(val)}
                            />
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
    }
})

export default SearchRestaurants;