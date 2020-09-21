import React, { Component } from "react";
import RndDemo from "./index";
import { times, indexOf, round, difference } from "lodash";

const element = {
  width: 211,
  height: 115,
  x: 233,
  y: 130
};

class RnDDemoPage extends Component {
  state = {
    isShowBorder: true,
    isShowGrid: true,
    width: 211,
    height: 115,
    x: 233,
    y: 130
  };
  helperArray = [];
  colSpan = 0;
  rnd = React.createRef();

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

  /**
   * Calculate grid size
   * @param {*} n
   * @returns box width
   */
  calculateGridSize = (n, svgDimension = 92, difference = 116) => {
    // const svgWidth = 92;
    // const difference = 116;
    let test = svgDimension + (n - 1) * difference;
    return test;
  };

  customRound = gridDecimalValue => {
    const DIVISOR = parseInt(gridDecimalValue);
    const result = gridDecimalValue % DIVISOR; // get the remainder
    let roundedOffNumber = round(result, 1);

    // rounding off with 0.4 as base value instead of 0.5
    if (roundedOffNumber <= 0.4) {
      return Math.floor(gridDecimalValue);
    }
    return Math.ceil(gridDecimalValue);
  };

  calculateDimensionHandler = (currentWidth, difference = 116) => {
    const gridDecimalValue = currentWidth / difference;
    let result = this.customRound(gridDecimalValue);

    return result;
  };

  onDragStartHandler = e => {
    this.showGridHandler();
  };

  onResizeHandler = (e, direction, ref, delta, position) => {
    console.log("object", ref.offsetHeight, position);
    this.setState({
      x: element.x
    });
  };

  onResizeStartHandler = (e, direction, ref, delta, position) => {
    this.setState({
      x: element.x,
      isResizing: true
    });
  };

  onResizeStopHandler = (e, direction, ref, delta, position) => {
    this.showGridHandler();

    console.log(direction, position);
    let forcedWidth = this.calculateGridSize(
      this.calculateDimensionHandler(ref.offsetWidth, 116)
    );

    let forcedHeight = this.calculateGridSize(
      this.calculateDimensionHandler(ref.offsetHeight, 65),
      49,
      65
    );

    this.setState({
      ...position,
      x: direction === "left" ? element.x : position.x,
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
