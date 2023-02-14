import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Swal from "sweetalert2";

import Logo from "../../Components/Logo";
import background from "../../Assets/BgRegisterAdmin.png";
import Button from "../../Components/Button";
import FormInput from "../../Components/FormInput";
import { AuthRegister } from "../../API/APIAuth";

export default function Register() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const handleClickPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const [isEmptyName, setIsEmptyName] = useState(false);
  const [isEmptyUsername, setIsEmptyUsername] = useState(false);
  const [isEmptyEmail, setIsEmptyEmail] = useState(false);
  const [isEmptyPassword, setIsEmptyPassword] = useState(false);

  const [inputs, setInputs] = useState([
    {
      id: 0,
      name: "name",
      type: "text",
      placeholder: "Name",
      value: "",
      pattern: "^[A-Za-z0-9 ]{4,30}$",
      err: "Must contain at least 4 characters",
    },
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      value: "",
      pattern: "^[A-Za-z0-9]{4,30}$",
      err: "Must contain at least 4 characters",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      value: "",
      pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
      err: "Email must be valid",
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      value: "",
      pattern: "^[A-Za-z0-9]{6,20}$",
      err: "Must contain at least 6 or more characters",
    },
  ]);

  const _handleChange = (value, index) => {
    // value baru
    const newInputs = { ...inputs[index], value };
    // value lama
    const newInputsArr = [...inputs];
    // add to value baru
    newInputsArr[index] = newInputs;

    // setInput di state
    setInputs(newInputsArr);
  };

  const _handleRegister = async (e) => {
    e.preventDefault();
    if (
      inputs[0].value &&
      inputs[1].value &&
      inputs[2].value &&
      inputs[3].value
    ) {
      const data = {
        username: inputs[1].value,
        email: inputs[2].value,
        password: inputs[3].value,
        role: ["admin"],
      };
      setIsEmptyName(false);
      setIsEmptyUsername(false);
      setIsEmptyEmail(false);
      setIsEmptyPassword(false);
      try {
        await AuthRegister(data).then((response) => {
          console.log(response);
          if (response) {
            Swal.fire({
              title: "Register Success",
              confirmButtonColor: "#4C35E0",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/verify", { state: { data } });
              }
            });
          }
        });
      } catch (error) {
        if (error.response) {
          Swal.fire({
            title: "Register Failed",
            text: error.response.data.message,
            confirmButtonColor: "#4C35E0",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/register");
            }
          });
        }
      }
    } else {
      setIsEmptyName(true);
      setIsEmptyUsername(true);
      setIsEmptyEmail(true);
      setIsEmptyPassword(true);
    }
  };
  useEffect(() => {
    if (inputs[0].value.match(inputs[0].pattern)) {
      setIsEmptyName(false);
    }
    if (inputs[1].value.match(inputs[1].pattern)) {
      setIsEmptyUsername(false);
    }
    if (inputs[2].value.match(inputs[2].pattern)) {
      setIsEmptyEmail(false);
    }
    if (inputs[3].value.match(inputs[3].pattern)) {
      setIsEmptyPassword(false);
    }
  }, [inputs]);
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
        <div className="flex justify-center">
          <Logo />
        </div>
        <h4 className="text-base mb-4  text-primary-gray">
          Create Your Account
        </h4>
        <p className="text-center text-error-red">{msg}</p>
        {inputs.map((input, inputIdx) => (
          <div key={inputIdx}>
            <FormInput
              className={`peer m-0 ${
                isEmptyEmail ||
                isEmptyName ||
                isEmptyPassword ||
                isEmptyUsername
                  ? "peer-invalid:visible border-primary-red border-2"
                  : "peer-valid:visible border-secondary-softblue border-2"
              }`}
              {...input}
              value={input.value}
              required
              type={
                input.type === "password"
                  ? isPasswordShown
                    ? "text"
                    : "password"
                  : input.type
              }
              onChange={(e) => _handleChange(e.target.value, inputIdx)}
            />
            {input.name === "name" ? (
              <p
                className={`pb-2 ${
                  isEmptyName
                    ? "peer-invalid:visible text-primary-red invisible"
                    : "invisible"
                }  text-sm`}
              >
                {input.err}
              </p>
            ) : null}

            {input.type === "password" && (
              <span
                className="w-full flex items-center justify-end -mt-10 h-10 -ml-4"
                onClick={handleClickPassword}
              >
                {isPasswordShown ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            )}
            {input.name === "username" ? (
              <p
                className={`pb-2 ${
                  isEmptyUsername
                    ? "peer-invalid:visible text-primary-red invisible"
                    : "invisible"
                }  text-sm`}
              >
                {input.err}
              </p>
            ) : null}
            {input.name === "email" ? (
              <p
                className={`pb-2 ${
                  isEmptyEmail
                    ? "peer-invalid:visible text-primary-red invisible"
                    : "invisible"
                }  text-sm`}
              >
                {input.err}
              </p>
            ) : null}

            {input.name === "password" ? (
              <p
                className={`pb-2 ${
                  isEmptyPassword
                    ? "peer-invalid:visible text-primary-red invisible"
                    : "invisible"
                } text-sm`}
              >
                {input.err}
              </p>
            ) : null}
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
          <Link to="/" className="font-bold text-primary-blue">
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
