import React, { Component } from "react";
import Demo from "./index";
import { dummyData } from "./data.js";
import { filter } from "lodash";

class DemoPage extends Component {
  state = {
    isShowGrid: true
  };

  componentDidMount() {
    localStorage.setItem("dummyData", JSON.stringify(dummyData));
    this.setState({
      elementsList: JSON.parse(localStorage.getItem("dummyData"))
    });
  }

  showGridHandler = () => {
    this.setState({
      isShowGrid: true
    });
  };

  formatDimensionsForApi = ({ width, height, x, y }, elementId) => {
    const dummyData = JSON.parse(localStorage.getItem("dummyData"));
    let currentElement = filter(dummyData, eachData => {
      return eachData._id === elementId;
    });

    const postData = {
      ...currentElement[0],
      gridGap: "16px 116px", // No need actually
      "grid-column-start": x / 116,
      "grid-row-start": y / 65
    };

    console.log(postData, "post data");
  };

  getNewDimensions = ({ width, height, x, y }, elementId) => {
    this.formatDimensionsForApi({ width, height, x, y }, elementId);
  };

  getNewPosition = ({ x, y }, elementId) => {
    this.formatDimensionsForApi({ x, y }, elementId);
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
