import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import Event from '../Event';
import { mockData } from "../mock-data";

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    let AppWrapper, EventCardWrapper;
    given('the user hasn\'t selected an event', () => {
      EventCardWrapper = mount(<Event event={mockData[0]} />);
    });
    when('the user views the list of event', () => {
      AppWrapper = mount(<App />);
    });
    then('the event elements are collapsed', () => {
      expect(EventCardWrapper.find(".event-details")).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    let AppWrapper, EventCardWrapper;
    given('the list of events is displayed', () => {
      EventCardWrapper = mount(<Event event={mockData[0]} />);
      AppWrapper = mount(<App />);
      // expect list to load 2 events from mock data
      expect(AppWrapper.find(".EventList")).toHaveLength(2);
    });
    when('the user clicks on an event element', () => {
      EventCardWrapper.find('.event-button').at(0).simulate('click');
    });
    then('the event element is expanded to show more details', () => {
      expect(EventCardWrapper.find(".event-details")).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let AppWrapper, EventCardWrapper;
    given('the event element has been expanded', () => {
      AppWrapper = mount(<App />);
      EventCardWrapper = mount(<Event event={mockData[0]} />);
      EventCardWrapper.setState({ open: true });
    });
    when('the user clicks to collapse the event element', () => {
      EventCardWrapper.find('.event-button').at(0).simulate('click');
    });
    then('the event element is collapsed back to its default position', () => {
      expect(EventCardWrapper.find(".event-details")).toHaveLength(0);
    });
  });
});