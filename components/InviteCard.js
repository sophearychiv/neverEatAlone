import React from 'react';
import {View} from 'react-native';
import axios from 'axios';
import {ListItem, Left, Right, Body, Thumbnail, Text, Button} from 'native-base';

class InviteCard extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: null,
            photoUrl: null,
            invitedName: null,
            invitedPhotoUrl: null
        }
    }

    async componentDidMount(){
        await this.getUsers();
    }

    getUsers = async () =>{
        const IN_USE_HTTP = require("../internet.json").IN_USE_HTTP
        axios.get(IN_USE_HTTP + "/users/" + this.props.invite.receipientFbId)
            .then(response => {
                this.setState({
                    invitedName: response.data.data.firstName,
                    invitedPhotoUrl: response.data.data.photoUrl
                })
            })
    }
    render(){
        return (
            <ListItem avatar>
              <Body>
                <Text>Yout sent an invite to {this.state.invitedName}</Text>
                <View>
                    <Text note>on {this.props.invite.creationDate}</Text>
                    <Button small danger style={{width: 80}}><Text style={{textAlign: "center"}}>Cancel</Text></Button>
                </View>
              </Body>
              <Right>
                <Thumbnail source={{ uri: this.state.invitedPhotoUrl }} />
              </Right>
            </ListItem>
        );
    }
}

export default InviteCard;