import React from "react";
import styled from "styled-components";

// components
import "./App.css";
import Demo from "pages/demo/container";

function App() {
  return (
    <div className="App">
      <SaveButtonWrapper>
        <SaveButton>Save</SaveButton>
      </SaveButtonWrapper>
      <Demo classNameId={"1"} />
      {/* <Demo classNameId={"2"} /> */}
    </div>
  );
}

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

export default App;
