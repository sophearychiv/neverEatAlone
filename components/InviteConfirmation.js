import React from 'react';
import { View, StyleSheet } from 'react-native';
// import { Container, Header, Text, List, ListItem, Content, Card, CardItem, Body, Button } from 'native-base';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon } from 'native-base';
import PeopleCard from './PeopleCard';
import FooterTabs from './FooterTabs';
import { withNavigation } from 'react-navigation';


class InviteConfirmation extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        console.log("meanstartdatetime: " + this.props.navigation.getParam("mealStartDateTime"));
        const invitedPeople = this.props.navigation.getParam("invitedPeople").map((user, i) => {
            return [
                <PeopleCard
                    key={i}
                    user={user}
                    name={user.data.data.firstName}
                    photoUrl={user.data.data.photoUrl}
                    confirmedInviteList={this.props.navigation.getParam("invitedPeople")}
                />
            ]
        })

        return (

            <Container>
{/* 
                <Header >
                    <View style={{ width: 100, height: 80, backgroundColor: "red" }}>

                    </View>
                    <Body>
                        <Text>{this.props.navigation.getParam("rest").name}</Text>
                    </Body>
                </Header> */}
                <Content>
                    <List>
                        <ListItem style={{ backgroundColor: "#00deff", paddingLeft: 20, marginRight: 15 }}>
                            <Body>
                                <Text style={styles.name}>{this.props.navigation.getParam("rest").name}</Text>
                            </Body>
                        </ListItem>
                        <ListItem thumbnail>
                            <Left>
                                <Icon name='time' />
                            </Left>
                            <Body>
                                <Text>{this.props.navigation.getParam("mealStartDateTime")} - {this.props.navigation.getParam("mealEndDateTime")} </Text>
                            </Body>
                        </ListItem>
                        <ListItem thumbnail>
                            <Left>
                                <Icon name='pin' />
                            </Left>
                            <Body>
                                <Text> {this.props.navigation.getParam("rest").location.display_address}</Text>
                            </Body>
                        </ListItem>

                    </List>
                    <List>
                        {invitedPeople}
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: "bold"
    },
    companions: {
        fontWeight: "bold",
        textAlign: "center"
    },
    seeInviteButton: {
        alignSelf: "center",
        marginBottom: 20
    },
    textInvite: {
        textAlign: "center"
    },
    name: {
        fontWeight: "bold",
        fontSize: 20,
        // alignSelf: "center",
        textAlign: "center"
    },
})

export default withNavigation(InviteConfirmation);