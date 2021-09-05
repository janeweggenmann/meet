import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";

class Event extends Component {
  state = {
    open: false,
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    const event = this.props.event;
    return (
      <Card>
        <Card.Header className="event-name">{event.summary}</Card.Header>
        <Card.Text className="event-date">{event.start.dateTime}</Card.Text>
        <Card.Text className="event-location">{event.location}</Card.Text>
        <Button className="event-button" onClick={this.handleClick}>
          Details</Button>
        <Collapse in={this.state.open}>
          <div>
            <p className="event-details">{event.description}</p>
          </div>
        </Collapse>
      </Card>
    );
  }
}

export default Event;