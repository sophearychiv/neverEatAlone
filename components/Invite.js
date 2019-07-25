import React, { Component } from "react";
import { StyleSheet, DatePickerIOS} from "react-native";
// import moment from 'mosment';
import { Container, Header, Content, List, Form, Item, Label, Input, DatePicker, Text, Button } from 'native-base';
import DateTimePicker from "react-native-modal-datetime-picker";
// import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import PeopleCard from './PeopleCard';
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios';
// import Modal from "react-native-modal";

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
      inviteSent: false
      // chosenDate: new Date()

    };

    // this.setDate = this.setDate.bind(this);
  }

  async componentDidMount(){
    await this.sendInvite();
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

    return axios.post("http://192.168.1.194:4567/invites", config) //home
    // return axios.post("http://localhost:4567/invites", config)
      .then(response => {
        this.setState({
          receipientFbIds: [],
          inviteSent: true
        });
      })
      .catch(error => {
        console.log("error inviting people: " + error);
      })
  }

  setStartDate = (date) => {
    this.setState({ date });
  }

  setEndDate = () => {

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
    console.log("A date has been picked: ", date);
    this.setState({
      startDate: date
    })
    this.hideStartDateTimePicker();
  };

  handleEndDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({
      endDate: date
    })
    this.hideEndDateTimePicker();
  };

  // setDate(newDate) {
  //   this.setState({ chosenDate: newDate });
  // }



  render() {
    const invitedPeople = this.state.peopleOnInviteList.map((user, i) => {
      return (
        <PeopleCard
          key={i}
          user = {user}
          userFbId={user.data.data.fbId}
          name={user.data.data.firstName}
          photoUrl={user.data.data.photoUrl}
          peopleOnInviteList={this.state.peopleOnInviteList}
          fbIdsOnInviteList={this.state.fbIdsOnInviteList}
          removePeopleOnInviteListCallBack={(user) => this.removePeopleFromInviteList(user)}
        // selectPeopleCallBack={()=> this.selectPeople(user)}
        // selectPeopleCallBack={(userFbId)=> this.selectPeople(userFbId)}
        />
      )
    });

    const sendOrConfirm = this.state.inviteSent ? <Text> Invite has been sent! </Text>
        :  <Button
        medium
        danger
        style={styles.inviteButton}
        onPress={() => this.sendInvite()}
      >
        <Text> Send Invite </Text>
      </Button>
    return (
      <Container>
        {/* <Header /> */}
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
          {sendOrConfirm}
        </Content>

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
    marginTop: 10
  }
})