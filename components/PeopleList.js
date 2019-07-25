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
      interestedPeople: [],
      receipientFbIds: [],
      invitedPeople: []
    }

    this.getInterestedPeople();
  }

  async componentDidMount(){
    await this.getInterestedPeople();
  }

  getInterestedPeople = async() => {
    return axios.get("http://192.168.1.194:4567/interests/" + this.props.restYelpId + "/userFbIds") //home
    // return axios.get("http://localhost:4567/interests/" + this.props.restYelpId + "/userFbIds") 
    // return axios.get("http://172.24.26.244:4567/interests/" + this.props.restYelpId + "/userFbIds") //Ada
                .then(response => {
                  console.log(response.data.data);

                  return response.data.data
                })
                .then(fbIds => {
                  let currentPeople = []
                  fbIds.forEach ( async fbId => {
                    // axios.get("http://172.24.26.244:4567/users/" + fbId) //Ada
                    return axios.get("http://192.168.1.194:4567/users/" + fbId)  // home
                    // return axios.get("http://localhost:4567/users/" + fbId) 

                      .then(user => {
                        currentPeople.push(user);
                        this.setState({
                          interestedPeople: currentPeople
                        })
                      })
                      .catch(error => {
                        console.log("in forEach loop in PeopleList: " + error);
                      });
                  });
                })
                .catch(error => {
                  console.log("in second nested request in PeopleList: " + error);
                });
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
      restYelpId: this.props.restYelpId
    });
  }

 


    render(){
      console.log("invited people: " + JSON.stringify(this.state.receipientFbIds));

      const interestedPeople = this.state.interestedPeople.map( (user, i) => {
        console.log("id in map: " + user.data.data.id);
        return (
          <PeopleCard
            key={i}
            // user = {user}
            userFbId={user.data.data.fbId}
            name={user.data.data.firstName}
            photoUrl={user.data.data.photoUrl}
            selectPeopleCallBack={()=> this.selectPeople(user)}
            removePeopleCallBack={()=> this.removePeople(user)}
            // selectPeopleCallBack={(userFbId)=> this.selectPeople(userFbId)}
          />
          )
      });

        return(
              <Container>
                {/* <Header /> */}
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