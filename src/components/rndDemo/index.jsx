import React, { Children } from "react";
import { Rnd } from "react-rnd";
import styled from "styled-components";

// components
import Grid from "./components/Grid";

const style = {};

export default function RndDemo(props) {
  let {
    isShowBorder,
    isShowGrid,
    showGridHandler,
    showBorderHandler,
    onDragStartHandler,
    width,
    height,
    rnd,
    onDragHandler,
    onDragStopHandler,
    onResizeStopHandler,
    onResizeHandler,
    isResizing,
    onResizeStartHandler,
    x,
    y,
  } = props;

  return (
    <RndContainer
      isResizing={isResizing}
      className="parent"
      isShowGrid={isShowGrid}
      isShowBorder={isShowBorder}
    >
      <Rnd
        ref={(c) => {
          rnd = c;
        }}
        className="rnd-wrapper"
        default={
          {
            // x: 233,
            // y: 130
            // width: 327,
            // height: 115
          }
        }
        size={{ width, height }}
        position={{ x, y }}
        minWidth={50}
        minHeight={50}
        bounds="parent"
        // resizeGrid={[116, 65]}
        dragGrid={[116, 65]}
        onResizeStart={onResizeStartHandler}
        onResize={onResizeHandler}
        // // onResizeStop={showGridHandler}
        onResizeStop={onResizeStopHandler}
        onDrag={onDragHandler}
        // onDragStart={showGridHandler}
        // onDragStop={onDragStopHandler}
      >
        <DraggableButton
          onMouseOver={showBorderHandler}
          onMouseOut={showBorderHandler}
        >
          Demo
        </DraggableButton>
        {/* {children} */}
      </Rnd>

      {/* {isShowGrid && (
        <Grid
          colsWidth={116}
          gutterWidthSpace={92}
          colsHeight={65}
          gutterHeightSpace={49}
        ></Grid>
      )} */}

      <Grid
        colsWidth={116}
        gutterWidthSpace={92}
        colsHeight={65}
        gutterHeightSpace={49}
      ></Grid>
    </RndContainer>
  );
}

const RndContainer = styled.div`
  position: relative;
  height: 506px;
  width: 906px;
  margin: auto;
  background: ${(props) => (props.isShowGrid ? "#d0cdcd" : "transparent")};
  z-index: 8;
  margin-top: 100px;

  .rnd-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${(props) => !props.isResizing && `all 0.2s ease-in`};
    /* padding: 10px; */
    border: solid 2px ${(props) => (props.isShowBorder ? "red" : "transparent")};
  }
`;

const DraggableButton = styled.span`
  width: 88px;
  height: 50px;
  display: flex;
  border: 1px solid black;
  background-color: #0bf13d;
  color: blue;
  justify-content: center;
  align-items: center;
  /* padding: 5px; */
`;
