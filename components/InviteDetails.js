import React from 'react';
import { View, StyleSheet } from 'react-native';
// import { Container, Header, Text, List, ListItem, Content, Card, CardItem, Body, Button } from 'native-base';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon } from 'native-base';
import PeopleCard from './PeopleCard';
import FooterTabs from './FooterTabs';
import { withNavigation } from 'react-navigation';


class InviteDetails extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        console.log("meanstartdatetime: " + this.props.navigation.getParam("invite").mealStartDateTime);
        // const invitedPeople = this.props.navigation.getParam("invitedPeople").map((user, i) => {
        //     return [
        //         <PeopleCard
        //             key={i}
        //             user={user}
        //             me={this.props.navigation.getParam("me")}
        //             name={user.data.data.firstName}
        //             photoUrl={user.data.data.photoUrl}
        //             confirmedInviteList={this.props.navigation.getParam("invitedPeople")}
        //         />
        //     ]
        // })

        return (

            <Container>
                <Content>
                    <List>
                        <ListItem style={{ backgroundColor: "#00deff", paddingLeft: 20, marginRight: 15, marginTop: 20 }}>
                            <Body>
                                <Text style={styles.name}>{this.props.navigation.getParam("rest").name}</Text>
                            </Body>
                        </ListItem>
                        <ListItem thumbnail>
                            <Left>
                                <Icon name='time' />
                            </Left>
                            <Body>
                                <Text>{this.props.navigation.getParam("invite").mealStartDate} - {this.props.navigation.getParam("invite").mealEndDate} </Text>
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
                        {/* <PeopleCard
                            me={this.props.navigation.getParam("me")}
                            name={this.props.navigation.getParam("me").name}
                            photoUrl={this.props.navigation.getParam("me").photoUrl}
                            confirmedInviteList={this.props.navigation.getParam("invitedPeople")}
                        /> */}
                        {/* {invitedPeople} */}
                    </List>
                </Content>
                <FooterTabs
                    badgeCount={this.props.navigation.getParam("badgeCount")}
                    me={this.props.navigation.getParam("me")}
                />
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

export default withNavigation(InviteDetails);


// import React from 'react';
// import { View } from 'react-native';
// import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
// import axios from 'axios';
// import FooterTabs from './FooterTabs';

// class InviteDetails extends React.Component {

//     constructor(props){
//         super(props);
//         this.state = {
//             restName: null,
//             restLocation: null
//         }
//     }

//     render() {

        
//         return (
//             <Container>
//                 <Header><Text>Invite Details: </Text></Header>
//                 <Content>
//                     <Card>
//                         <CardItem header>
//                             <Text>Restaurant: {this.props.navigation.getParam("rest").name} </Text>
//                         </CardItem>
//                         <CardItem header>
//                             <Text>Location: {this.props.navigation.getParam("rest").location.display_address}</Text> 
//                         </CardItem>
//                         <CardItem>
//                             <Body>
//                                 <Text>Meal Start Date: {this.props.navigation.getParam("invite").mealStartDate}</Text>
//                                 <Text>Meal End Date: {this.props.navigation.getParam("invite").mealEndDate}</Text>
//                             </Body>
//                         </CardItem>
//                         <CardItem footer>
//                             <Text></Text>
//                         </CardItem>
//                     </Card>
//                 </Content>
//                 <FooterTabs
//                     me={this.props.navigation.getParam("me")}
//                     badgeCount={this.props.navigation.getParam("badgeCount")}
//                  />
//             </Container>
//                 );
//             }
//         }
        
// export default InviteDetails;