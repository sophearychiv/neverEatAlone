import React from 'react';
import {Text, View, TextInput} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "Seattle, WA 98161",
            category: "italian, thai",
        };
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
        return (
            <Container>
                <View style={styles.searchTextSection}>
                    <Header>
                        <Text style={styles.header}>Search Restaurants</Text>
                    </Header>
                    <Content>
                        <Form>
                            <Item fixedLabel>
                                <Label>Location</Label>
                                <Input 
                                    // placeholder="Seattle, WA 98161"
                                    value={this.state.location}
                                    onChangeText={val => this.updateLocationState(val)}
                                />
                            </Item>
                            <Item fixedLabel>
                                <Label>Categories</Label>
                                <Input 
                                    // placeholder="thai, italian"
                                    value={this.state.category}
                                    onChangeText={val => this.updateCategoryState(val)}
                                />
                            </Item>
                        </Form>
                    </Content>
                </View>
                <View style={styles.submitButton}>
                        <Button 
                            primary
                            onPress={() => this.props.updateSearch(this.state.location, this.state.category)}
                        >
                            <Text style={styles.submitText}> Submit </Text>
                        </Button>
                </View>
            </Container>
            
                
        );
    }
}

const styles = {
    header: {
        color: "white",
        textAlignVertical: "center"
    },
    searchTextSection: {
        width: '100%',
        height: '30%'
    },
    submitText: {
        color: "white",
        textAlign: "center"
    },
    submitButton: {
        width: '100%',
        height: '30%',
        justifyContent: "center",
        // alignItems: "center"
    }
}

export default SearchBar;
