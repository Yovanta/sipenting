import React from "react";
import { useState } from "react";
import FormInput from "../FormInput";
import ModalWrap from "../ModalWrap";
import Button from "../Button";

export default function FormProfile(props) {
  const { handleClose } = props;
  const [data, setData] = useState([])
  const [msg, setMsg] = useState("");

  const _handleChange = (value, index) => {
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



  const [inputs, setInputs] = useState([
    {
      id: 0,
      name: "name",
      type: "text",
      placeholder: "Nama Lengkap",
      value: "",
      required: true,
    },
    {
      id: 1,
      name: "address",
      type: "text",
      placeholder: "Alamat",
      value: "",
      required: true,
    },
    {
      id: 2,
      name: "status",
      type: "text",
      placeholder: "Status",
      value: "",
      required: true,
    },
  ]);

  const _handleClose = () => {
    handleClose();
  }
  return (
    <>
      <ModalWrap>
        <h3 className="text-2xl uppercase text-center font-bold">Edit Profile</h3>
        <p className="has-text-centered text-primary-red">{msg}</p>
        {inputs.map((input, inputIdx) => (
          <>
          <FormInput
                key={inputIdx}
                {...input}
                value={input.value}
                type={input.type}
                onChange={(e) => _handleChange(e.target.value, inputIdx)}
              />
          </>
        ))}
        <div className="w-full flex justify-between gap-16 tablet:gap-4 phone:gap-2 text-primary-white">
        <Button className="bg-primary-red" onClick={handleClose}>Cancel</Button>
        <Button className="bg-primary-blue">Save</Button>

        </div>
      </ModalWrap>
    </>
  );
}
