import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { ListItem, Left, Right, Body, Thumbnail, Text, ActionSheet } from 'native-base';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import {withNavigation} from 'react-navigation';

const IN_USE_HTTP = require("../internet.json").IN_USE_HTTP

class InviteCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            photoUrl: null,
            invitedName: null,
            invitedPhotoUrl: null,
            requesterName: null,
            requesterPhotoUrl: null,
            visible: false
        }
        this.getUsers(this.props.invite);
        console.log("executed in constructor in InviteCard");
    }

    async componentDidMount() {
        await this.getUsers(this.props.invite);
        // await this.getRest();
    }

    getUsers = async (invite) => {

        let fbId;
        if (this.props.currentlyChecking === "received") {
            fbId = invite.requesterFbId
            axios.get(IN_USE_HTTP + "/users/" + fbId)
                .then(response => {
                    this.setState({
                        requesterName: response.data.data.firstName,
                        requesterPhotoUrl: response.data.data.photoUrl
                    })
                })
                .catch(error => {
                    console.log("error getting requesters in InviteCard: " + error);
                })
        } else if (this.props.currentlyChecking === "sent") {
            fbId = invite.receipientFbId
            axios.get(IN_USE_HTTP + "/users/" + fbId)
                .then(response => {
                    this.setState({
                        invitedName: response.data.data.firstName,
                        invitedPhotoUrl: response.data.data.photoUrl
                    })
                })
                .catch(error => {
                    console.log("error getting receipients in InviteCard: " + error);
                })
        } else if (this.props.currentlyChecking === "confirmed") {

            if (this.props.invite.requesterFbId === this.props.userFbId) {
                fbId = invite.receipientFbId
            } else if (this.props.invite.receipientFbId === this.props.userFbId) {
                fbId = invite.requesterFbId;
            }

            axios.get(IN_USE_HTTP + "/users/" + fbId)
                .then(response => {
                    this.setState({
                        invitedName: response.data.data.firstName,
                        invitedPhotoUrl: response.data.data.photoUrl
                    })
                })
                .catch(error => {
                    console.log("error getting receipients in InviteCard: " + error);
                })
        }


    }

    deleteInvite = (invite) => {
        this.setState({
            visible: false
        });
        this.props.deleteInviteCallback(invite);
    }

    respondToReceivedInvite = (invite) => {
        this.setState({ visible: false });
        console.log("status after click: " + this.state.status);
        this.state.status === "accepted" ? this.props.acceptInviteCallback(invite) : this.props.declineInviteCallback(invite)
    }

    componentDidUpdate(prevProps) {
        if (this.props.invite !== prevProps.invite) {
            this.getUsers(this.props.invite);
        }
    }

    getRest = async() => {
        const CONFIG = require('../secrets.json');
        const config = {
            headers: {
                Authorization: `Bearer ${CONFIG.YELP_API_KEY}`,
            },
        };

        axios.get('https://api.yelp.com/v3/businesses/' + this.props.invite.restYelpId, config)
                    .then(response => {
                        console.log("rest in InviteCard: " + response);
                        this.setState({
                            rest: response.data
                        })
                        return response
                    })
                    .then(response => {
                        this.props.navigation.navigate("InviteDetails", {
                            invite: this.props.invite,
                            rest: response.data
                        })
                    })
                    .catch(error => {
                        console.log("nested request in getting restaurant for invite details: " + error);
                    })
    }

    render() {
        console.log("rendering InviteCard");
        console.log(this.state);

        let displayCard;

        if (this.props.currentlyChecking === "received") {
            displayCard = <ListItem avatar>
                <Body>
                    <Text>From <Text style={styles.name}>{this.state.requesterName}</Text></Text>
                    <View style={{ marginTop: 5 }}>
                        <Text note>on {this.props.invite.creationDate}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Button
                            title="View"
                            color="blue"
                            onPress={() => this.getRest()}
                        />
                        <Button
                            title="Accept"
                            color="blue"
                            onPress={() => {
                                this.setState({
                                    visible: true,
                                    status: "accepted"
                                });
                            }}
                        />
                        <Button
                            title="Decline"
                            color="grey"
                            onPress={() => {
                                this.setState({
                                    visible: true,
                                    status: "declined"
                                });
                            }}
                        />

                    </View>
                    <Dialog
                        visible={this.state.visible}
                        footer={
                            <DialogFooter>
                                <DialogButton
                                    text="NO"
                                    onPress={() => this.setState({ visible: false })}
                                />
                                <DialogButton
                                    text="YES"
                                    onPress={() => this.respondToReceivedInvite(this.props.invite, this.state.status)}
                                />
                            </DialogFooter>
                        }
                    >
                        <DialogContent style={{ paddingTop: 30 }}>
                            {this.state.status === "accepted" ? <Text> Are you sure you want to accept the invite?</Text> : <Text> Are you sure you want to decline the invite?</Text>}
                        </DialogContent>
                    </Dialog>
                </Body>
                <Right>
                    <Thumbnail source={{ uri: this.state.requesterPhotoUrl }} />
                </Right>
            </ListItem>
        }

        // if (this.props.currentlyChecking === "sent") {
        //    displayCard = <ListItem avatar>
        //             <Body>
        //             <Text>You've sent an invite to <Text style={styles.name}>{this.state.invitedName}</Text></Text>
        //             <View>
        //                 <Text note>on {this.props.invite.creationDate}</Text>
        //             </View>
        //             <Button
        //                 title="Cancel"
        //                 color="grey"
        //                 onPress={() => {
        //                     this.setState({ visible: true });
        //                 }}
        //             />
        //             <Dialog
        //                 visible={this.state.visible}
        //                 footer={
        //                     <DialogFooter>
        //                         <DialogButton
        //                             text="NO"
        //                             onPress={() => this.setState({ visible: false })}
        //                         />
        //                         <DialogButton
        //                             text="YES"
        //                             onPress={() => this.deleteInvite(this.props.invite)}
        //                         />
        //                     </DialogFooter>
        //                 }
        //             >
        //                 <DialogContent style={{ paddingTop: 30 }}>
        //                     <Text> Are you sure you want to cancel the invite?</Text>
        //                 </DialogContent>
        //             </Dialog>
        //         </Body>
        //         <Right>
        //             <Thumbnail source={{ uri: this.state.invitedPhotoUrl }} />
        //         </Right>
        //     </ListItem>
        // }

        if (this.props.currentlyChecking === "confirmed") {
            displayCard = <ListItem avatar>
                <Body>
                    <Text>With <Text style={styles.name}>{this.state.invitedName}</Text></Text>
                    <View style={{ marginTop: 5 }}>
                        <Text note>on {this.props.invite.creationDate}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Button
                            title="View"
                            color="blue"
                            onPress={() => this.getRest()}
                        />
                        <Button
                            title="Cancel"
                            color="grey"
                            onPress={() => {
                                this.setState({ visible: true });
                            }}
                        />
                    </View>
                    <Dialog
                        visible={this.state.visible}
                        footer={
                            <DialogFooter>
                                <DialogButton
                                    text="NO"
                                    onPress={() => this.setState({ visible: false })}
                                />
                                <DialogButton
                                    text="YES"
                                    onPress={() => this.deleteInvite(this.props.invite)}
                                />
                            </DialogFooter>
                        }
                    >
                        <DialogContent style={{ paddingTop: 30 }}>
                            <Text> Are you sure you want to cancel the invite?</Text>
                        </DialogContent>
                    </Dialog>
                </Body>
                <Right>
                    <Thumbnail source={{ uri: this.state.invitedPhotoUrl }} />
                </Right>
            </ListItem>
        }


        return (
            <>
                {displayCard}
            </>

        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "red",
        borderRadius: 5
    },
    name: {
        fontWeight: "bold"
    }
})

export default withNavigation(InviteCard);