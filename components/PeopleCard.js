import React from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, CheckBox, Button, Text } from 'native-base';
import {StyleSheet, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
class PeopleCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected: false,
            name: null,
            photoUrl: null,
            // onInviteList: false
        }

    }

    select = () => {
        this.setState({
            selected: !this.state.selected
        });
        this.props.selectPeopleCallBack();
        // this.props.selectPeopleCallBack(this.props.userFbId);
    }

    unSelect = () => {
        this.setState({
            selected: false
        });
        this.props.removePeopleCallBack();
    }

    remove = (user) => {
        this.setState({
            selected: false
        });
        this.props.removePeopleOnInviteListCallBack(user);
    }

    render(){

                        
        let checkBox = this.state.selected ? 
                            <TouchableOpacity onPress={() => this.unSelect()}>
                                <CheckBox style={styles.checkBox} checked={true} />
                            </TouchableOpacity>
                            : <TouchableOpacity onPress={() => this.select()}>
                                <CheckBox style={styles.checkBox} checked={false} />
                                </TouchableOpacity>
        let removeButton = null;
        if(this.props.fbIdsOnInviteList){
            checkBox = null;
            if(this.props.fbIdsOnInviteList.includes(this.props.userFbId))
             {
                removeButton = <TouchableOpacity style={{color: "grey"}} onPress={() => this.remove(this.props.user)}>
                                    <Button
                                    small
                                    bordered
                                    dark
                                    > 
                                        <Text>Remove</Text> 
                                    </Button>
                                </TouchableOpacity>
            }
        }

        if(this.props.confirmedInviteList){
            if(this.props.confirmedInviteList.includes(this.props.user))
            removeButton = null;
            checkBox = null;
        }

        return(

                <ListItem avatar style={{margin: 10, borderBottomColor: "grey"}}>
                    <TouchableOpacity>
                        <Left>
                            <Thumbnail source={{ uri: this.props.photoUrl }} />
                        </Left>
                    </TouchableOpacity>
                        <View style={styles.listText}>
                            <Text style={{textAlign: "left"}}>{this.props.name}</Text>
                            <Text note style={{textAlign: "left"}}>Software Engineer</Text>
                        </View>
                        {checkBox ? checkBox : removeButton}
                </ListItem>
        );
    }
}

const styles = StyleSheet.create({
    checkBox: {
        marginRight: 30
    },
    listText: {
        marginRight: 20, 
        marginLeft: 20, 
        flexDirection: "column"
    }
})

export default PeopleCard;