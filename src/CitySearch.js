import React, { Component } from "react";
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined,
    infoText: ''
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ showSuggestions: true });
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText: "Oops! We can't find that city. Please try another city.",
      });
    } else {
      this.setState({
        query: value,
        suggestions,
        infoText: ''
      });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false,
      infoText: ''
    });
    this.props.updateEvents(suggestion);
  }

  render() {
    return (
      <div className="CitySearch">
        <p>Enter a location to view events</p>
        <InfoAlert text={this.state.infoText} />
        <input
          type="text"
          className="city"
          placeholder="Berlin, Germany"
          value={this.state.query}
          onChange={this.handleInputChanged}
          onFocus={() => { this.setState({ showSuggestions: true }) }}
        />
        <ul className="suggestions" style={this.state.showSuggestions ? {} : { display: 'none' }}>
          {this.state.suggestions.map((suggestion) => (
            <li key={suggestion} onClick={() => this.handleItemClicked(suggestion)}>
              {suggestion}
            </li>
          ))}
          <li key="All Locations" onClick={() => this.handleItemClicked("All")}>
            <b>All Locations</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;