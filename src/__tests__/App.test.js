import React from "react";
import { shallow, mount } from "enzyme";
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";

//unit testing
describe("<App /> component", () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test("render list of events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test("render CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test("render NumberOfEvents", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

//integration testing
describe("<App /> integration", () => {

  test("App passes 'events' state as a prop to EventList", () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state("events");
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test("App passes 'locations' state as a prop to CitySearch", () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state("locations");
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test("get list of events matching the city selected by the user", async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    // CitySearch's suggestions state has been set to have all available cities
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    // selectedIndex will hold the index of the selected suggestion from the suggestions array
    // evaluates to an integer value ranging from 0 to suggestion.length - 1
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    // use the index to return the actual suggestion, which is stored in selectedCity variable
    const selectedCity = suggestions[selectedIndex];
    // selectedCity has been passed through the click that is mimicked
    // await and async code added because list is being fetched async
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    // list of all events is filtered to only be that of the selectedCity, stored in eventsToShow
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test("get list of all events when user selects 'See all cities'", async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find(".suggestions li");
    await suggestionItems.at(suggestionItems.length - 1).simulate("click");
    const allEvents = await getEvents();
    expect(AppWrapper.state("events")).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test("when number is input, it should change the state of the numberOfEvents", () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    NumberOfEventsWrapper.find(".number-input").simulate("change", {
      target: { value: 15 },
    });
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(15);
  });

  test("when number is input, it should change the state of the App component", async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    NumberOfEventsWrapper.find(".number-input").simulate("change", {
      target: { value: 9 },
    });
    expect(AppWrapper.state("numberOfEvents")).toBe(9);
    AppWrapper.unmount();
  });

  test("length of events should equal what is input for NumberOfEvents", async () => {
    const AppWrapper = mount(<App />);
    const allEvents = await getEvents();
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    NumberOfEventsWrapper.find(".number-input").simulate("change", {
      target: { value: 2 },
    });
    expect(AppWrapper.state("events").length).toBe(2);
    AppWrapper.unmount();
  });


});
