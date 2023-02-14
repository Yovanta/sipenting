import styled from "@emotion/styled";

const FormWrap = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  padding: 24px;
  width: 100%;
  .textarea {
    width: 100%;
    height: 100%;
    border: 2px solid black;
    border-radius: 8px;
    padding: 10px;
  }
`;

export default FormWrap;
