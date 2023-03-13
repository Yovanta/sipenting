import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../Components/Button";
import FormInput from "../../Components/FormInput";
import FormWrapModal from "../../Components/FormWrapModal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function ModalProfile({ isOpen, onClose, user }) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    occupation: "",
    photo: "",
  });

  const [msg, setMsg] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleClickPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const [inputs, setInputs] = useState([
    {
      id: 0,
      name: "name",
      type: "text",
      placeholder: "Your Name",
      value: user.name,
      required: true,
    },
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      value: user.username,
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Your Email",
      value: user.email,
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "password",
      value: user.password,
      required: true,
    },
    {
      id: 4,
      name: "occupation",
      type: "text",
      placeholder: "Occupation",
      value: user.occupation,
      required: true,
    },
    {
      id: 5,
      name: "photo",
      type: "file",
      placeholder: "image",
      value: user?.photo,
    },
  ]);

  const handleChange = (value, index) => {
    setInputs(
      inputs.map((input) => {
        if (input.id === index) {
          return {
            ...input,
            value,
          };
        }
        return input;
      })
    );
    setData({
      ...data,
      [inputs[index].name]: value,
    });
  };

  const [profile, setProfile] = useState("");
  console.log(profile);

  const uploadProfile = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setProfile(base64);
    console.log(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const _handleCreateRoom = (e) => {
    if (
      inputs[0].value &&
      inputs[1].value &&
      inputs[2].value &&
      inputs[3].value &&
      inputs[4].value &&
      inputs[5].value
    ) {
      // insertDataRoom({
      //   variables: {
      //       room_name: inputs[0].value,
      //       building_id: inputs[1].value,
      //       room_description: inputs[3].value,
      //       price_per_day: inputs[4].value,
      //       floor: inputs[6].value,
      //       thumbnail: profile,
      //       status: false,
      //     // }
      //   }
      // })
      e.preventDefault();
      navigate("/room");

      setInputs([
        {
          id: 0,
          name: "name",
          type: "text",
          placeholder: "Your Name",
          value: user.name,
          required: true,
        },
        {
          id: 1,
          name: "username",
          type: "text",
          placeholder: "Username",
          value: user.username,
          required: true,
        },
        {
          id: 2,
          name: "email",
          type: "email",
          placeholder: "Your Email",
          value: user.email,
          required: true,
        },
        {
          id: 3,
          name: "password",
          type: "password",
          placeholder: "password",
          value: user.password,
          required: true,
        },
        {
          id: 4,
          name: "occupation",
          type: "text",
          placeholder: "Occupation",
          value: user.occupation,
          required: true,
        },
        {
          id: 5,
          name: "photo",
          type: "file",
          placeholder: "image",
          value: user?.photo,
        },
      ]);
    } else {
      setMsg("Please fill all the fields");
    }
  };

  const _handleClose = (e) => {
    e.preventDefault();
    onClose();
    setInputs([
      {
        id: 0,
        name: "name",
        type: "text",
        placeholder: "Your Name",
        value: user.name,
        required: true,
      },
      {
        id: 1,
        name: "username",
        type: "text",
        placeholder: "Username",
        value: user.username,
        required: true,
      },
      {
        id: 2,
        name: "email",
        type: "email",
        placeholder: "Your Email",
        value: user.email,
        required: true,
      },
      {
        id: 3,
        name: "password",
        type: "password",
        placeholder: "password",
        value: user.password,
        required: true,
      },
      {
        id: 4,
        name: "occupation",
        type: "text",
        placeholder: "Occupation",
        value: user.occupation,
        required: true,
      },
      {
        id: 5,
        name: "photo",
        type: "file",
        placeholder: "image",
        value: user?.photo,
      },
    ]);
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-secondary-blackrgba">
          <div className="flex flex-wrap items-center justify-center min-h-screen">
            <div className="fixed inset-0"></div>
            <FormWrapModal onSubmit={_handleCreateRoom}>
              <div className="flex flex-col items-center justify-between mb-2 overflow-y-auto z-20">
                <div className="w-full flex justify-between my-4">
                  <h3 className="text-2xl text-left font-bold">My Account</h3>
                  <IoIosCloseCircleOutline
                    onClick={_handleClose}
                    className="top-8 right-8 text-primary-black text-3xl cursor-pointer"
                  />
                </div>
                <p className="has-text-centered text-error-red">{msg}</p>
                <img
                  src={
                    user?.photo || profile
                      ? `${profile}`
                      : "https://i.ibb.co/MBtjqXQ/no-avatar.gif"
                  }
                  alt="profile"
                  className="w-32 h-32 rounded-full mb-2"
                />
                <div className="w-full grid grid-col gap-4">
                  {inputs.map((input, inputIdx) =>
                    input.name === "photo" ? (
                      <FormInput
                        type="file"
                        id="gambar"
                        onChange={(e) => uploadProfile(e)}
                      />
                    ) : (
                      <div>
                        <FormInput
                          key={inputIdx}
                          {...input}
                          value={input.value}
                          type={
                            input.type === "password"
                              ? isPasswordShown
                                ? "text"
                                : "password"
                              : input.type
                          }
                          onChange={(e) =>
                            handleChange(e.target.value, inputIdx)
                          }
                        />
                        {input.type === "password" && (
                          <span
                            className="w-full flex items-center justify-end -mt-11 h-10 -ml-4"
                            onClick={handleClickPassword}
                          >
                            {isPasswordShown ? (
                              <AiFillEyeInvisible />
                            ) : (
                              <AiFillEye />
                            )}
                          </span>
                        )}
                      </div>
                    )
                  )}

                  <div className="w-full flex justify-between">
                    <div className="w-full flex items-center gap-4">
                      <Button
                        className="font-bold bg-secondary-softblue text-primary-blue uppercase px-6 py-3 text-xs rounded shadow mb-1 cursor-pointer"
                        type="button"
                        onClick={_handleClose}
                      >
                        Close
                      </Button>
                      <Button
                        className="bg-primary-blue text-primary-white font-bold w-full uppercase text-xs px-2 py-3 rounded shadow mb-1"
                        type="button"
                        onClick={_handleCreateRoom}
                      >
                        Update Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </FormWrapModal>
          </div>
        </div>
      ) : null}
    </>
  );
}
