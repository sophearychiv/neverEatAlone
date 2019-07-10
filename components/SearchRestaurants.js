import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import Restaurant from './Restaurant';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import SearchBar from './SearchBar';
import { Header } from 'native-base';



class SearchRestaurants extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rests : [],
            message: 'something'
        };
    }

    async componentDidMount() {
        await this.fetchData();
      }

    fetchData(location, category) {
        const CONFIG = require('../secrets.json');

        const config = {
            headers: {
                Authorization: `Bearer ${CONFIG.API_KEY}`,
            },
            params: {
                term: 'restaurants',
                location: location,
                // eslint-disable-next-line camelcase
                sort_by: 'distance',
                categories: category,
                limit: 7
            }
        };
        return axios.get('https://api.yelp.com/v3/businesses/search', config)
                    .then(response => {
                        this.setState({
                            rests: response.data.businesses.map(rest => rest),
                            message: 'success'
                        });
                    })
                    .catch(error => {
                        this.setState({
                            message: error
                        })
                    });
    }

    search = (location, category) => {
        this.fetchData(location, category);
    }
    render() {

        let restCards;

        if (this.state.rests.length !== 0) {
            restCards = this.state.rests.map((rest, i) => {
                return [<Restaurant
                            key={i}
                            name={rest.name}
                            imageUrl={rest.image_url}
                            />]
            });
            return (
                <View>
                    <Header>
                        <Text style={styles.header}> Restaurants Found </Text>
                    </Header>
                    {restCards}
                </View>
                );
        } else {
            return (<SearchBar updateSearch={this.search}/>);
        }
    }
}

const styles = StyleSheet.create({
    header: {
        color: "white",
        textAlignVertical: "center"
    }
})

export default SearchRestaurants;