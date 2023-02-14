import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import firebase from "firebase/compat/app";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { signInWithFirebase, signInWithGoogle } from "../../firebase/utils";
import Background from "../../Assets/bg.png";
import CustomButton from "../../Components/CustomButton";
import Button from "../../Components/Button";
import FormInput from "../../Components/FormInput";
import MutationSignIn from "../../GraphQL/Hooks/SignIn";

export default function Login() {
  const [isEmptyEmail, setIsEmptyEmail] = useState(false);
  const [isEmptyPassword, setIsEmptyPassword] = useState(false);
  const [userIdToken, setUserIdToken] = useState("");
  const [inputs, setInputs] = useState([
    {
      id: 0,
      type: "email",
      placeholder: "Email",
      value: "",
      pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
      err: "Email must be valid",
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
    console.log(newInputsArr);
  };

  const { addUser, data, error } = MutationSignIn();
  // const handleSignIn = async (e) => {
  //   e.preventDefault();
  //   if (inputs[0].value && inputs[1].value) {
  //     const data = {
  //       email: inputs[0].value,
  //       password: inputs[1].value,
  //     };
  //     setIsEmptyEmail(false);
  //     setIsEmptyPassword(false);
  //     try {
  //       const response = await signInWithFirebase(data);
  //       console.log(response);
  //       addUser({
  //         variables: {
  //           email: response.email,
  //           password: response.password,
  //           token: response.idToken,
  //         },
  //       });
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   }
  // };

  // const handleLoginGoogle = async (e) => {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   try {
  //     const { user } = await firebase.auth().signInWithPopup(provider);
  //     if (user) {
  //       await addUser({
  //         variables: {
  //           email: user.email,
  //           password: user.password,
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     // setIsError(true);
  //     console.error(error.message);
  //   }
  // };

  const backgroundImage = {
    backgroundImage: `url(${Background})`,
    backgroundSize: "100% 100%",
  };

  useEffect(() => {
    if (inputs[0].value.match(inputs[0].pattern)) {
      setIsEmptyEmail(false);
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
            <h1 className="text-3xl font-bold"> Sign in to Account</h1>
            <CustomButton
              // onClick={handleLoginGoogle}
              className="flex flex-wrap max-w-fit p-2 gap-2 items-center rounded-sm bg-primary-blue text-primary-white"
            >
              <div className="bg-primary-white p-2">
                <FcGoogle />
              </div>
              <h2 className="font-bold">Sign in with Google</h2>
            </CustomButton>
            <div className="w-full flex items-center gap-2">
              <hr className="w-1/2 border-1" />
              <h3 className="font-bold">OR</h3>
              <hr className="w-1/2 border-1" />
            </div>
            <p>Enter your email address and password</p>
          </div>
          <div>
            {inputs.map((input, inputIdx) => (
              <div key={inputIdx}>
                <FormInput
                  className={`my-0 ${
                    isEmptyEmail || isEmptyPassword
                      ? "peer-invalid:visible border-primary-red border-2"
                      : "peer-valid:visible border-secondary-softblue border-2"
                  }`}
                  {...input}
                  value={input.value}
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

                {input.type === "email" ? (
                  <p
                    className={`${
                      isEmptyEmail
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

            <div
              style={{
                textAlign: "end",
              }}
              className="py-2"
            >
              <a href="/forgot">Forgot password?</a>
            </div>

            <Button
              className="rounded w-full border-1 bg-primary-blue text-secondary-softblue"
              type="button"
              // onClick={handleSignIn}
            >
              Login
            </Button>

            <div className="mt-4 text-center">
              <p className="text-sm">
                Don't have an account?{" "}
                <a className="text-primary-blue" href="/register">
                  Register
                </a>
              </p>
            </div>
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
