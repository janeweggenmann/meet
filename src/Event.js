import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";

class Event extends Component {
  state = {
    open: false
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    return (
      <Card>
        <Card.Header className="event-name"></Card.Header>
        <Card.Text className="event-date"></Card.Text>
        <Card.Text className="event-location"></Card.Text>
        <Button className="event-button" onClick={this.handleClick}>
          Details</Button>
        <Collapse in={this.state.open}>
          <div>
            <p className="event-details"></p>
          </div>
        </Collapse>
      </Card>
    );
  }
}

export default Event;