import React, { Component } from "react";
import Demo from "./index";
import { dummyData } from "./data.js";
import { filter, find } from "lodash";
import { widthWithGutterSpace, heightWithGutterSpace } from "utils/gridValues";

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
    const currentElement = find(dummyData, { _id: elementId });

    console.log({ width, height, x, y });
    const itemGridPosition = {
      gridRowStart: y / heightWithGutterSpace + 1,
      gridColumnStart: x / widthWithGutterSpace + 1,
      gridRowEnd: Math.ceil((y + height) / heightWithGutterSpace) + 1,
      gridColumnEnd: Math.ceil((x + width) / widthWithGutterSpace) + 1
    };

    Object.assign(currentElement, { itemGridPosition });
    localStorage.setItem("dummyData", JSON.stringify(dummyData));
  };

  getNewDimensions = ({ width, height, x, y }, elementId) => {
    this.formatDimensionsForApi({ width, height, x, y }, elementId);
  };

  getNewPosition = ({ width, height, x, y }, elementId) => {
    this.formatDimensionsForApi({ width, height, x, y }, elementId);
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
