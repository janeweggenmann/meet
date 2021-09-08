import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { WarningAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    currentLocation: "All",
    numberOfEvents: 32,
    warningText: ""
  };

  updateEventCount = (eventCount) => {
    const { currentLocation } = this.state;
    this.setState({
      numberOfEvents: eventCount
    });
    this.updateEvents(currentLocation, eventCount);
  }

  updateEvents = (location) => {
    if (!navigator.onLine) {
      this.setState({
        warningText: "You are offline. These events may not be up-to-date."
      });
    } else {
      this.setState({
        warningText: ""
      });
    }
    getEvents().then((events) => {
      const locationEvents = (location === "All") ?
        events.slice(0, this.state.numberOfEvents) : events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, this.state.numberOfEvents),
          currentLocation: location
        });
      }
    });
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (!navigator.onLine) {
        this.setState({
          warningText: "You are offline. These events may not be up-to-date."
        });
      } else {
        this.setState({
          warningText: ""
        });
      }
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events)
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <Container className="App">
        <Row>
          <Col md={12}>
            <h1>MeetUp</h1>
            <WarningAlert text={this.state.warningText} />
          </Col>
        </Row >
        <Row>
          <Col md={12} className="CitySearch">
            <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
          </Col>
        </Row >
        <Row>
          <Col md={12}>
            <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEventCount={this.updateEventCount} />
          </Col>
        </Row >
        <Row>
          <Col md={12}>
            <EventList events={this.state.events} />
          </Col>
        </Row >
      </Container>
    );
  }
}

export default App;
