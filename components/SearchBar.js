import React from 'react';
import {Text, View, TextInput} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "Seattle, WA 98161",
            category: null,
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
                                    placeholder="Seattle, WA 98161"
                                    value={this.state.location}
                                    onChangeText={val => this.updateLocationState(val)}
                                />
                            </Item>
                            <Item fixedLabel>
                                <Label>Categories</Label>
                                <Input 
                                    placeholder="thai, italian"
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
// import {Button, DefaultInput, View, Label} from 'react-native';
// import { 
//     Container, 
//     Header, 
//     Content, 
//     Form, 
//     Item, 
//     Input, 
//     // Label,
//     Text,
//         } from 'native-base';

// class SearchBar extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         location: "1215 4th Ave #1050, Seattle, WA 98161",
    //         category: null,
    //         distance: null,
    //         openNow: true
    //     };
    // }

//     updateInputState = (prevState, newState) => {

//     }

//     render() {
//         return (
//             <View>
//                 <View>
//                     {/* <Label>Location</Label> */}
//                     <DefaultInput
//                         placeholder="1215 4th Ave #1050, Seattle, WA 98161"
//                         value={this.state.location}
//                         onChangeText={val => this.updateInputState(this.state.location, val)}
//                     />
//                 </View>
//             </View>

//             // <View>
//             // {/* // <Container> */}
//             //     <Header>
//             //         <Text style={styles.header}>Search Restaurants</Text>
//             //     </Header>
//             //     {/* <Content> */}
//             //         {/* <Form> */}
//             //             <View>
//             //                 <Label>Location</Label>
//             //                 <DefaultInput
//             //                     placeholder="1215 4th Ave #1050, Seattle, WA 98161"
//             //                     value={this.state.location}
//             //                     onChangeText={val => this.updateInputState(this.state.location, val)}
//             //                 />
//             //             </View>
//             //             {/* <Item fixedLabel>
//             //                 <Label>Location</Label>
//             //                 <DefaultInput
//             //                     placeholder="1215 4th Ave #1050, Seattle, WA 98161"
//             //                     value={this.state.location}
//             //                     onChangeText={val => this.updateInputState(this.state.location, val)}
//             //                 />
//             //             </Item> */}
//             //             <View>
//             //                 <Label>Category</Label>
//             //                 <DefaultInput
//             //                     placeholder="thai"
//             //                     value={this.state.category}
//             //                     onChangeText={val => this.updateInputState(this.state.category, val)}
//             //                 />
//             //             </View>
//             //             {/* <Item fixedLabel last>
//             //                 <Label>Category</Label>
//             //                 <DefaultInput
//             //                     placeholder="thai"
//             //                     value={this.state.category}
//             //                     onChangeText={val => this.updateInputState(this.state.category, val)}
//             //                 />
//             //             </Item> */}
//             //             <View>
//             //                 <Label>Distance</Label>
//             //                 <DefaultInput
//             //                     placeholder="5"
//             //                     value={this.state.distance}
//             //                     onChangeText={val => this.updateInputState(this.state.distance, val)}
//             //                 />
//             //             </View>
//             //             {/* <Item fixedLabel last> */}
//             //                 {/* <Label>Distance</Label>
//             //                 <DefaultInput
//             //                     placeholder="5"
//             //                     value={this.state.distance}
//             //                     onChangeText={val => this.updateInputState(this.state.distance, val)}
//             //                 /> */}
//             //             {/* </Item> */}
//             //             {/* <Button title="Search"/> */}

//             //         {/* </Form> */}
//             //     {/* </Content> */}
//             // {/* // </Container> */}
//             // </View>
//         );
//     }
// }



// export default SearchBar;