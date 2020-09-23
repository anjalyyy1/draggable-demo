import React, { Component } from "react";
import RndDemo from "./index";
import {
  calculateGridSize,
  calculateDimensionHandler
} from "utils/gridCalculations";

const element = {
  width: 211,
  height: 115,
  x: 348,
  y: 130
};

const widthWithGutterSpace = 116; // also width difference
const heightWithGutterSpace = 65; // also height difference
const rectHeight = 49;
const rectWidth = 92;

class RnDDemoPage extends Component {
  state = {
    isShowBorder: true,
    isShowGrid: true,
    width: 211,
    height: 115,
    x: 348,
    y: 130
  };

  showGridHandler = () => {
    this.setState({
      isShowGrid: true
    });
  };

  showBorderHandler = () => {
    this.setState({
      isShowBorder: !this.state.isShowBorder
    });
  };

  onDragHandler = (e, data) => {
    this.setState({
      x: data.x,
      y: data.y
    });
  };

  onResizeHandler = (e, direction, ref, delta, position) => {
    this.setState({
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      ...position
    });
  };

  onResizeStartHandler = (e, direction, ref, delta, position) => {
    this.setState({
      isResizing: true
    });
  };

  getElementVerticalDimensions = (value, direction) => {
    const valueToChecked =
      direction === "bottom" ? rectHeight : heightWithGutterSpace;

    return calculateGridSize(
      calculateDimensionHandler(value, heightWithGutterSpace),
      valueToChecked,
      heightWithGutterSpace
    );
  };

  getElementHorizontalDimensions = (value, direction) => {
    const valueToChecked =
      direction === "right" ? rectWidth : widthWithGutterSpace;

    return calculateGridSize(
      calculateDimensionHandler(value, widthWithGutterSpace),
      valueToChecked,
      widthWithGutterSpace
    );
  };

  onResizeStopHandler = (e, direction, ref, delta, position) => {
    this.showGridHandler();

    // get the new forced dimensions
    const forcedWidth = this.getElementHorizontalDimensions(
      ref.offsetWidth,
      "right"
    );
    const forcedLeft = this.getElementHorizontalDimensions(position.x, "left");

    const forcedHeight = this.getElementVerticalDimensions(
      ref.offsetHeight,
      "bottom"
    );
    const forcedTop = this.getElementVerticalDimensions(position.y, "top");

    this.setState({
      x: forcedLeft,
      y: forcedTop,
      width: forcedWidth,
      height: forcedHeight,
      isResizing: false
    });
  };

  render() {
    const stateMethodProps = {
      ...this,
      ...this.state,
      ...this.props
    };
    return (
      <div>
        <RndDemo {...stateMethodProps} />
      </div>
    );
  }
}
export default RnDDemoPage;
