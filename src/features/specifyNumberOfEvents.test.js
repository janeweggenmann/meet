import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import NumberOfEvents from "../NumberOfEvents";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
    given('the user has not specified a number', () => {
    });
    let AppWrapper;
    when('the list of events is displayed', () => {
      AppWrapper = mount(<App />);
      expect(AppWrapper.find('.EventList')).toBeDefined;
    });
    then('the number of events shown is 32 by default', () => {
      expect(AppWrapper.state("numberOfEvents")).toBe(32);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper, NumberOfEventsWrapper;
    given('the list of events is displayed', () => {
      AppWrapper = mount(<App />);
      expect(AppWrapper.find('.EventList')).toBeDefined;
    });
    when('the user has entered the number of events they want to see', () => {
      NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      NumberOfEventsWrapper.find(".number-input").simulate("change", {
        target: { value: 4 },
      });
    });
    then('the app shows the number of events the user has entered', () => {
      expect(AppWrapper.state("numberOfEvents")).toBe(4);
    });
  });
});