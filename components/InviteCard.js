import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { ListItem, Left, Right, Body, Thumbnail, Text, ActionSheet } from 'native-base';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';

const IN_USE_HTTP = require("../internet.json").IN_USE_HTTP

class InviteCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            photoUrl: null,
            invitedName: null,
            invitedPhotoUrl: null
        }
        this.getUsers(this.props.invite);
        console.log("executed in constructor in InviteCard");
    }

    async componentDidMount() {
        await this.getUsers(this.props.invite);
    }

    getUsers = async (invite) => {

        axios.get(IN_USE_HTTP + "/users/" + invite.receipientFbId)
            .then(response => {
                this.setState({
                    invitedName: response.data.data.firstName,
                    invitedPhotoUrl: response.data.data.photoUrl
                })
            })
    }

    deleteInvite = (invite) => {
        this.setState({
            visible: false
        });
        this.props.deleteInviteCallback(invite);
    }

    componentDidUpdate(prevProps){
        if(this.props.invite !== prevProps.invite){
            this.getUsers(this.props.invite);
        }
    }

    render() {
        console.log("rendering InviteCard");
        return (
            <ListItem avatar>


                <Body>
                    <Text>receipientFbId: {this.props.invite.receipientFbId}</Text>
                    <Text>inviteId: {this.props.invite.inviteId}</Text>
                    <Button
                        title="remove"
                        onPress={() => this.deleteInvite(this.props.invite)}
                    />
                    <Text>Yout sent an invite to {this.state.invitedName}</Text>
                    <View>
                        <Text note>on {this.props.invite.creationDate}</Text>
                    </View>
                    <Button
                        title="Cancel"
                        color="grey"
                        onPress={() => {
                            this.setState({ visible: true });
                        }}
                    />
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
                                // onPress={() => this.deleteInvite(this.props.uniqueKey, this.props.invite.inviteId, this.props.invite.receipientFbId)}
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
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "red",
        borderRadius: 5
    }
})

export default InviteCard;