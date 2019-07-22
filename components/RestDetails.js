import React from 'react';
import { Image, Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { 
    Container, 
    Content, 
    Card, 
    CardItem, 
    Button, 
    Left, 
    Body,
    Icon } from 'native-base';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';


class RestDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      interested: this.props.navigation.getParam("beenMarkedInterested"),
      userFbId: this.props.navigation.getParam("loggedInUserFbId"),
    }

    console.log("rest param: " + JSON.stringify(this.props.navigation.getParam("rest").id));
    console.log("intersted state :" + this.state.interested);

  }

  markInterested = async() => {
    const config = {
      userFbId: this.state.userFbId,
      restYelpId: this.props.navigation.getParam("rest").id
    }
    return axios.post("http://localhost:4567/interests", config)
    // return axios.post("http://172.24.26.244:4567/interests", config) // Ada
    // return axios.post("http://192.168.1.194:4567/interests", config) //home
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

  removeInterest = async(userFbId, restYelpId) => {
    return axios.delete("http://localhost:4567/users/" + userFbId + "/interests/" + restYelpId)
                .then(response => {
                  this.setState({
                    interested: false
                  })
                })
                .catch(error => {
                  console.log(error)
                })
  }

  render() {
    console.log("rendering RestDetails");

    let categories = this.props.navigation.getParam("rest").categories.map((cat) => {
        return cat.title
    });

    categories = categories.join(", ");

    let interestButton;
    if (this.state.interested) {
      interestButton = <TouchableOpacity onPress={() => this.removeInterest(this.props.navigation.getParam("loggedInUserFbId"), this.props.navigation.getParam("rest").id)}>
                            <Icon name='heart' style={{fontSize: 40, color: 'red'}} />
                        </TouchableOpacity>
    }else{
      interestButton = <TouchableOpacity onPress={() => this.markInterested()}>
                          <Icon name='heart-empty' style={{fontSize: 40, color: 'red'}} />
                      </TouchableOpacity>
    }
    
  
    return (
      <Container>
        <Content>
          <Card style={styles.card}>
            <CardItem>
              <Left>
                <Body>
                  <Text style={styles.name}>{this.props.navigation.getParam("rest").name}</Text>
                  <Text note>Rating: {this.props.navigation.getParam("rest").rating}</Text>
                  <Text note>{this.props.navigation.getParam("rest").review_count} Reviews</Text>
                  <Text note>{this.props.navigation.getParam("rest").id} Reviews</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: this.props.navigation.getParam("rest").image_url}} style={styles.image}/>
                <View>
                    <Text>Location: {this.props.navigation.getParam("rest").location.display_address.join(", ")}</Text>
                    <Text>Phone: {this.props.navigation.getParam("rest").display_phone}</Text>
                    <Text>{this.props.navigation.getParam("rest").is_close ? "Closed" : "Open"}</Text>
                    <Text>Categories: {categories}</Text>
                </View>
              </Body>
            </CardItem>
          </Card>
          <View>
                  {interestButton}
            {/* <Button 
                  danger
                  onPress={() => this.markInterested()}
            >
                  {interestButton}
            </Button> */}
          </View>
          
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    card: {
        flex: 0
    },
    image: {
        height: 200, 
        width: 200, 
        flex: 1
    },
    name: {
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center"
    }
})

export default RestDetails;