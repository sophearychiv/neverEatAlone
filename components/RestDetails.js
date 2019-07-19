import React from 'react';
import { Image, Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { 
    Container, 
    Content, 
    Card, 
    CardItem, 
    Button, 
    Left, 
    Body } from 'native-base';
import axios from 'axios';


class RestDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      interested: false,
      userFbId: null
    }

    this.getUserId();

  }

  async componentDidMount(){
    await this.getUserId();
    await this.isInterested(this.state.userFbId);
  }

  isInterested = async(userFbId) => {
    return axios.get("http://localhost:4567/users/" + userFbId + "/interests/" + this.props.rest.id)
    // return axios.get("http://172.24.26.244:4567/users/" + this.state.userFbId + "/interests/" + this.props.rest.id) // Ada
    //  await axios.get("http://192.168.1.194:4567/users/" + userFbId + "/interests/" + this.props.rest.id) // home
            .then(response => {
              console.log("setState in isInterested");
              // this.handleIsInterested();
              this.setState({
                interested: true
              })
            })
            .catch(error => {
              // return false;
            })

  }

  async getUserId() {
    const userString = await AsyncStorage.getItem('access_token');
    const userFbId = JSON.parse(userString).id;
    // return userFbId
    this.setState({
      userFbId
    })
  }

  markInterested = async() => {
    const config = {
      userFbId: this.state.userFbId,
      restYelpId: this.props.rest.id
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

  render() {
    console.log("render");

    let categories = this.props.rest.categories.map((cat) => {
        return cat.title
    });

    categories = categories.join(", ");

    let interestButton;
    if (this.state.interested) {
      interestButton = <Text>Interested</Text>
    }else{
      interestButton = <Text>Mark Interested</Text>
    }
  
    return (
      <Container>
        <Content>
          <Card style={styles.card}>
            <CardItem>
              <Left>
                <Body>
                  <Text style={styles.name}>{this.props.rest.name}</Text>
                  <Text note>Rating: {this.props.rest.rating}</Text>
                  <Text note>{this.props.rest.review_count} Reviews</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: this.props.rest.image_url}} style={styles.image}/>
                <View>
                    <Text>Location: {this.props.rest.location.display_address.join(", ")}</Text>
                    <Text>Phone: {this.props.rest.display_phone}</Text>
                    <Text>{this.props.rest.is_close ? "Closed" : "Open"}</Text>
                    <Text>Categories: {categories}</Text>
                </View>
              </Body>
            </CardItem>
          </Card>
          <View>
            <Button 
                  danger
                  onPress={() => this.markInterested()}
            >
                  {interestButton}
            </Button>
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