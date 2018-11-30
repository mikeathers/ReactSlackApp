import React, { Component } from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setColours } from "../../actions";
import {
  Sidebar,
  Divider,
  Button,
  Menu,
  Modal,
  Icon,
  Label,
  Segment
} from "semantic-ui-react";
import { SliderPicker } from "react-color";

class ColorPanel extends Component {
  state = {
    usersRef: firebase.database().ref("users"),
    user: this.props.currentUser,
    usersColours: [],
    modal: false,
    primary: "",
    secondary: ""
  };

  componentDidMount() {
    if (this.state.user) {
      this.addListener(this.state.user.uid);
    }
  }

  componentWillUnmount() {
    this.removeListener();
  }

  removeListener = () => {
    this.state.usersRef.child(`${this.state.user.uid}/colours`).off();
  };

  addListener = userId => {
    let usersColours = [];
    this.state.usersRef.child(`${userId}/colours`).on("child_added", snap => {
      usersColours.unshift(snap.val());
      this.setState({ usersColours });
    });
  };

  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });

  handleChangePriamry = colour => this.setState({ primary: colour.hex });
  handleChangeSecondary = colour => this.setState({ secondary: colour.hex });

  handleSaveColours = () => {
    if (this.state.primary && this.state.secondary) {
      this.saveColours(this.state.primary, this.state.secondary);
    }
  };

  saveColours = (primary, secondary) => {
    this.state.usersRef
      .child(`${this.state.user.uid}/colours`)
      .push()
      .update({ primary, secondary })
      .then(() => {
        console.log("colours added");
        this.closeModal();
      })
      .catch(err => console.error(err));
  };

  displayUserColours = userColours =>
    userColours.length > 0 &&
    userColours.map((colour, i) => (
      <React.Fragment key={i}>
        <Divider />
        <div
          className="colour__container"
          onClick={() =>
            this.props.setColours(colour.primary, colour.secondary)
          }
        >
          <div
            className="colour__square"
            style={{ background: colour.primary }}
          >
            <div
              className="colour__overlay"
              style={{ background: colour.secondary }}
            />
          </div>
        </div>
      </React.Fragment>
    ));

  render() {
    const { modal, primary, secondary, usersColours } = this.state;

    return (
      <Sidebar
        as={Menu}
        icon="labeled"
        inverted
        vertical
        visible
        width="very thin"
      >
        <Divider />
        <Button icon="add" size="small" color="blue" onClick={this.openModal} />
        {this.displayUserColours(usersColours)}

        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Choose App Colours</Modal.Header>
          <Modal.Content>
            <Segment inverted>
              <Label content="Primary Colour" />
              <SliderPicker
                color={primary}
                onChange={this.handleChangePriamry}
              />
            </Segment>
            <Segment inverted>
              <Label content="Secondary Colour" />
              <SliderPicker
                color={secondary}
                onChange={this.handleChangeSecondary}
              />
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
            <Button color="green" inverted onClick={this.handleSaveColours}>
              <Icon name="checkmark" /> Save Colours
            </Button>
          </Modal.Actions>
        </Modal>
      </Sidebar>
    );
  }
}

export default connect(
  null,
  { setColours }
)(ColorPanel);
