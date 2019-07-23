import React from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, CheckBox } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
class PeopleCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: null,
            photoUrl: null
        }

        // this.getUser();

    }

    // async componentDidMount(){
    //     await this.getUser();
    // }

    // getUser = async() => {
    //     return axios.get("http://172.24.26.244:4567/users/" + this.props.fbId)
            
    //                 .then(response => {
    //                     this.setState({
    //                         name: response.data.data.firstName,
    //                         photoUrl: response.data.data.photoUrl
    //                     });
    //                     console.log("response in People Card: " + JSON.stringify(response));
    //                     console.log("fbID in People Card: " + this.props.fbId);
    //                     console.log("name in people card: " + response.data.data.firstName);
    //                 })
    //                 .catch(error => {
    //                     console.log("error in PeopleCard: " + error);
    //                 })
    // }
    render(){

        console.log(this.props.name);
        return(
            // <Text>{this.props.name}</Text>

            <TouchableOpacity>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: this.props.photoUrl }} />
                    </Left>
                    <Body>
                        <Text>{this.props.name}</Text>

                        <Text note>Software Engineer</Text>
                    </Body>
                    <Right>
                        <CheckBox checked={false} />
                    </Right>
                </ListItem>
             </TouchableOpacity>
        );
    }
}

export default PeopleCard;