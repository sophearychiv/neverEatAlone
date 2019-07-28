import React, { Component } from "react";
import { StyleSheet, DatePickerIOS } from "react-native";
import { Container, Header, Content, List, Form, Item, Label, Input, DatePicker, Text, Button } from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
// import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import PeopleCard from './PeopleCard';
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios';
import FooterTabs from './FooterTabs';

export default class Invite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      peopleOnInviteList: this.props.navigation.getParam("peopleOnInviteList"),
      fbIdsOnInviteList: this.props.navigation.getParam("fbIdsOnInviteList"),
      isStartDateTimePickerVisible: false,
      isEndDateTimePickerVisible: false,
      startDate: 'Select Date',
      endDate: 'Select Date',
      // startDate: new Date().toLocaleString(),
      // endDate: new Date().toLocaleString(),

    };

  }

  sendInvite = async () => {
    const config = {
      requesterFbId: this.props.navigation.getParam("requesterFbId"),
      restYelpId: this.props.navigation.getParam("restYelpId"),
      creationDateTime: new Date().toLocaleString(),
      mealStartDateTime: this.state.startDate.toLocaleString(),
      mealEndDateTime: this.state.endDate.toLocaleString(),
      receipientFbIds: this.state.fbIdsOnInviteList
    }

    console.log(config);

    const IN_USE_HTTP = require('../internet.json').IN_USE_HTTP;

    return axios.post(IN_USE_HTTP + "/invites", config)
      .then(response => {
        this.props.navigation.navigate("InviteConfirmation", {
          invitedPeople: this.state.peopleOnInviteList,
          rest: this.props.navigation.getParam("rest"),
          restYelpId: this.state.restYelpId,
          creationDateTime: config.creationDateTime,
          mealStartDateTime: this.state.startDate.toLocaleString(),
          mealEndDateTime: this.state.endDate.toLocaleString(),
        });
      })
      .catch(error => {
        console.log("error sending invite: " + error);
      })
  }

  removePeopleFromInviteList = (user) => {
    let people = this.state.peopleOnInviteList;
    for (let i = 0; i < people.length; i++) {
      if (people[i] === user) {
        people.splice(i, 1);
        this.setState({
          peopleOnInviteList: people
        });
        break;
      }
    }
    let invitedFbIds = this.state.fbIdsOnInviteList;
    for (let i = 0; i < invitedFbIds.length; i++) {
      if (invitedFbIds[i] === user.data.data.fbId) {
        console.log("user.data: " + user.data.data.fbId);
        invitedFbIds.splice(i, 1);
        this.setState({
          fbIdsOnInviteList: invitedFbIds
        });
        break;
      }
    }
  }


  showStartDateTimePicker = () => {
    this.setState({ isStartDateTimePickerVisible: true });
  };

  showEndDateTimePicker = () => {
    this.setState({ isEndDateTimePickerVisible: true });
  };

  hideStartDateTimePicker = () => {
    this.setState({ isStartDateTimePickerVisible: false });
  };

  hideEndDateTimePicker = () => {
    this.setState({ isEndDateTimePickerVisible: false });
  };

  handleStartDatePicked = date => {
    this.setState({
      startDate: date
    })
    this.hideStartDateTimePicker();
  };

  handleEndDatePicked = date => {
    this.setState({
      endDate: date
    })
    this.hideEndDateTimePicker();
  };


  render() {
    const invitedPeople = this.state.peopleOnInviteList.map((user, i) => {
      return (
        <PeopleCard
          key={i}
          user={user}
          userFbId={user.data.data.fbId}
          name={user.data.data.firstName}
          photoUrl={user.data.data.photoUrl}
          peopleOnInviteList={this.state.peopleOnInviteList}
          fbIdsOnInviteList={this.state.fbIdsOnInviteList}
          removePeopleOnInviteListCallBack={(user) => this.removePeopleFromInviteList(user)}
        />
      )
    });
    return (
      <Container>
        <Text style={styles.listHeader}> Your Invite</Text>

        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Start Date</Label>
              <TouchableOpacity onPress={this.showStartDateTimePicker}><Text>{this.state.startDate.toLocaleString()}</Text></TouchableOpacity>
              <DateTimePicker
                mode={'datetime'}
                isVisible={this.state.isStartDateTimePickerVisible}
                value={this.state.startDate}
                onConfirm={this.handleStartDatePicked}
                onCancel={this.hideStartDateTimePicker}
                datePickerModeAndroid={"spinner"}
                is24Hour={false}
              />

            </Item>
            <Item fixedLabel last>
              <Label>End Date</Label>
              <TouchableOpacity onPress={this.showEndDateTimePicker}><Text>{this.state.endDate.toLocaleString()}</Text></TouchableOpacity>
              <DateTimePicker
                mode={'datetime'}
                isVisible={this.state.isEndDateTimePickerVisible}
                value={this.state.endDate}
                onConfirm={this.handleEndDatePicked}
                onCancel={this.hideEndDateTimePicker}
                datePickerModeAndroid={"spinner"}
                is24Hour={false}
              />
            </Item>
          </Form>

          <List>
            {invitedPeople}
          </List>
          <Button
            medium
            success
            style={styles.inviteButton}
            onPress={() => this.sendInvite()}
          >
            <Text> Send Invite </Text>
          </Button>
        </Content>
        <FooterTabs/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  listHeader: {
    alignSelf: "center",
    fontWeight: "bold"
  },
  inviteButton: {
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: "#00deff"
  }
})