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
            currentlyChecking: "received"
        }
        this.getReceivedInvites();
    }

    async componentDidMount() {
        // await this.getSentInvites();
        await this.getReceivedInvites();
    }

    getSentInvites = async () => {
        const IN_USE_HTTP = require("../internet.json").IN_USE_HTTP
        axios.get(IN_USE_HTTP + "/users/" + this.props.navigation.getParam("fbId") + "/invites/sent")
            .then(response => {
                this.setState({
                    invites: response.data.data,
                });

            })
            .catch(error => {
                console.log("error requesting invites in Invites component");
            })
    }

    getReceivedInvites = async () => {
        const IN_USE_HTTP = require("../internet.json").IN_USE_HTTP
        axios.get(IN_USE_HTTP + "/users/" + this.props.navigation.getParam("fbId") + "/invites/received")
            .then(response => {
                this.setState({
                    invites: response.data.data,
                });

            })
            .catch(error => {
                console.log("error requesting invites in Invites component");
            })
    }

    handleReceivedInvites = () => {
        this.setState({
            currentlyChecking: "received"
        });

        this.getReceivedInvites();
    }

    handleSentInvites = () => {
        this.setState({
            currentlyChecking: "sent"
        });
        this.getSentInvites();
    }

    handleConfirmedInvites = () => {
        this.setState({
            currentlyChecking: "confirmed"
        });
    }

    // componentDidUpdate(prevState){
    //     if(this.state.checkingSent !== prevState.checkingSent) {
    //         this.getSentInvites();
    //     }
    // }

    deleteInvite = (invite) => {
        axios.delete(IN_USE_HTTP + "/invites/" + invite.inviteId + "/receipients/" + invite.receipientFbId)

            .then(response => {

                const invites = this.state.invites;
                for (i = 0; i < invites.length; i++) {
                    if (invites[i] === invite) {
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

    acceptInvite = (invite, status) => {

        axios.put(IN_USE_HTTP + "/receipients/ " + invite.receipientFbId + "/requesters/" + invite.requesterFbId + "/invites/" + invite.inviteId + "/status/" + status)
            .then(response => {
                alert("You have accepted the invite!")
            })
            .catch(error => {
                console.log("error making put request: " + error);
            })
    }

    render() {

        console.log(this.state);

        const invites = this.state.invites.map((invite, i) => {
            return <InviteCard
                    key={i}
                    invite={invite}
                    deleteInviteCallback={(invite) => this.deleteInvite(invite)}
                    currentlyChecking={this.state.currentlyChecking}
                    acceptInviteCallback={()=> this.acceptInvite(invite)}
                />
        });

        let segment;

        if (this.state.currentlyChecking === "received") {
            segment = <Segment>
                <Button first active onPress={() => this.handleReceivedInvites()}>
                    <Text>Received</Text>
                </Button>

                <Button onPress={() => this.handleSentInvites()}>
                    <Text>Sent</Text>
                </Button>

                <Button last onPress={() => this.handleConfirmedInvites()}>
                    <Text>Confirmed</Text>
                </Button>
            </Segment>
        }

        if (this.state.currentlyChecking === "sent") {
            segment = <Segment>
                        <Button first onPress={() => this.handleReceivedInvites()}>
                            <Text>Received</Text>
                        </Button>

                        <Button active onPress={() => this.handleSentInvites()}>
                            <Text>Sent</Text>
                        </Button>

                        <Button last onPress={() => this.handleConfirmedInvites()}>
                            <Text>Confirmed</Text>
                        </Button>
                    </Segment>
        }

        if (this.state.currentlyChecking === "confirmed") {
            segment = <Segment>
                        <Button first onPress={() => this.handleReceivedInvites()}>
                            <Text>Received</Text>
                        </Button>

                        <Button onPress={() => this.handleSentInvites()}>
                            <Text>Sent</Text>
                        </Button>

                        <Button last active onPress={() => this.handleConfirmedInvites()}>
                            <Text>Confirmed</Text>
                        </Button>
                    </Segment>
        }



        return (
            <Container>
                {segment}
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