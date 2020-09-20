import React, { Component } from "react";
import ResizableRect from "../../draggable/src";

const DEFAULT_ZOOM_POINTS = "n, w, s, e, nw, ne, se, sw";
class Demo extends Component {
  state = {
    styling: {
      width: "100%",
      height: "100%",
      position: "relative",
      transition: "filter 0.5s ease",
      "object-fit": "cover",
      top: "0"
    }
  };

  updateStyling = updatedStyling => {
    const { styling } = this.state;

    this.setState({
      styling: {
        ...styling,
        ...updatedStyling
      }
    });
  };

  render() {
    // TODO now we are taking this from state after this component is ready as a common component take styling from props
    const { styling } = this.state;

    return (
      <div className="test">
        <ResizableRect
          updateStyling={this.updateStyling}
          {...styling}
          id={"bg-cropper"}
          width={"100px"}
          height={"100px"}
          onResize={true}
          onRotate={true}
          onDragEnd={this.handleDragEnd}
          borderColor="green"
          zoomable={DEFAULT_ZOOM_POINTS}
          
        >
          <h3>bdgfgdsg</h3>
        </ResizableRect>
      </div>
    );
  }
}

export default Demo;
