import React from "react";
import { Rnd } from "react-rnd";
import styled from "styled-components";

// components
import { widthWithGutterSpace, heightWithGutterSpace } from "utils/gridValues";
const style = {};

export default function RndDemo(props) {
  let {
    isShowBorder,
    isShowGrid,
    showGridHandler,
    width,
    height,
    onDragHandler,
    onDragStopHandler,
    onResizeStopHandler,
    onResizeHandler,
    isResizing,
    onResizeStartHandler,
    x,
    y,
    children,
    classNameText,
  } = props;

  return (
    <RndContainer
      isResizing={isResizing}
      isShowGrid={isShowGrid}
      isShowBorder={isShowBorder}
    >
      <Rnd
        className="rnd-wrapper"
        size={{ width, height }}
        position={{ x, y }}
        minWidth={50}
        minHeight={50}
        bounds={`.${classNameText}`}
        dragGrid={[widthWithGutterSpace, heightWithGutterSpace]}
        onResizeStart={onResizeStartHandler}
        onResize={onResizeHandler}
        onResizeStop={onResizeStopHandler}
        onDrag={onDragHandler}
        onDragStart={showGridHandler}
        onDragStop={onDragStopHandler}
      >
        {children}
      </Rnd>
    </RndContainer>
  );
}

const RndContainer = styled.div`
  .rnd-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${(props) => !props.isResizing && `all 0.2s ease-in`};
    border: solid 2px ${(props) => (props.isShowBorder ? "red" : "transparent")};
  }
`;
