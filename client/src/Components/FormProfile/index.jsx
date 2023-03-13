import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FormInput from "../../Components/FormInput";
import ModalWrap from "../../Components/ModalWrap";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Button from "../Button";
import Swal from "sweetalert2";
import FormSelectWrap from "../FormSelectWrap";

export default function FormProfile({ isOpen, onClose, user }) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: user.name,
    username: user.username,
    occupation: user.occupation,
    photo: user.photo,
  });
  console.log(data);

  const [msg, setMsg] = useState("");

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
      name: "occupation",
      type: "text",
      placeholder: "Occupation",
      value: user.occupation,
      required: true,
    },
    {
      id: 3,
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

  const _handleUpdateProfile = async ({ userId }, e) => {
    if (inputs[0].value && inputs[1].value && inputs[2].value) {
      try {
        Swal.fire({
          title: "Do You Want To Update Your Profile?",
          text: `Data profile will be update`,
          showCancelButton: true,
          cancelButtonText: "Cancel",
          confirmButtonColor: "#4C35E0",
          confirmButtonText: "Update",
          cancelButtonColor: "#FF0000",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              await axios.put(`/users/${userId}`, data);

              const mergedUser = { ...user, ...data };
              // Update user data in localStorage
              localStorage.setItem("user", JSON.stringify(mergedUser));

              Swal.fire({
                title: "Profile Update",
                text: "Profile updated successfully.",
                icon: "success",
                confirmButtonColor: "#4C35E0",
              });
              setMsg("Profile updated successfully!");
            } catch (error) {
              Swal.fire({
                title: "Error Can't Update Profile",
                text: error.response.message,
                confirmButtonColor: "#4C35E0",
                confirmButtonText: "Ok!",
              });
            }
          }
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.response.message,
          confirmButtonColor: "#4C35E0",
          confirmButtonText: "Ok!",
        });
        console.log(error);
      }
      e.preventDefault();
      navigate("/profile");

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
          name: "occupation",
          type: "text",
          placeholder: "Occupation",
          value: user.occupation,
          required: true,
        },
        {
          id: 3,
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
        name: "occupation",
        type: "text",
        placeholder: "Occupation",
        value: user.occupation,
        required: true,
      },
      {
        id: 3,
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
            <ModalWrap onSubmit={_handleUpdateProfile}>
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
                    ) : input.name !== "occupation" ? (
                      <div>
                        <FormInput
                          key={inputIdx}
                          {...input}
                          value={input.value}
                          type={input.type}
                          onChange={(e) =>
                            handleChange(e.target.value, inputIdx)
                          }
                        />
                      </div>
                    ) : (
                      <FormSelectWrap
                        type={input.type}
                        onChange={(e) => {
                          console.log(e.target.value);
                          handleChange(e.target.value, inputIdx);
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
                        onClick={() => _handleUpdateProfile(user._id)}
                      >
                        Update Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </ModalWrap>
          </div>
        </div>
      ) : null}
    </>
  );
}
