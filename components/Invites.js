import React from 'react';
// import { View } from 'react-native';
import FooterTabs from './FooterTabs';
import axios from 'axios';
import InviteCard from './InviteCard';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content, Text, View, Accordion, List } from 'native-base';



class Invites extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            invites: []
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

                console.log(response.data.data);
            })
            .catch(error => {
                console.log("error requesting invites in Invites component");
            })
    }

    
       

    render() {

        console.log("this.state.invites: " + JSON.stringify(this.state.invites));

        const invites = this.state.invites.map( (invite, i) => {
            return (
                <InviteCard
                    key={i}
                    invite={invite}
                />
            )
        });
        return (
            <Container>
                {/* {invites} */}
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
{/* <br /> */}

export default Invites;