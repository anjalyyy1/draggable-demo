import React, { Component } from "react";
import RndDemo from "./index";
import { times, indexOf, round, difference } from "lodash";

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
    return svgDimension + (n - 1) * difference;
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
    return this.customRound(gridDecimalValue);
  };

  onDragStartHandler = e => {
    this.showGridHandler();
  };

  onDragHandler = (e, data) => {
    this.setState({
      x: data.x,
      y: data.y
    });
  };

  onResizeHandler = (e, direction, ref, delta, position) => {
    console.log(ref.offsetWidth, position.x, "widt");
    this.setState({
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      ...position
    });

    // this.getLeftDistance()
  };

  onResizeStartHandler = (e, direction, ref, delta, position) => {
    this.setState({
      isResizing: true
    });
  };

  getLeftDistance = ({ forcedWidth, currentWidth, currentLeft }) => {
    const difference = 116;
    const translateX = currentWidth / difference;
    const result = this.customRound(translateX) * 116;
    // const oldGridValue = element.x / 116;
    // const calculatedGridValue = result / 116;
    // const newGridValue =
    console.log({ result });

    return result;
  };

  onResizeStopHandler = (e, direction, ref, delta, position) => {
    this.showGridHandler();

    const forcedWidth = this.calculateGridSize(
      this.calculateDimensionHandler(ref.offsetWidth, 116)
    );

    const forcedHeight = this.calculateGridSize(
      this.calculateDimensionHandler(ref.offsetHeight, 65),
      49,
      65
    );

    const forcedLeft = this.getLeftDistance({
      forcedWidth,
      currentWidth: ref.offsetWidth,
      currentLeft: position.x
    });

    this.setState({
      x: direction === "left" ? forcedLeft : position.x,
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
