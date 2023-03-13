import React, { useEffect, useState, useContext } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import Background from "../../Assets/bg.png";
import Button from "../../Components/Button";
import FormInput from "../../Components/FormInput";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const [isEmptyusername, setIsEmptyUsername] = useState(false);
  const [isEmptyPassword, setIsEmptyPassword] = useState(false);
  const [userIdToken, setUserIdToken] = useState("");
  const [inputs, setInputs] = useState([
    {
      id: 0,
      type: "username",
      placeholder: "Your username...",
      value: "",
      pattern: "/^[a-zA-Z0-9]+$/",
      err: "username must be valid",
    },
    {
      id: 1,
      type: "password",
      placeholder: "Password",
      value: "",
      pattern: "^[A-Za-z0-9]{6,12}$",
      err: "Must contain at least 6 or more characters",
    },
  ]);
  const [msg, setMsg] = useState("");

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleClickPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const handleChange = (value, index) => {
    const newInputs = { ...inputs[index], value };
    const newInputsArr = [...inputs];
    newInputsArr[index] = newInputs;
    setInputs(newInputsArr);

    const valuesArr = newInputsArr.map((input) => input.value);
    const newCredentials = {
      username: valuesArr[0],
      password: valuesArr[1],
    };
    setCredentials(newCredentials);
  };

  console.log(inputs);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data.isAdmin) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data.details,
        });
        navigate("/dashboard");
      } else {
        dispatch({
          type: "LOGIN_FAIL",
          payload: { message: "You are not allowed" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAIL", payload: err.response.data });
    }
  };

  const backgroundImage = {
    backgroundImage: `url(${Background})`,
    backgroundSize: "100% 100%",
  };

  useEffect(() => {
    if (inputs[0].value.match(inputs[0].pattern)) {
      setIsEmptyUsername(false);
    }
    if (inputs[1].value.match(inputs[1].pattern)) {
      setIsEmptyPassword(false);
    }
  }, [inputs]);

  return (
    <LoginWrap style={backgroundImage}>
      <div className="flex h-screen">
        <form className="max-w-xl w-full m-auto bg-current bg-secondary-softblue rounded-lg shadow-lg shadow-primary-gray3 p-10 ">
          <div className="flex flex-col gap-4 justify-center items-center text-center mb-4">
            {/* <Logo /> */}
            <h1 className="text-3xl font-bold"> Sign in to Admin Account</h1>

            {error && (
              <span className="text-xs text-primary-red">{error.message}</span>
            )}
          </div>
          <div>
            {inputs.map((input, inputIdx) => (
              <div key={inputIdx}>
                <FormInput
                  className={`my-0 ${
                    isEmptyusername || isEmptyPassword
                      ? "peer-invalid:visible border-primary-red border-2"
                      : "peer-valid:visible border-secondary-softblue border-2"
                  }`}
                  {...input}
                  value={input.value}
                  id={input.type}
                  type={
                    input.type === "password"
                      ? isPasswordShown
                        ? "text"
                        : "password"
                      : input.type
                  }
                  required
                  onChange={(e) => handleChange(e.target.value, inputIdx)}
                />

                {input.type === "password" && (
                  <span
                    className="w-full flex items-center justify-end -mt-10 h-10 -ml-4"
                    onClick={handleClickPassword}
                  >
                    {isPasswordShown ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                )}

                {input.type === "username" ? (
                  <p
                    className={`${
                      isEmptyusername
                        ? "peer-invalid:visible text-primary-red "
                        : "invisible"
                    }`}
                  >
                    {input.err}
                  </p>
                ) : null}
                {input.type === "password" ? (
                  <p
                    className={`${
                      isEmptyPassword
                        ? "peer-invalid:visible text-primary-red "
                        : "invisible"
                    }`}
                  >
                    {input.err}
                  </p>
                ) : null}
              </div>
            ))}

            <div className="py-2 items-end">
              <a href="/forgot">Forgot password?</a>
            </div>

            <Button
              className="rounded w-full border-1 bg-primary-blue text-secondary-softblue"
              type="button"
              onClick={handleLogin}
              disabled={loading}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </LoginWrap>
  );
}

const LoginWrap = styled.div`
  width: 100%;
  height: 100vh;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
