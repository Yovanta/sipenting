import styled from "@emotion/styled";

const ModalWrap = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  border: 1px solid black;
  border-radius: 10px;
  align-items: center;
  padding: 24px;
  width: 40%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default ModalWrap;
