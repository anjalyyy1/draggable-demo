import React, { Component } from "react";
import RndDemo from "./index";
import {
  calculateGridSize,
  calculateDimensionHandler
} from "utils/gridCalculations";
import { get } from "lodash";
import {
  widthWithGutterSpace,
  heightWithGutterSpace,
  rectHeight,
  rectWidth
} from "utils/gridValues";

class RnDDemoPage extends Component {
  state = {
    isShowBorder: true,
    width: 0,
    height: 0,
    x: 0,
    y: 0
  };

  componentDidMount() {
    this.setStyling();
  }

  setStyling = () => {
    const { elementDetails } = this.props;

    this.setState({
      ...get(elementDetails, `styling`, {})
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
    this.props.showGridHandler();

    this.setState({
      isResizing: true
    });
  };

  /**
   * calculate the vertical dimensions i.e top distance and height
   * @param {Number} currentValue current top/ height
   * @param {String} direction bottom/top
   * @return {Number} Number of grids the element has to cover
   */
  getElementVerticalDimensions = (currentValue, direction) => {
    const valueToChecked =
      direction === "bottom" ? rectHeight : heightWithGutterSpace;

    return calculateGridSize(
      calculateDimensionHandler(currentValue, heightWithGutterSpace),
      valueToChecked,
      heightWithGutterSpace
    );
  };

  /**
   * calculate the horizontal dimensions i.e width distance and left
   * @param {Number} currentValue current width/ left
   * @param {String} direction right/left
   * @return {Number} number of grids the element has to cover
   */
  getElementHorizontalDimensions = (currentValue, direction) => {
    const valueToChecked =
      direction === "right" ? rectWidth : widthWithGutterSpace;

    return calculateGridSize(
      calculateDimensionHandler(currentValue, widthWithGutterSpace),
      valueToChecked,
      widthWithGutterSpace
    );
  };

  onResizeStopHandler = (e, direction, ref, delta, position) => {
    const elementId = get(this.props, `elementDetails._id`);

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

    this.props.getNewDimensions &&
      this.props.getNewDimensions(
        {
          width: forcedWidth,
          height: forcedHeight,
          x: forcedLeft,
          y: forcedTop
        },
        elementId
      );

    this.setState({
      x: forcedLeft,
      y: forcedTop,
      width: forcedWidth,
      height: forcedHeight,
      isResizing: false
    });

    setTimeout(() => {
      this.props.showGridHandler();
    }, 500);
  };

  onDragStopHandler = (e, data) => {
    const elementId = get(this.props, `elementDetails._id`);

    setTimeout(() => {
      this.props.showGridHandler();
    }, 500);

    console.log(data, "dta");
    this.props.getNewPosition &&
      this.props.getNewPosition(
        {
          width: get(data, `node.offsetWidth`),
          height: get(data, `node.offsetHeight`),
          x: get(data, `lastX`),
          y: get(data, `lastY`)
        },
        elementId
      );
  };

  render() {
    const stateMethodProps = {
      ...this,
      ...this.state,
      ...this.props
    };
    return <RndDemo {...stateMethodProps} />;
  }
}
export default RnDDemoPage;
