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
    onResizeHandler
  } = props;

  return (
    <RndContainer
      className="parent"
      isShowGrid={isShowGrid}
      isShowBorder={isShowBorder}
    >
      <Rnd
        className="rnd-wrapper"
        default={{
          x: 112,
          y: 110
          // width: 210,
          // height: 210
        }}
        size={{ width, height }}
        minWidth={50}
        minHeight={50}
        bounds="parent"
        // resizeGrid={[120, 120]}
        // dragGrid={[120, 120]}
        onResizeStart={showGridHandler}
        onResize={onResizeHandler}
        // onResizeStop={showGridHandler}
        onResizeStop={onResizeStopHandler}
        onDrag={onDragHandler}
        onDragStart={showGridHandler}
        onDragStop={showGridHandler}
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
  height: 500px;
  width: 900px;
  margin: auto;
  background: ${props => (props.isShowGrid ? "#d0cdcd" : "transparent")};
  z-index: 8;
  margin-top: 100px;

  .rnd-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: 10px; */
    border: solid 3px ${props => (props.isShowBorder ? "red" : "transparent")};
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
