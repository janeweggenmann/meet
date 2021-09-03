import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";

describe("<Event /> component", () => {

  let EventCardWrapper;
  beforeAll(() => {
    EventCardWrapper = shallow(<Event />);
  });

  test("render event with information, button to expand, in collapsed state", () => {
    expect(EventCardWrapper.find('.event-name')).toHaveLength(1);
    expect(EventCardWrapper.find('.event-date')).toHaveLength(1);
    expect(EventCardWrapper.find('.event-location')).toHaveLength(1);
    expect(EventCardWrapper.find('.event-button')).toHaveLength(1);
    expect(EventCardWrapper.state('open')).toBe(false);
  });

  test("when details are collapsed, clicking the details button should expand", () => {
    EventCardWrapper.setState({ open: false });
    EventCardWrapper.find('.event-button').at(0).simulate('click');
    expect(EventCardWrapper.state('open')).toBe(true);
  });

  test("when details are expanded, clicking the details button should collapse", () => {
    EventCardWrapper.setState({ open: true });
    EventCardWrapper.find('.event-button').at(0).simulate('click');
    expect(EventCardWrapper.state('open')).toBe(false);
  });

});