import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { map, get, each } from "lodash";

const Preview = () => {
  const fetchPreview = () => {
    const dummyData = JSON.parse(localStorage.getItem("dummyData"));
    console.log("fetch preview", dummyData);
    setDummyData(dummyData);
  };

  const [dummyData, setDummyData] = useState(null);
  useEffect(() => {
    const dummyData = JSON.parse(localStorage.getItem("dummyData"));
    setDummyData(dummyData);
  }, [localStorage.getItem("dummyData")]);

  return (
    <PageWrapper>
      <SaveButtonWrapper>
        <SaveButton onClick={fetchPreview}>Preview</SaveButton>
      </SaveButtonWrapper>
      <GridContainer>
        {map(dummyData, eachElement => {
          return (
            <>
              {React.createElement(
                get(eachElement, `tag`, "h1"),
                {
                  ...(get(eachElement, `src`) && {
                    src: get(eachElement, `src`)
                  }),
                  ...(get(eachElement, `itemGridPosition`) && {
                    style: {
                      ...get(eachElement, `itemGridPosition`)
                    }
                  })
                },
                get(eachElement, `content`)
              )}
            </>
          );
        })}
      </GridContainer>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(8, 49px);
  grid-template-columns: repeat(8, 92px);
  grid-row-gap: 16px;
  grid-column-gap: 24px;
  margin: 0 auto;
  width: 906px;
  margin-bottom: 100px;
`;

const SaveButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 20px;
`;

const SaveButton = styled.span`
  width: 100px;
  height: 50px;
  color: #fff;
  font-size: 20px;
  border: 1px solid #2f94e8;
  background: #2f94e8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default Preview;
