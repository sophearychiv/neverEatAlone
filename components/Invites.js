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
            seenPendingInvites: [],
            currentlyChecking: "received"
        }
        this.getReceivedInvites();
        this.markPendingInvitesSeen();
    }

    async componentDidMount() {
        // await this.getConfirmedInvites();
        await this.getReceivedInvites();
        await this.markPendingInvitesSeen();
    }

    markPendingInvitesSeen = async () => {
        axios.put(IN_USE_HTTP + "/receipients/" + this.props.navigation.getParam("me").fbId + "/pendingInvites/seen")
        
            .then(response => {
                this.setState({
                    seenPendingInvites: this.props.navigation.getParam("pendingInvites"),
                    badgeCount: 0
                })
            })
            .catch(error => {
                console.log("error making put request: " + error);
            })
    }

    getReceivedInvites = async () => {
        const IN_USE_HTTP = require("../internet.json").IN_USE_HTTP
        axios.get(IN_USE_HTTP + "/users/" + this.props.navigation.getParam("me").fbId + "/invites/received")
        // axios.get(IN_USE_HTTP + "/users/" + this.props.navigation.getParam("fbId") + "/invites/received")
            .then(response => {
                this.setState({
                    invites: response.data.data,
                });

            })
            .catch(error => {
                console.log("error requesting invites in Invites component");
            })
    }

    getConfirmedInvites = async() => {
        const IN_USE_HTTP = require("../internet.json").IN_USE_HTTP
        axios.get(IN_USE_HTTP + "/users/" + this.props.navigation.getParam("me").fbId + "/invites/going")
        // axios.get(IN_USE_HTTP + "/users/" + this.props.navigation.getParam("fbId") + "/invites/going")
            .then(response => {
                this.setState({
                    invites: response.data.data,
                });

            })
            .catch(error => {
                console.log("error requesting invites in getConfirmedInvites function in Invites component");
            })
    }

    handleReceivedInvites = () => {
        this.setState({
            currentlyChecking: "received"
        });

        this.getReceivedInvites();
    }

    handleConfirmedInvites = () => {
        this.setState({
            currentlyChecking: "confirmed"
        });
        this.getConfirmedInvites();
    }

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

    declineInvite = (invite) => {

        axios.put(IN_USE_HTTP + "/receipients/" + invite.receipientFbId + "/requesters/" + invite.requesterFbId + "/invites/" + invite.inviteId + "/status/declined")
        
            .then(response => {
                const invites = this.state.invites.filter(currentInvite => currentInvite !== invite);
                this.setState({
                    invites
                })
                alert("You have declined the invite!");
            })
            .catch(error => {
                console.log("error making put request: " + error);
            })
    }

    acceptInvite = (invite) => {

        axios.put(IN_USE_HTTP + "/receipients/" + invite.receipientFbId + "/requesters/" + invite.requesterFbId + "/invites/" + invite.inviteId + "/status/accepted")
        
            .then(response => {
                const invites = this.state.invites.filter(currentInvite => currentInvite !== invite);
                this.setState({
                    invites
                })
                alert("The invite has been moved to Confirmed segment!");
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
                    userFbId={this.props.navigation.getParam("me").fbId}
                    // userFbId={this.props.navigation.getParam("fbId")}
                    invite={invite}
                    deleteInviteCallback={(invite) => this.deleteInvite(invite)}
                    currentlyChecking={this.state.currentlyChecking}
                    acceptInviteCallback={()=> this.acceptInvite(invite)}
                    declineInviteCallback={()=> this.declineInvite(invite)}
                    badgeCount={0}
                    me={this.props.navigation.getParam("me")}
                />
        });

        let segment;

        if (this.state.currentlyChecking === "received") {
            segment = <Segment>
                <Button first active onPress={() => this.handleReceivedInvites()}>
                    <Text>Pending</Text>
                </Button>

                <Button last onPress={() => this.handleConfirmedInvites()}>
                    <Text>Confirmed</Text>
                </Button>
            </Segment>
        }

        if (this.state.currentlyChecking === "confirmed") {
            segment = <Segment>
                        <Button first onPress={() => this.handleReceivedInvites()}>
                            <Text>Pending</Text>
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
                <FooterTabs 
                    badgeCount={0}
                    // pendingInvites={}
                    seenPendingInvites={this.state.seenPendingInvites}
                    me={this.props.navigation.getParam("me")}
                />
            </Container>
        );
    }
}

export default Invites;