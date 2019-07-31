import React from 'react';
import { Image, Text, View, StyleSheet, AsyncStorage } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Button,
  Left,
  Right,
  Center,
  Body,
  Icon,
  ListItem
} from 'native-base';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PeopleList from './PeopleList';
import FooterTabs from './FooterTabs';




class RestDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      interested: this.props.navigation.getParam("beenMarkedInterested"),
      userFbId: this.props.navigation.getParam("loggedInUserFbId"),
      isModalVisible: false
    }

    console.log("rest param: " + JSON.stringify(this.props.navigation.getParam("rest").id));
    console.log("intersted state :" + this.state.interested);

  }

  markInterested = async () => {
    const config = {
      userFbId: this.state.userFbId,
      restYelpId: this.props.navigation.getParam("rest").id
    }

    const IN_USE_HTTP = require('../internet.json').IN_USE_HTTP;
    return axios.post(IN_USE_HTTP + "/interests", config) //home
      .then(response => {
        this.setState({
          interested: true
        })
      })
      .catch(error => {
        this.setState({
          message: error
        })
      });
  }

  removeInterest = async (userFbId, restYelpId) => {
    const IN_USE_HTTP = require('../internet.json').IN_USE_HTTP;
    return axios.delete(IN_USE_HTTP + "/users/" + userFbId + "/interests/" + restYelpId)
      .then(response => {
        this.setState({
          interested: false
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  // componentDidUpdate(prevState){
  //   if(this.state.interested !== prevState.interested){
  //     this.render(<PeopleList/>);
  //   }
  // }

  render() {
    console.log("rendering RestDetails");

    let categories = this.props.navigation.getParam("rest").categories.map((cat) => {
      return cat.title
    });

    categories = categories.join(", ");

    let interestButton;
    if (this.state.interested) {
      interestButton = <TouchableOpacity onPress={() => this.removeInterest(this.props.navigation.getParam("loggedInUserFbId"), this.props.navigation.getParam("rest").id)}>
        <Icon name='heart' style={styles.heartIcon} />
      </TouchableOpacity>
    } else {
      interestButton = <TouchableOpacity onPress={() => this.markInterested()}>
        <Icon name='heart-empty' style={styles.heartIcon} />
      </TouchableOpacity>
    }

    return (
        <Container>
          <ListItem style={{backgroundColor: "#00deff", paddingLeft: 20, marginRight: 15, borderRadius: 5}}>
            <Left>
              <Text style={styles.name}>{this.props.navigation.getParam("rest").name}</Text>

            </Left>
            <Body>
              {interestButton}

            </Body>
          </ListItem>
          <Content>
            <Card style={styles.card}>
              <CardItem style={styles.list}>
                <Body style={styles.content}>
                  <Image source={{ uri: this.props.navigation.getParam("rest").image_url }} style={styles.image} />
                  <View>
                    <Text><Text style={styles.bold}>Rating from Yelp:</Text> {this.props.navigation.getParam("rest").rating}</Text>
                    <Text><Text style={styles.bold}>Reviews from Yelp: </Text>{this.props.navigation.getParam("rest").review_count}</Text>
                    <Text><Text style={styles.bold}>Location: </Text>{this.props.navigation.getParam("rest").location.display_address.join(", ")}</Text>
                    <Text><Text style={styles.bold}>Phone: </Text>{this.props.navigation.getParam("rest").display_phone}</Text>
                    {/* <Text>{this.props.navigation.getParam("rest").is_close ? "Closed" : "Open"}</Text> */}
                    <Text><Text style={styles.bold}>Categories: </Text>{categories}</Text>
                  </View>
                </Body>
                <PeopleList
                  restYelpId={this.props.navigation.getParam("rest").id}
                  rest={this.props.navigation.getParam("rest")}
                  userFbId={this.props.navigation.getParam("loggedInUserFbId")}
                  interestedPeople={this.props.navigation.getParam("interestedPeople")}
                  me={this.props.navigation.getParam("me")}
                />
              </CardItem>
            </Card>
          </Content>
          <FooterTabs/>
        </Container>


    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  image: {
    width: 200,
    height: 100,
    flex: 1,
    marginRight: 10,
    marginBottom: 10
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center"
  },
  nameWrapper: {
    flexDirection: "row",
  },
  content: {
    flexDirection: "column",
    marginBottom: 30
  },
  bold: {
    fontWeight: "bold"
  },
  heartIcon: {
    fontSize: 30,
    color: "red",
    marginLeft: 130
  },
  list: {
    flexDirection: "column"
  }
})

export default RestDetails;