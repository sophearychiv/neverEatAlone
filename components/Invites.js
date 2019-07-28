import React from 'react';
// import { View } from 'react-native';
import FooterTabs from './FooterTabs';
import axios from 'axios';
import InviteCard from './InviteCard';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text, View, Accordion, List, ActionSheet } from 'native-base';

const IN_USE_HTTP = require("../internet.json").IN_USE_HTTP


class Invites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            invites: [],
        }
        this.getInvites();
    }

    async componentDidMount() {
        await this.getInvites();
    }

    getInvites = async () => {
        const IN_USE_HTTP = require("../internet.json").IN_USE_HTTP
        axios.get(IN_USE_HTTP + "/users/" + this.props.navigation.getParam("fbId") + "/invites")
            .then(response => {
                this.setState({
                    invites: response.data.data
                });

            })
            .catch(error => {
                console.log("error requesting invites in Invites component");
            })
    }

    deleteInvite = (invite) => {
        axios.delete(IN_USE_HTTP + "/invites/" + invite.inviteId + "/receipients/" + invite.receipientFbId)
            
            .then(response => {

                const invites = this.state.invites;
                for(i = 0; i< invites.length; i++){
                        if(invites[i]===invite){
                        invites.splice(i, 1);
                        this.setState({
                            invites
                        });
                        break;
                    }
                }

            })
            .catch(error => {
                console.log("error deleting invite in Invites: " + error)
            })
    }

    render() {
        console.log("this.state.invites: " + this.state.invites);


        const invites = this.state.invites.map( (invite, i) => {
            return (
                <InviteCard
                    key={i}
                    invite={invite}
                    deleteInviteCallback={(invite) => this.deleteInvite(invite)}
                />
            )
        });
        return (
            <Container>
                <Segment>
                    <Button first>
                        <Text>Received</Text>
                    </Button>
                    <Button active>
                        <Text>Sent</Text>
                    </Button>
                    <Button last>
                        <Text>Confirmed</Text>
                    </Button>
                </Segment>
                <Content padder>
                    <List>
                        {invites}
                    </List>
                    
                </Content>
                <FooterTabs />
            </Container>
        );
    }
}

export default Invites;