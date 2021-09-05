import React, { Component } from "react";
import moment from "moment";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';

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
    const { event } = this.props;
    const eventDate = moment(event.start.dateTime).format("MMMM Do, YYYY - h:mm a");
    return (
      <Col className="event-card">
        <Card>
          <Card.Header className="event-name">{event.summary}</Card.Header>
          <Card.Text className="event-date">{eventDate}</Card.Text>
          <Card.Text className="event-location">{event.location}</Card.Text>
          <Button className="event-button" onClick={this.handleClick}>
            See details</Button>
          <Collapse in={this.state.open}>
            <div>
              <p className="event-details">{event.description}</p>
            </div>
          </Collapse>
        </Card>
      </Col>
    );
  }
}

export default Event;