import React from 'react';
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
            pendingInvites: [],
            readPendingInvites: [],
            // badgeCount = 0,
            currentlyChecking: "received"
        }
        // this.getReceivedInvites();
    }

    async componentDidMount() {
        await this.getReceivedInvites();
    }

    getReceivedInvites = async () => {
        const IN_USE_HTTP = require("../internet.json").IN_USE_HTTP
        axios.get(IN_USE_HTTP + "/users/" + this.props.navigation.getParam("fbId") + "/invites/received")
            .then(response => {
                this.setState({
                    //invites: response.data.data,
                    pendingInvites: response.data.data
                });

            })
            .catch(error => {
                console.log("error requesting invites in Invites component");
            })
    }

    getConfirmedInvites = async() => {
        const IN_USE_HTTP = require("../internet.json").IN_USE_HTTP
        axios.get(IN_USE_HTTP + "/users/" + this.props.navigation.getParam("fbId") + "/invites/going")
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

    // handleReadPendingInvites = (invite) => {
    //     axios.put(IN_USE_HTTP + "/receipients/" + invite.receipientFbId + "/requesters/" + invite.requesterFbId + "/invites/" + invite.inviteId + "/read_status/read")
    //         .then(response => {
    //             const readPendingInvites = this.state.readPendingInvites;
    //             readPendingInvites.push(invite);
    //                 this.setState({
    //                     readPendingInvites
    //                 })
    //         })
    //         .catch(error => {
    //             console.log("error making put request to read invite");
    //         })

        
    // }

    // getBadgeCount() {
    //     return this.state.pendingInvites.length - this.state.readPendingInvites.length;
    // }

    // getBadgeCount() {
    //     return this.props.navigation.getParam("pendingInvites").length - this.props.navigation.getParam("readPendingInvites").length;
    // }

    render() {

        const pendingInvites = this.props.navigation.getParam("pendingInvites").map((invite, i) => {
            return <InviteCard
                    key={i}
                    userFbId={this.props.navigation.getParam("fbId")}
                    invite={invite}
                    deleteInviteCallback={(invite) => this.deleteInvite(invite)}
                    currentlyChecking={this.state.currentlyChecking}
                    acceptInviteCallback={(invite)=> this.acceptInvite(invite)}
                    declineInviteCallback={()=> this.declineInvite(invite)}
                    // readPendingInvitesCallback={() => this.handleReadPendingInvites(invite)}
                    pendingInvites={this.state.invites}
                    readPendingInvites={this.props.navigation.getParam("readPendingInvites")}
                    badgeCount={this.props.navigation.getParam("badgeCount")}
                    // badgeCount={this.state.pendingInvites.length - this.props.navigation.getParam("readPendingInvites").length}
                />
        });

        let segment;
        let invites;

        if (this.state.currentlyChecking === "received") {
            segment = <Segment>
                <Button first active onPress={() => this.handleReceivedInvites()}>
                    <Text>Pending</Text>
                </Button>

                <Button last onPress={() => this.handleConfirmedInvites()}>
                    <Text>Confirmed</Text>
                </Button>
            </Segment>

            invites = pendingInvites;
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
                    readPendingInvites={this.props.navigation.getParam("readPendingInvites")}
                    pendingInvites={this.state.invites}

                    // readPendingInvites passed from FooterTabs
                    // badgeCount={this.state.invites.length - this.props.navigation.getParam("readPendingInvites").length}
                    badgeCount={this.props.navigation.getParam("badgeCount")}
                />
            </Container>
        );
    }
}

export default Invites;