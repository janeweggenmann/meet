import React, { Component } from "react";

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    this.setState({
      query: value,
      suggestions,
    });
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false
    });

    this.props.updateEvents(suggestion);
  }

  render() {
    return (
      <div className="CitySearch">
        <p>Enter a location to view events</p>
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
          <li key="All Locations" onClick={() => this.handleItemClicked("all")}>
            <b>All Locations</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;