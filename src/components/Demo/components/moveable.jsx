import React, { Component } from "react";
import ResizableRect from "../../draggable/src";

class Demo extends Component {
  state = {
    styling: {
      width: "100%",
      height: "100%",
      position: "relative",
      transition: "filter 0.5s ease",
      "object-fit": "cover"
    }
  };

  handleDrag = (deltaX, deltaY) => {
    let { styling } = this.state;
    let { canvasWidth = 100, canvasHeight = 100, scale = 1 } = this.props;
    deltaX = deltaX / 2;
    // deltaY = deltaY / scaleImg[1];

    let objectPosition = (styling || {})["object-position"];
    let { width = 100 } = styling || {};
    if (objectPosition && typeof objectPosition === "string") {
      objectPosition = objectPosition.split(" ").map(pos => parseFloat(pos));
      if (objectPosition.length === 1) {
        objectPosition[1] = objectPosition[0];
      }
    }
    if (!Array.isArray(objectPosition) || objectPosition.length < 2) {
      objectPosition = [50, 50];
    }
    if (objectPosition.length === 2) {
      //Just to be safe
      let positionShiftLeft = (deltaX * 100) / canvasWidth / scale;
      let positionShiftTop = (deltaY * 100) / canvasHeight / scale;
      let objectPosNew = [];
      objectPosNew[0] = objectPosition[0] - positionShiftLeft;
      objectPosNew[1] = objectPosition[1] - positionShiftTop;
      if (objectPosNew[0] < 0) {
        objectPosNew[0] = 0;
      }
      if (objectPosNew[0] > 100) {
        objectPosNew[0] = 100;
      }
      if (objectPosNew[1] < 0) {
        objectPosNew[1] = 0;
      }
      if (objectPosNew[1] > 100) {
        objectPosNew[1] = 100;
      }
      let zoomValue = parseFloat(width);
      let zoomExtra = zoomValue - 100;
      let left = (objectPosNew[0] * zoomExtra) / 100;
      let top = (objectPosNew[1] * zoomExtra) / 100;

      this.setState({
        styling: {
          ...styling,
          left: `-${left}%`,
          top: `-${top}%`,
          "object-position": objectPosNew.map(pos => pos + "%").join(" ")
        }
      });
    }
  };

  updateElement = ({ styling }) => {
    this.setState({
      styling
    });
  };

  handleDragEnd = () => {
    let { styling } = this.state;

    this.updateElement({ styling });
    // let { updateBackground } = this.props;
    // updateBackground(getCurrentPageId(), {
    //   ...background,
    //   styling
    // });
  };
  render() {
    const { styling } = this.state;

    // let styling = {
    //   width: "100%",
    //   height: "100%"
    // };

    return (
      <div>
        <ResizableRect
          {...styling}
          id={"bg-cropper"}
          width={"100px"}
          height={"100px"}
          // onDrag={() => {
          //   console.log("fgdsghfg");
          // }}
          // onDragEnd={this.handleDragEnd.bind(this)}
        >
          <h3>bdgfgdsg</h3>
        </ResizableRect>
      </div>
    );
  }
}

{
  /* <ResizableRect
  {...styling}
  id={"bg-cropper"}
  width={canvasWidth}
  height={canvasHeight}
  onDrag={this.handleDrag.bind(this)}
  onDragEnd={this.handleDragEnd.bind(this)}
>
  {previewImage}
</ResizableRect>; */
  // background: false,
  //             imgDetails: false,
  //             styling: {},
  //             scaleImg: [2,1],
}

export default Demo;
