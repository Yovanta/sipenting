import React, { useState, useContext } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Swal from "sweetalert2";

import background from "../../Assets/bg.png";
import Button from "../../Components/Button";
import FormInput from "../../Components/FormInput";
import FormSelectWrap from "../../Components/FormSelectWrap";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    occupation: "",
    isAdmin: false,
  });

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const handleClickPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const [msg, setMsg] = useState("");

  const [inputs, setInputs] = useState([
    {
      id: 0,
      name: "name",
      type: "text",
      placeholder: "Name",
      value: "",
      pattern: "^[A-Za-z0-9 ]{4,30}$",
      err: "Must contain at least 4 characters",
      showError: false,
    },
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      value: "",
      pattern: "^[A-Za-z0-9]{4,20}$",
      err: "Must contain at least 4 characters",
      showError: false,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      value: "",
      pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
      err: "Email must be valid",
      showError: false,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      value: "",
      pattern: "^[A-Za-z0-9]{6,20}$",
      err: "Must contain at least 6 or more characters",
      showError: false,
    },
    {
      id: 3,
      name: "occupation",
      type: "select",
      placeholder: "Occupation",
      value: "",
      pattern: "^[A-Za-z]{6,20}$",
      err: "Must filled",
      showError: false,
    },
  ]);

  const _handleChange = (value, index) => {
    const newInputs = inputs.map((input, i) => {
      if (i === index) {
        const isValid = new RegExp(input.pattern).test(value);
        return { ...input, value, showError: !isValid };
      }
      return input;
    });
    setInputs(newInputs);

    const valuesArr = newInputs.map((input) => input.value);
    const newData = {
      name: valuesArr[0],
      username: valuesArr[1],
      email: valuesArr[2],
      password: valuesArr[3],
      occupation: valuesArr[4],
    };
    setData(newData);
  };

  console.log(inputs);

  const _handleRegister = async (e) => {
    e.preventDefault();
    if (
      inputs[0].value &&
      inputs[1].value &&
      inputs[2].value &&
      inputs[3].value &&
      inputs[4].value
    ) {
      dispatch({ type: "REGISTER_START" });
      try {
        const res = await axios.post("/auth/register", data);
        dispatch({
          type: "REGISTER_SUCCESS",
          payload: res.data.details,
        });
        Swal.fire({
          icon: "success",
          title: "Registration Success",
          text: "You have successfully registered! Please Check your email for verify account",
        });
        navigate("/login");
      } catch (err) {
        dispatch({ type: "REGISTER_FAIL", payload: err.response.data });
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: err.response.data.message,
        });
      }
    }
  };

  const backgroundImage = {
    backgroundImage: `url(${background})`,
    backgroundSize: "100% 100%",
  };

  return (
    <RegisterWrap style={backgroundImage}>
      <form
        className="max-w-xl w-full m-auto bg-current bg-secondary-softblue rounded-lg shadow-lg shadow-primary-gray3 p-10 "
        onSubmit={_handleRegister}
      >
        <div className="flex justify-center">{/* <Logo /> */}</div>
        <h4 className="text-2xl text-center mb-4">Create Your Account</h4>
        <p className="text-center text-error-red">{msg}</p>
        {inputs.map((input, inputIdx) => (
          <div key={inputIdx}>
            {input.name !== "occupation" ? (
              <FormInput
                {...input}
                value={input.value}
                pattern={input.pattern}
                required
                type={
                  input.type === "password"
                    ? isPasswordShown
                      ? "text"
                      : "password"
                    : input.type
                }
                onChange={(e) => _handleChange(e.target.value, inputIdx)}
                className={`peer m-0 ${
                  input.showError
                    ? "peer-invalid:visible border-primary-red border-2"
                    : "peer-valid:visible border-secondary-softblue border-2"
                }`}
              />
            ) : (
              <FormSelectWrap
                type={input.type}
                pattern={input.pattern}
                required
                onChange={(e) => {
                  console.log(e.target.value);
                  _handleChange(e.target.value, inputIdx);
                }}
                className={`peer m-0 ${
                  input.showError
                    ? "peer-invalid:visible border-primary-red border-2"
                    : "peer-valid:visible border-secondary-softblue border-2"
                }`}
              >
                <option disabled selected>
                  {input.placeholder}
                </option>
                <option value="mahasiswa">Mahasiswa</option>
                <option value="dosen">Dosen</option>
                <option value="others">Others</option>
              </FormSelectWrap>
            )}

            {input.type === "password" && (
              <span
                className="w-full flex items-center justify-end -mt-10 h-10 -ml-4"
                onClick={handleClickPassword}
              >
                {isPasswordShown ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            )}

            <p
              className={`pb-2 ${
                input.showError
                  ? "peer-invalid:visible text-primary-red invisible"
                  : "invisible"
              }  text-sm`}
            >
              {input.err}
            </p>
          </div>
        ))}
        <Button
          type="button"
          onClick={_handleRegister}
          className="bg-primary-blue text-secondary-softblue"
        >
          Register
        </Button>
        <p className="text-sm text-center mt-4">
          Have an account?{" "}
          <Link to="/login" className="font-bold text-primary-blue">
            Login
          </Link>
        </p>
      </form>
    </RegisterWrap>
  );
}

const RegisterWrap = styled.div`
  width: 100%;
  height: 100vh;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
