import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { 
    Container, 
    Content, 
    Card, 
    CardItem, 
    Button, 
    Left, 
    Body } from 'native-base';


const RestDetails = props => {

    let categories = props.rest.categories.map((cat) => {
        return cat.title
    })

    categories = categories.join(", ");
  
    return (
      <Container>
        <Content>
          <Card style={styles.card}>
            <CardItem>
              <Left>
                <Body>
                  <Text style={styles.name}>{props.rest.name}</Text>
                  <Text note>Rating: {props.rest.rating}</Text>
                  <Text note>{props.rest.review_count} Reviews</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: props.rest.image_url}} style={styles.image}/>
                <View>
                    <Text>Location: {props.rest.location.display_address}</Text>
                    <Text>Phone: {props.rest.display_phone}</Text>
                    <Text>{props.rest.is_close ? "Closed" : "Open"}</Text>
                    <Text>Categories: {categories}</Text>
                </View>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
              <Button danger><Text> Mark Interested </Text></Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  
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