import React from "react";
import RndDemo from "components/rndDemo/container";
import styled from "styled-components";
import { map, get } from "lodash";

// components
import Grid from "components/Grid";

const Demo = (props) => {
  const { isShowGrid, showGridHandler, elementsList } = props;

  return (
    <PageWrapper isShowGrid={isShowGrid} className="parent">
      {map(elementsList, (eachElement) => {
        console.log(
          get(eachElement, `attributes`),
          "get(eachElement, `attributes`)"
        );
        return (
          <RndDemo
            showGridHandler={showGridHandler}
            isShowGrid={isShowGrid}
            elementDimensions={get(eachElement, `styling`)}
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
  background: ${(props) => (props.isShowGrid ? "lightgray" : "transparent")};
  z-index: 8;
  margin-top: 100px;
`;

export default Demo;
