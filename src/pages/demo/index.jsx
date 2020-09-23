import React from "react";
import RndDemo from "components/rndDemo/container";
import styled from "styled-components";

// components
import Grid from "components/Grid";

const Demo = props => {
  const { isShowGrid, showGridHandler } = props;
  return (
    <PageWrapper isShowGrid={isShowGrid} className="parent">
      <RndDemo showGridHandler={showGridHandler} isShowGrid={isShowGrid}>
        <h2>This is first heading</h2>
      </RndDemo>
      {/* <RndDemo showGridHandler={showGridHandler} isShowGrid={isShowGrid}>
        <h2>This is seconds heading</h2>
      </RndDemo> */}

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
  margin-top: 100px;
`;

export default Demo;
