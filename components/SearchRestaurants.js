import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';
import Restaurant from './Restaurant';
import SearchBar from './SearchBar';
import { Header } from 'native-base';
import RestDetails from './RestDetails';



class SearchRestaurants extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rests : [],
            selectedRest: null,
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
                limit: 8
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

    onItemSelected = (id) => {
        const selectedRest = this.state.rests.find(rest => rest.id === id);
        this.setState({
            selectedRest
        });
    }
    render() {
        let restCards;


        if (this.state.selectedRest) {
            return (
                <RestDetails rest={this.state.selectedRest}/>
            );
        } else if (this.state.rests.length !== 0) {
            restCards = this.state.rests.map((rest, i) => {
                return (
                        <Restaurant
                            key={i}
                            id={rest.id}
                            name={rest.name}
                            imageUrl={rest.image_url}
                            categories={rest.categories}
                            distance={rest.distance}
                            onItemPressed={() => this.onItemSelected(rest.id)}
                            selectedRest={this.state.selectedRest}
                        />
                );
            });
            return (
                <View>
                    <ScrollView>

                        <Header>
                            <Text style={styles.header}> Restaurants Found </Text>
                        </Header>
                        {restCards}
                    </ScrollView>
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
    },
    listContainer: {
        width: "100%"
    }
})

export default SearchRestaurants;