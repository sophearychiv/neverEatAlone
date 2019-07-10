import React from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import Restaurant from './Restaurant';
import { Card, ListItem, Button, Icon } from 'react-native-elements';



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

    fetchData() {
        const CONFIG = require('../secrets.json');

        const config = {
            headers: {
                Authorization: `Bearer ${CONFIG.API_KEY}`,
            },
            params: {
                term: 'restaurants',
                raduis: 5,
                location: "210 169th st se, bothell was 98012",
                // eslint-disable-next-line camelcase
                sort_by: 'distance',
                limit: 5
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
    render() {

        let restCards;

        if (this.state.rests) {
            restCards = this.state.rests.map((rest, i) => {
                return [<Restaurant
                            key={i}
                            name={rest.name}
                            imageUrl={rest.image_url}
                            />]
            })
        }

        return (
            <Card title="Restaurants">
                    {restCards}
            </Card>
        );
    }
}

export default SearchRestaurants;