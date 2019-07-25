import React from 'react';
import {View, Text, Image} from 'react-native';
import {Container, Content, Thumbnail} from 'native-base';
import FooterTabs from './FooterTabs';



const Profile = (props) => {
    // constructor(props) {
    //     super(props);
    // }
    // render() {
        const { navigation } = props;
        const name = navigation.getParam('name', 'name');
        const photoUrl = navigation.getParam('photoUrl', 'photo');
        return (
            <Container>
                <Content>
                    <Thumbnail size={80} source={{uri: photoUrl}} />
                </Content>
                <FooterTabs/>
            </Container>
        );
    // }
}

export default Profile;