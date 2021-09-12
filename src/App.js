import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import EventGenre from "./EventGenre";
import './nprogress.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { WarningAlert } from './Alert';
import logo from "./logo-title.png";
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


class App extends Component {
  state = {
    events: [],
    locations: [],
    currentLocation: "All",
    numberOfEvents: 32,
    warningText: "",
    showWelcomeScreen: undefined
  };

  // when user updates number of events input, update state and update events
  updateEventCount = (eventCount) => {
    const { currentLocation } = this.state;
    this.setState({
      numberOfEvents: eventCount
    });
    this.updateEvents(currentLocation, eventCount);
  }


  updateEvents = (location) => {
    // if app is offline, show warning message
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
      //filter events to numberOfEvents state and location state
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

  //get data for scatterchart from Google API
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(',').join('').split('-').join('').shift()
      return { city, number };
    })
    return data;
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
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
    if (window.location.href.startsWith("http://localhost")) {
      this.setState({
        showWelcomeScreen: false
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <Container className="App">
        <Row className="Welcome-Screen">
          <Col md={12}>
            <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
              getAccessToken={() => { getAccessToken() }} />
          </Col>
        </Row>
        <Row className="App-Logo" style={{ display: this.state.showWelcomeScreen ? 'none' : 'block' }}>
          <Col md={12}>
            <img src={logo} className="title-logo" alt="Meet Up App Logo" />
            <WarningAlert text={this.state.warningText} />
          </Col>
        </Row >
        <Row className="App-CitySearch" style={{ display: this.state.showWelcomeScreen ? 'none' : 'block' }}>
          <Col md={12} className="CitySearch">
            <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
          </Col>
        </Row >
        <Row className="App-NumberOfEvents" style={{ display: this.state.showWelcomeScreen ? 'none' : 'block' }}>
          <Col md={12}>
            <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEventCount={this.updateEventCount} />
          </Col>
        </Row >
        <Row className="App-Data_Visualization" style={{ display: this.state.showWelcomeScreen ? 'none' : 'block' }}>
          <h5>Events in each city</h5>
          <div className="data-vis-wrapper">
            <EventGenre events={this.state.events} />
            <ResponsiveContainer height={400} >
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="City" interval={0} textAnchor="start" tick={{ angle: 45 }} />
                <YAxis
                  allowDecimals={false}
                  type="number"
                  dataKey="number"
                  name="Number of Events"
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter data={this.getData()} fill="#675b96" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Row>
        <Row className="App-EventList" style={{ display: this.state.showWelcomeScreen ? 'none' : 'block' }}>
          <Col md={12}>
            <EventList events={this.state.events} />
          </Col>
        </Row >
      </Container>
    );
  }
}

export default App;
