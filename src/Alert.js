import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
    };
  }

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "#CD5C5C";
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = '#CD5C5C';
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = '#FFA07A';
  }
}

export { InfoAlert, ErrorAlert, WarningAlert };