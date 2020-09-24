import React, { Component } from "react";
import Demo from "./index";
import { dummyData } from "./data.js";

class DemoPage extends Component {
  state = {
    isShowGrid: false,
  };

  componentDidMount() {
    this.setState({
      elementsList: dummyData,
    });
  }

  showGridHandler = () => {
    this.setState({
      isShowGrid: !this.state.isShowGrid,
    });
  };

  render() {
    const stateMethodProps = {
      ...this,
      ...this.state,
      ...this.props,
    };
    return <Demo {...stateMethodProps} />;
  }
}

export default DemoPage;
