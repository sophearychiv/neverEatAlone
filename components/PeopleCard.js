import React from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, CheckBox, Button } from 'native-base';
import {StyleSheet, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
class PeopleCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            invited: false,
            name: null,
            photoUrl: null
        }

    }

    selectPeople = () => {
        this.setState({
            invited: true
        });
        this.props.selectPeopleCallBack(this.props.userFbId);
    }

    render(){

                        
        const checkBox = this.state.invited ? <CheckBox style={styles.checkBox} checked={true} /> 
                            : <CheckBox style={styles.checkBox} checked={false} />

        console.log(this.props.name);
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
                    <TouchableOpacity onPress={this.selectPeople}>
                        {checkBox}
                    </TouchableOpacity>
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