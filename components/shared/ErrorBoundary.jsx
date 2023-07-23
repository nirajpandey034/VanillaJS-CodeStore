import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  state = {
    error: false,
  };
  refreshPage = () => {
    history.go(0);
  };
  static getDerivedStateFromError(error) {
    return { error: true };
  }
  static componentDidCatch(err) {
    console.log("Error:", err);
  }
  render() {
    if (this.state.error) {
      return (
        <div>
          <p>Something broke</p>
          <button onClick={this.refreshPage}>Try Refreshing</button>
        </div>
      );
    }
    return this.props.children;
  }
}
