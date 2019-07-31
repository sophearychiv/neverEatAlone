import React from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base';
import {View, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import PeopleCard from './PeopleCard';

class PeopleList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      interestedFbIds: [],
      receipientFbIds: [],
      invitedPeople: []
    }

  }

  selectPeople = (user) => {
    const fbIds= this.state.receipientFbIds;
    fbIds.push(user.data.data.fbId);
    const people = this.state.invitedPeople;
    people.push(user)
    this.setState({
      receipientFbIds: fbIds,
      invitedPeople: people
    })
  }

  removePeople = (user) => {
    let invitedFbIds = this.state.receipientFbIds;
    for (let i = 0; i < invitedFbIds.length; i++){
      if ( invitedFbIds[i] === user.data.data.fbId) {
        invitedFbIds.splice(i, 1);
          this.setState({
            receipientFbIds: invitedFbIds
          });
      }
    }
    let people = this.state.invitedPeople;
    for (let i = 0; i < people.length; i++){
      if ( people[i] === user) {
        people.splice(i, 1);
          this.setState({
            invitedPeople: people
          });
      }
    }
  }


  openInvite = () => {
    this.props.navigation.navigate("Invite", {
      peopleOnInviteList: this.state.invitedPeople,
      fbIdsOnInviteList: this.state.receipientFbIds,
      requesterFbId: this.props.userFbId,
      restYelpId: this.props.restYelpId,
      rest: this.props.rest,
      me: this.props.me
    });
  }

    render(){
      console.log("invited people: " + JSON.stringify(this.state.receipientFbIds));

      const interestedPeople = this.props.interestedPeople.map( (user, i) => {
        console.log("id in map: " + user.data.data.id);
        return (
          <PeopleCard
            key={i}
            userFbId={user.data.data.fbId}
            name={user.data.data.firstName}
            photoUrl={user.data.data.photoUrl}
            selectPeopleCallBack={()=> this.selectPeople(user)}
            removePeopleCallBack={()=> this.removePeople(user)}
            me={this.props.me}
          />
          )
      });

        return(
              <Container>
                  <Text style={styles.listHeader}> Interested People</Text>
                  <Content>
                    <List>
                      {interestedPeople}
                    </List>
                    <Button 
                      medium 
                      danger 
                      style={styles.inviteButton}
                      onPress={this.openInvite}
                    >
                      <Text> Lets Eat Together! </Text>
                    </Button>
                  </Content>

              </Container>

        );
    }
}

const styles = StyleSheet.create({
  listHeader: {
    alignSelf: "center",
    fontWeight: "bold"
  },
  inviteButton: {
    alignSelf: "center", 
    marginTop: 10
  }
})

export default withNavigation(PeopleList);