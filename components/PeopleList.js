import React from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base';
import {View, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import PeopleCard from './PeopleCard';

class PeopleList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      interestedFbIds: [],
      interestedPeople: [],
      receipientFbIds: []
    }

    this.getInterestedPeople();
  }

  async componentDidMount(){
    await this.getInterestedPeople();
  }

  getInterestedPeople = async() => {
    return axios.get("http://localhost:4567/interests/" + this.props.restYelpId + "/userFbIds") //Ada
    // return axios.get("http://172.24.26.244:4567/interests/" + this.props.restYelpId + "/userFbIds") //Ada
                .then(response => {
                  console.log(response.data.data);

                  return response.data.data
                })
                .then(fbIds => {
                  let currentPeople = []
                  fbIds.forEach ( async fbId => {
                    // axios.get("http://172.24.26.244:4567/users/" + fbId) //Ada
                    return axios.get("http://localhost:4567/users/" + fbId) //Ada

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

  selectPeople = (userFbId) => {
    const fbIds= this.state.receipientFbIds;
    fbIds.push(userFbId);
    this.setState({
      receipientFbIds: fbIds
    })
  }

  sendInvite = () => {
    const config = {
      requesterFbId: this.props.userFbId,
      restYelpId: this.props.restYelpId,
      creationDateTime: new Date().toLocaleString(),
      mealStartDateTime: new Date().toLocaleString(),
      mealEndDateTime: new Date().toLocaleString(),
      receipientFbIds: this.state.receipientFbIds
    }

    axios.post("http://localhost:4567/invites", config)
      .then(response => {
        this.setState({
          receipientFbIds: []
        });
      })
      .catch(error => {
        console.log("error inviting people: " + error);
      })
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
            selectPeopleCallBack={(userFbId)=> this.selectPeople(userFbId)}
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
                      onPress={this.sendInvite}
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

export default PeopleList;