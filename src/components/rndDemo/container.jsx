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

  getTopDistance = ({ currentTop }) => {
    const heightWithGutterSpace = 65;
    const difference = 65;
    const forcedHeight = calculateGridSize(
      calculateDimensionHandler(currentTop, difference),
      heightWithGutterSpace,
      difference
    );

    return forcedHeight;
  };

  getLeftDistance = ({ currentLeft }) => {
    const difference = 116;
    const widthWithGutterSpace = 116;
    const forcedLeft = calculateGridSize(
      calculateDimensionHandler(currentLeft, difference),
      difference,
      widthWithGutterSpace
    );

    return forcedLeft;
  };

  onResizeStopHandler = (e, direction, ref, delta, position) => {
    this.showGridHandler();

    // get the new forced dimensions
    const forcedWidth = calculateGridSize(
      calculateDimensionHandler(ref.offsetWidth, 116)
    );
    const forcedHeight = calculateGridSize(
      calculateDimensionHandler(ref.offsetHeight, 65),
      49,
      65
    );
    const forcedLeft = this.getLeftDistance({ currentLeft: position.x });
    const forcedTop = this.getTopDistance({ currentTop: position.y });

    this.setState({
      x: direction === "left" ? forcedLeft : position.x,
      y: direction === "top" ? forcedTop : position.y,
      width: forcedWidth,
      height:
        direction === "top" ||
        direction === "bottom" ||
        direction === "bottomRight" ||
        direction === "bottomLeft"
          ? forcedHeight
          : ref.offsetHeight,

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
