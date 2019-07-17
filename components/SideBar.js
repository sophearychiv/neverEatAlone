
import React from "react";
import { Text, StyleSheet, AsyncStorage, TouchableOpacity} from "react-native";
import { Container, Header, Content, List, ListItem, Icon, Left, Body, Right, Button } from "native-base";

export default class SideBar extends React.Component {

    handleLogout =() => {
        this.props.logout()
    }

  render() {
    return (

        <Container>
        <Header />

            <Content>
        <TouchableOpacity>
            <List>
            <ListItem icon>

                <Left>
                        <Button 
                            style={styles.logoutButton}
                            onPress={() => this.handleLogout()}
                            >
                            <Icon active name="log-out" />
                        </Button>
                </Left>
                <Body>
                <Text>Logout</Text>
                </Body>
                <Right>
                <Icon active name="arrow-forward" />
                </Right>

            </ListItem>
            </List>
      </TouchableOpacity>


            </Content>

      </Container>

    );
  }
}

const styles = StyleSheet.create({
    logoutButton: {
        backgroundColor: "#D3D3D3"
    }
})