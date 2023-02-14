import styled from "@emotion/styled";
import colors from "../../Utils/Styles/colors";

const FormTextArea = styled.textarea`
  border-radius: 8px;
  padding: 10px;
  min-height: 100px;
  max-height: 100px;
  height: 100px;
  width: 100%;
  border: 2px solid ${colors.primary.softblue};
`;

export default FormTextArea;
