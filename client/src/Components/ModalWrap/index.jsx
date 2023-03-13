import styled from "@emotion/styled";

const ModalWrap = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  row-gap: 16px;
  overflow-y: auto;
  border: 1px solid black;
  border-radius: 10px;
  align-items: center;
  padding: 10px;
  margin: 10px;
  width: 30%;
  .textarea {
    width: 100%;
    height: 100%;
    border: 2px solid black;
    border-radius: 8px;
    padding: 10px;
  }
`;

export default ModalWrap;
