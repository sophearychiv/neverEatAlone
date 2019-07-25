import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
export default class FooterTabs extends Component {
  render() {
    return (
    //   <Container>
        // <Header />
        // <Content />
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical>
              <Icon name="search" />
              <Text>Search</Text>
            </Button>
            <Button vertical active>
              <Icon name="mail-open"/>
              <Text>Invites</Text>
            </Button>
            <Button vertical>
              <Icon name="heart" />
              <Text>Interests</Text>
            </Button>
          </FooterTab>
        </Footer>
    //   </Container>
    );
  }
}