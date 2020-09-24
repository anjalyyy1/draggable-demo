import React from "react";
import RndDemo from "components/rndDemo/container";
import styled from "styled-components";
import { map, get } from "lodash";

// components
import Grid from "components/Grid";

const Demo = props => {
  const {
    isShowGrid,
    showGridHandler,
    elementsList,
    classNameId,
    getNewPosition,
    getNewDimensions
  } = props;
  const classNameText = `parent${classNameId}`;

  return (
    <PageWrapper isShowGrid={isShowGrid} className={classNameText}>
      {map(elementsList, eachElement => {
        return (
          <RndDemo
            showGridHandler={showGridHandler}
            isShowGrid={isShowGrid}
            classNameText={classNameText}
            elementDetails={eachElement}
            getNewDimensions={getNewDimensions}
            getNewPosition={getNewPosition}
          >
            {React.createElement(
              get(eachElement, `tag`, "h1"),
              get(eachElement, `attributes`)
                ? get(eachElement, `attributes`)
                : null,
              get(eachElement, `content`)
            )}
          </RndDemo>
        );
      })}

      {isShowGrid && (
        <Grid
          colsWidth={116}
          gutterWidthSpace={92}
          colsHeight={65}
          gutterHeightSpace={49}
          isShowGrid={isShowGrid}
        ></Grid>
      )}
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative;
  height: 506px;
  width: 906px;
  margin: auto;
  background: ${props => (props.isShowGrid ? "lightgray" : "transparent")};
  z-index: 8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default Demo;
