import React from 'react';
import { ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { withNavigation } from 'react-navigation';

class Interest extends React.Component {

    navigateToRestDetails = () => {
        this.props.navigation.navigate("RestDetails", {
            rest: this.props.rest
        })
    }
    
    render() {
        let categories = this.props.rest.categories.map((cat) => {
            return cat.title
          });
      
          categories = categories.join(", ");
        return (
            <ListItem thumbnail>
                <Left>
                    <Thumbnail square source={{ uri: this.props.rest.image_url }} />
                </Left>
                <Body>
                    <Text>{this.props.rest.name}</Text>
                    <Text note numberOfLines={1}>{categories}</Text>
                </Body>
                <Right>
                    <Button 
                        transparent
                        onPress={() => this.navigateToRestDetails()}
                    >
                        <Text>View</Text>
                    </Button>
                </Right>
            </ListItem>
        );
    }
}

export default withNavigation(Interest);