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
      interestedUserFbId: null,
      message: null
    }

  }

  // async componentDidMount() {
  //   await this.markInterested();
  // }

  async componentDidMount() {
    await this.getUserId();
  }

  async getUserId() {
    const userString = await AsyncStorage.getItem('access_token');
    const userFbId = JSON.parse(userString).id;
    // console.log("userId in getUserID(): " + userId);
    this.setState({
      interestedUserFbId: userFbId
    })
  }

  markInterested = () => {
    
    // const userId = this.getUserId();
    // const userId = this.state.interestedUserId;
    // console.log("userId in markInterested(): " + userId);
    const config = {
      userFbId: this.state.interestedUserFbId,
      restYelpId: this.props.rest.id
    }
    return axios.post("http://172.24.26.244:4567/interests", config)
                .then(response => {
                  // console.log(response);
                  // if (response.data.status === 200){
                    this.setState({
                      interested: true
                    })
                  // }
                })
                .catch(error => {
                  this.setState({
                    message: error
                  })
                });
  }

  render() {
    let categories = this.props.rest.categories.map((cat) => {
        return cat.title
    });

    categories = categories.join(", ");

    let interestButton;
    if (this.state.interested) {
      interestButton = <Text>Interested</Text>
    }else {
      interestButton = <Text>Mark Interested</Text>
    }

    // console.log(this.state.interested);
    // console.log(this.state.message);
    
  
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