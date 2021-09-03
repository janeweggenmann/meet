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
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="text"
          className="number-input"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;