import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, Text, List, ListItem, Content, Card, CardItem, Body } from 'native-base';
import PeopleCard from './PeopleCard';

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
                    name={user.data.data.name}
                    photoUrl={user.data.data.photoUrl}
                    confirmedInviteList={this.props.navigation.getParam("invitedPeople")}
                />
            ]
        })

        return (
            <Container>
                <Header>
                    <Text>Hooray! You have sent the invitation. Happy eating!</Text>
                </Header>
                <Content>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text><Text style={styles.bold}>Restaurant Name: </Text> {this.props.navigation.getParam("rest").name}</Text>
                                <Text><Text style={styles.bold}>Address: </Text> {this.props.navigation.getParam("rest").location.display_address}</Text>
                                <Text><Text style={styles.bold}>Start Date and Time: </Text>{this.props.navigation.getParam("mealStartDateTime")}</Text>
                                <Text><Text style={styles.bold}>End Date and Time: </Text>{this.props.navigation.getParam("mealEndDateTime")}</Text>
                                <Text><Text style={styles.bold}>Invitation Sent On: </Text>{this.props.navigation.getParam("creationDateTime")}</Text>
                            </Body>

                        </CardItem>
                        <CardItem>
                            <Text style={styles.companions}>Invited Companions: </Text>
                        </CardItem>
                        <CardItem>
                            <List>
                                {invitedPeople}
                            </List>
                        </CardItem>
                    </Card>
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
    }
})

export default InviteConfirmation;