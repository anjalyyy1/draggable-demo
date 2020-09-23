import React from "react";
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
    y
  } = props;

  return (
    <RndContainer
      isResizing={isResizing}
      className="parent"
      isShowGrid={isShowGrid}
      isShowBorder={isShowBorder}
    >
      <Rnd
        className="rnd-wrapper"
        size={{ width, height }}
        position={{ x, y }}
        minWidth={50}
        minHeight={50}
        bounds="parent"
        dragGrid={[116, 65]}
        onResizeStart={onResizeStartHandler}
        onResize={onResizeHandler}
        onResizeStop={onResizeStopHandler}
        onDrag={onDragHandler}
      >
        <DraggableButton
          onMouseOver={showBorderHandler}
          onMouseOut={showBorderHandler}
        >
          Demo
        </DraggableButton>
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
  background: ${props => (props.isShowGrid ? "#d0cdcd" : "transparent")};
  z-index: 8;
  margin-top: 100px;

  .rnd-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${props => !props.isResizing && `all 0.2s ease-in`};
    /* padding: 10px; */
    border: solid 2px ${props => (props.isShowBorder ? "red" : "transparent")};
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
