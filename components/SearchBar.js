import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
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
                            <Button
                                primary
                                style={styles.submitButton}
                                onPress={() => this.props.updateSearch(this.state.location, this.state.category)}
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
    
    searchTextSection: {
        width: '100%',
        height: '30%'
    },
    submitText: {
        color: "white",
        fontSize: 20,
        // textAlignVertical: "center"
    },

    submitButton: {
        justifyContent: "center",
        // flex: 0,
        marginTop: "5%",
        width: "60%",
        alignSelf: "center",
        // alignSelf: "stretch",
        borderRadius: 5,
        textAlignVertical: "center"
    }
});

export default SearchBar;
