import React from "react";

const Grid = ({
  colsWidth,
  gutterWidthSpace,
  colsHeight,
  gutterHeightSpace
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="grid-tiles__svg">
      <defs>
        <pattern
          id="grid-pattern-BAYMmkuk5"
          height={`${colsHeight}px`}
          width={`${colsWidth}px`}
          patternUnits="userSpaceOnUse"
          className="grid-tiles__pattern-outer"
        >
          <rect
            fill="white"
            height={`${gutterHeightSpace}px`}
            width={`${gutterWidthSpace}px`}
            rx="3"
            x="0.5"
            y="0.5"
            stroke-width="1"
            className="grid-tiles__pattern-inner"
          ></rect>
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#grid-pattern-BAYMmkuk5)"
      ></rect>
    </svg>
  );
};

export default Grid;
