import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";


describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test("renders number of events text input", () => {
    expect(NumberOfEventsWrapper.find(".number-input")).toHaveLength(1);
  });

  test("default number of events set is 32", () => {
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(32);
  });

  test("renders text input correctly", () => {
    const numberOfEvents = NumberOfEventsWrapper.state("numberOfEvents");
    expect(NumberOfEventsWrapper.find(".number-input").prop("value")).toBe(numberOfEvents);
  });

  test("when number is input, it should change the state of the numberOfEvents", () => {
    NumberOfEventsWrapper.find(".number-input").simulate("change", {
      target: { value: 15 },
    });
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(15);
  });

});