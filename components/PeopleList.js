import React from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import {View, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import PeopleCard from './PeopleCard';

class PeopleList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      interestedFbIds: [],
      interestedPeople: []
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
                  // this.setState({
                  //   interestedFbIds: response.data.data
                  // });
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
                  // this.setState({
                  //         interestedPeople: currentPeople
                  //       })
                })
                .catch(error => {
                  console.log("in second nested request in PeopleList: " + error);
                });
  }


    render(){
      // console.log("interested people: " + JSON.stringify(this.state.interestedPeople));

      const interestedPeople = this.state.interestedPeople.map( (user, i) => {
        // console.log("firstName in map: " + user.data.data.firstName);
        return (
          <PeopleCard
            key={i}
            name={user.data.data.firstName}
            photoUrl={user.data.data.photoUrl}
          />
          )
      });

        return(

      <Container>
        {/* <Header /> */}
        <Text style={styles.listHeader}> Other Interested People</Text>
        <Content>
          <List>
            {interestedPeople}
          </List>
        </Content>
      </Container>
        );
    }
}

const styles = StyleSheet.create({
  listHeader: {
    alignSelf: "center",
    fontWeight: "bold"
  }
})

export default PeopleList;