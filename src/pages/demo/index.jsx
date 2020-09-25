import React from "react";
import RndDemo from "components/rndDemo/container";
import styled from "styled-components";
import { map, get } from "lodash";

// components
import Grid from "components/Grid";
import {
  widthWithGutterSpace,
  heightWithGutterSpace,
  rectHeight,
  rectWidth
} from "utils/gridValues";
import Preview from "components/Preview";

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
    <>
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
                {
                  ...(get(eachElement, `src`) && {
                    src: get(eachElement, `src`)
                  }),
                  ...(get(eachElement, `draggable`) && {
                    draggable: get(eachElement, `draggable`)
                  })
                },
                get(eachElement, `content`)
              )}
            </RndDemo>
          );
        })}

        {true && (
          <Grid
            colsWidth={widthWithGutterSpace}
            gutterWidthSpace={rectWidth}
            colsHeight={heightWithGutterSpace}
            gutterHeightSpace={49}
            isShowGrid={isShowGrid}
          ></Grid>
        )}
      </PageWrapper>
      <Preview />
    </>
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
    user-drag: none;
    user-select: none;
  }
`;

export default Demo;
