import React, { Component } from "react";
import RndDemo from "./index";
import { times, indexOf, round } from "lodash";
class RnDDemoPage extends Component {
  state = {
    isShowBorder: true,
    isShowGrid: true,
    width: 96,
    height: 100
  };
  helperArray = [];
  colSpan = 0;

  setWidthHelper = () => {
    this.helperArray = times(12, (eachElement, index) => {
      return 92 + eachElement * 116;
    });
    this.calculateWidthHandler();
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

  calculateGridSize = n => {
    const svgWidth = 92;
    const difference = 116;
    let test = svgWidth + (n - 1) * difference;
    return test;
  };

  customRound = test => {
    const DIVISOR = parseInt(test);
    const result = test % DIVISOR;
    let roundedOffNumber = round(result, 1);

    if (roundedOffNumber <= 0.4) {
      return Math.floor(test);
    }
    return Math.ceil(test);
  };

  calculateWidthHandler = currentWidth => {
    const DIFFERENCE = 116;
    const test = currentWidth / DIFFERENCE;
    let result = this.customRound(test);

    return result;
  };

  onDragStartHandler = e => {
    this.showGridHandler();
  };

  onResizeHandler = (e, direction, ref, delta, position) => {
    // console.log(ref.style.width, "width");
    console.log(
      ref.style.width,
      this.calculateWidthHandler(ref.offsetWidth),
      "important"
    );
  };

  onResizeStopHandler = (e, direction, ref, delta, position) => {
    this.showGridHandler();

    let test = this.calculateGridSize(
      this.calculateWidthHandler(ref.offsetWidth)
    );

    this.setState({
      width: test,
      height: ref.style.height,
      ...position
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
