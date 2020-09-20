import PropTypes from "prop-types";
import React, { Component } from "react";
import Rect from "./Rect";
import { centerToTL, tLToCenter, getNewStyle, degToRadian } from "./utils";

export default class ResizableRect extends Component {
  static propTypes = {
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    rotatable: PropTypes.bool,
    rotateAngle: PropTypes.number,
    scaleX: PropTypes.number,
    scaleY: PropTypes.number,
    parentRotateAngle: PropTypes.number,
    zoomable: PropTypes.string,
    minWidth: PropTypes.number,
    minHeight: PropTypes.number,
    aspectRatio: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    onRotateStart: PropTypes.func,
    onRotate: PropTypes.func,
    onRotateEnd: PropTypes.func,
    onResizeStart: PropTypes.func,
    onResize: PropTypes.func,
    onResizeEnd: PropTypes.func,
    onDragStart: PropTypes.func,
    onDrag: PropTypes.func,
    onDragEnd: PropTypes.func
  };

  static defaultProps = {
    parentRotateAngle: 0,
    rotateAngle: 0,
    rotatable: true,
    zoomable: "",
    minWidth: 10,
    minHeight: 10,
    scaleX: 1,
    scaleY: 1
  };

  handleRotate = (angle, startAngle) => {
    if (!this.props.onRotate) return;
    let rotateAngle = Math.round(startAngle + angle);
    if (rotateAngle >= 360) {
      rotateAngle -= 360;
    } else if (rotateAngle < 0) {
      rotateAngle += 360;
    }
    if (rotateAngle > 356 || rotateAngle < 4) {
      rotateAngle = 0;
    } else if (rotateAngle > 86 && rotateAngle < 94) {
      rotateAngle = 90;
    } else if (rotateAngle > 176 && rotateAngle < 184) {
      rotateAngle = 180;
    } else if (rotateAngle > 266 && rotateAngle < 274) {
      rotateAngle = 270;
    }

    this.props.updateStyling({ rotateAngle });
  };

  handleDragPositionUpdate(newPosition, type) {
    if (!this._isMounted) {
      return newPosition;
    }
    let { snapGrid = true } = this.props;
    let showLeft = false;
    let showTop = false;

    if (snapGrid) {
      let elementId = this.getBlockId();
      let { childIds = [] } = this.state;
      if (!Array.isArray(childIds)) {
        childIds = [];
      }
      let { left = 0, top = 0, width = 0, height = 0 } = newPosition;
      let right = left + width;
      let bottom = top + height;
      let tolerance = 5;
      for (let elId in snapGrid) {
        if (elId === elementId || childIds.includes(elementId)) {
          continue;
        }
        let snapEl = snapGrid[elId];
        if (snapEl[0]) {
          for (let x of snapEl[0]) {
            if (type === "l") {
              if (left <= x + tolerance && left >= x - tolerance) {
                newPosition.left = x;
                let diffWidth = right - (x + width);
                newPosition.width = width + diffWidth;
                showLeft = x;
              }
            }
            if (type === "r") {
              if (right >= x - tolerance && right <= x + tolerance) {
                let diff = x - (left + width);
                newPosition.width = width + diff;
                showLeft = x;
              }
            }
          }
        }
        if (snapEl[1]) {
          for (let y of snapEl[1]) {
            if (type === "t") {
              if (top <= y + tolerance && top >= y - tolerance) {
                newPosition.top = y;
                let diffheight = bottom - (y + height);
                newPosition.height = height + diffheight;
                showTop = y;
              }
            }
            if (type === "b") {
              if (bottom >= y - tolerance && bottom <= y + tolerance) {
                let diff = y - (top + height);
                newPosition.height = height + diff;
                showTop = y;
              }
            }
          }
        }
      }
    }
    let newState = {
      ...newPosition,
      showLeft,
      showTop
    };
    this.setState(newState);
    return newState;
  }

  handleResize(style, type) {
    // let { width: w, height: h } = this.props;
    let { width, top, left, height, rotateAngle = 0 } = this.props;

    // if (width <= this.minHeight) {
    //   width = this.minHeight;
    // }
    // if (height <= this.minHeight) {
    //   height = this.minHeight;
    // }
    console.log(height, width);
    // let oldState = this.state;
    let newState = this.handleDragPositionUpdate(
      {
        rotateAngle: rotateAngle,
        left: left,
        top: top,
        width: width || 100,
        height: height || 100
      },
      type
    );

    console.log(newState, "newState");
    // return {
    //   oldState,
    //   newState
    // };
  }

  handleDrag = (deltaX, deltaY) => {
    this.props.onDrag && this.props.onDrag(deltaX, deltaY);
  };

  handleResizeStart(saveItems = {}) {
    let { left, top, width, height, rotateAngle = 0 } = this.props;

    // this.setState({
    //   isResizing: true,
    //   left: parseFloat(left),
    //   top: parseFloat(top),
    //   width: parseFloat(width),
    //   height: parseFloat(height),
    //   rotateAngle: parseInt(rotateAngle),
    //   ...(saveItems || {})
    // });
    // this.makeBlockActive();
  }

  filterResize(resizeTo) {
    return resizeTo;
  }

  handleResizeEnd() {
    let resizeTo = this.filterResize({
      left: this.props.left + "px",
      top: this.props.top + "px",
      width: this.props.width + "px",
      height: this.props.height + "px"
    });
  }

  render() {
    const {
      top,
      left,
      width,
      height,
      rotateAngle,
      parentRotateAngle,
      zoomable,
      rotatable,
      onRotate,
      onResizeStart,
      onResizeEnd,
      onRotateStart,
      onRotateEnd,
      onDragStart,
      onDragEnd,
      scaleX,
      scaleY,
      children,
      isRotating,
      id = 2,
      borderColor
    } = this.props;

    const styles = tLToCenter({
      top,
      left,
      width,
      height,
      rotateAngle,
      scaleX,
      scaleY
    });

    return (
      <Rect
        styles={styles}
        zoomable={zoomable}
        rotatable={Boolean(rotatable && onRotate)}
        parentRotateAngle={parentRotateAngle}
        onResizeStart={() => this.handleResizeStart()}
        onResize={(style, isShiftPressed, type) => {
          this.handleResize(
            {
              ...style,
              left: style.left - 10,
              top: style.top - 10
            },
            type
          );
        }}
        onResizeEnd={() => this.handleResizeEnd()}
        onRotateStart={onRotateStart}
        onRotate={this.handleRotate}
        onRotateEnd={onRotateEnd}
        onDragStart={onDragStart}
        onDrag={this.handleDrag}
        onDragEnd={onDragEnd}
        className={this.props.className || ""}
        isRotating={isRotating}
        id={id}
        borderColor={borderColor}
      >
        {children}
      </Rect>
    );
  }
}
