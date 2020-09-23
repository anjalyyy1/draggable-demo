import React, { Component } from "react";
import Demo from "./index";

class DemoPage extends Component {
  state = {
    isShowGrid: false
  };

  showGridHandler = () => {
    this.setState({
      isShowGrid: !this.state.isShowGrid
    });
  };

  render() {
    const stateMethodProps = {
      ...this,
      ...this.state,
      ...this.props
    };
    return <Demo {...stateMethodProps} />;
  }
}

export default DemoPage;
