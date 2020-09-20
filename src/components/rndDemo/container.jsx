import React, { Component } from "react";
import RndDemo from "./index";
import { times, indexOf } from "lodash";

class RnDDemoPage extends Component {
  state = {
    isShowBorder: true,
    isShowGrid: true,
    width: 96,
    height: 100
  };

  helperArray = [];
  colSpan = 0;

  componentDidMount() {
    this.setWidthHelper();
  }

  setWidthHelper = () => {
    this.helperArray = times(12, (eachElement, index) => {
      return 92 + eachElement * 116;
    });
    this.calculateWidthHandler();
  };

  //  92 + 24 + 92  = 208 ==== 2 grid

  showGridHandler = () => {
    this.setState({
      isShowGrid: true
    });
  };

  // a + (n – 1) × d

  showBorderHandler = () => {
    this.setState({
      isShowBorder: !this.state.isShowBorder
    });
  };

  calculateWidth = n => {
    const svgWidth = 92;
    const difference = 116;

    let test = svgWidth + (n - 1) * difference;
    return test;
  };

  calculateWidthHandler = currentWidth => {
    let helperArrayCopy = [...this.helperArray];
    helperArrayCopy.push(currentWidth);
    helperArrayCopy.sort(function (a, b) {
      return a - b;
    });

    let indexOfCurrentElement = indexOf(helperArrayCopy, currentWidth);

    if (
      Math.abs(helperArrayCopy[indexOfCurrentElement - 1] - currentWidth) <
      Math.abs(helperArrayCopy[indexOfCurrentElement + 1] - currentWidth)
    ) {
      return helperArrayCopy[indexOfCurrentElement - 1];
    } else {
      return helperArrayCopy[indexOfCurrentElement + 1];
    }
  };

  onDragStartHandler = e => {
    this.showGridHandler();
  };

  onResizeStopHandler = (e, direction, ref, delta, position) => {
    this.showGridHandler();
    this.calculateWidthHandler(ref.offsetWidth);
    // console.log(ref.style.width, this.state.width);

    // if (ref.offsetWidth < this.state.width) {
    //   this.colSpan--;
    // } else if (ref.offsetWidth > this.state.width) {
    //   this.colSpan++;
    // }

    // delta = this.calculateWidth(this.colSpan);

    this.setState({
      // width: this.calculateWidth(this.colSpan++),
      width: this.calculateWidthHandler(ref.offsetWidth),
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
