import React from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import axios from 'axios';
import FooterTabs from './FooterTabs';

class InviteDetails extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            restName: null,
            restLocation: null
        }
        // this.getRest();
    }

    render() {

        
        return (
            <Container>
                <Header><Text>Invite Details: </Text></Header>
                <Content>
                    <Card>
                        <CardItem header>
                            <Text>Restaurant: {this.props.navigation.getParam("rest").name} </Text>
                        </CardItem>
                        <CardItem header>
                            <Text>Location: {this.props.navigation.getParam("rest").location.display_address}</Text> 
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Meal Start Date: {this.props.navigation.getParam("invite").mealStartDate}</Text>
                                <Text>Meal End Date: {this.props.navigation.getParam("invite").mealEndDate}</Text>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Text></Text>
                        </CardItem>
                    </Card>
                </Content>
                <FooterTabs />
            </Container>
                );
            }
        }
        
export default InviteDetails;