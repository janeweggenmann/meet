import React, { Component } from "react";
import Event from "./Event";
import Col from 'react-bootstrap/Col';

class EventList extends Component {
  render() {
    const { events } = this.props;
    return (
      <Col className="EventList">
        {events.map(event =>
          <Col
            key={event.id}
            className="event-card">
            <Event event={event} />
          </Col>
        )}
      </Col>
    );
  }
}

export default EventList;