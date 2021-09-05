import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import Event from '../Event';
import { mockData } from "../mock-data";

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('the user hasn\'t selected an event', () => {
    });
    let AppWrapper;
    when('the user views the list of event', () => {
      AppWrapper = mount(<App />);
    });
    then('the event elements are collapsed', () => {
      expect(AppWrapper.find(".collapse.show")).toBeNull;
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    let AppWrapper, EventCardWrapper;
    given('the list of events is displayed', () => {
      AppWrapper = mount(<App />);
      expect(AppWrapper.find(".EventList")).toBeDefined;
    });
    when('the user clicks on an event element', () => {
      EventCardWrapper = shallow(<Event event={mockData[0]} />);
      EventCardWrapper.find('.event-button').at(0).simulate('click');
    });
    then('the event element is expanded to show more details', () => {
      expect(AppWrapper.find(".collapse.show")).toBeDefined;
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let AppWrapper, EventCardWrapper;
    given('the event element has been expanded', () => {
      EventCardWrapper = shallow(<Event event={mockData[0]} />);
      EventCardWrapper.setState({ open: true });
    });
    when('the user clicks to collapse the event element', () => {
      EventCardWrapper.find('.event-button').at(0).simulate('click');
    });
    then('the event element is collapsed back to its default position', () => {
      AppWrapper = mount(<App />);
      expect(AppWrapper.find(".collapse.show")).toBeDefined;
    });
  });
});