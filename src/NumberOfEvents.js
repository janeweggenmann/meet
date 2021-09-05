import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    //initial default value is 32
    numberOfEvents: 32,
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({
      numberOfEvents: value
    });
    this.props.updateEventCount(event.target.value);
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <p>Enter the number of events you'd like to view</p>
        <input
          type="text"
          className="number-input"
          value={this.state.numberOfEvents}
          onChange={(e) => this.handleInputChanged(e)}
        />
      </div>
    );
  }
}

export default NumberOfEvents;