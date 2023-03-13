import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../../Components/Button";
import FormInput from "../../../Components/FormInput";
import FormTextArea from "../../../Components/FormTextArea";
import FormWrapModal from "../../../Components/FormWrapModal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import FormSelectWrap from "../../../Components/FormSelectWrap";

export default function ModalCreateRoom({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    description: "",
    type: "",
    image: [],
    status: false,
    maxPeople: 0,
    items: [],
  });

  const [msg, setMsg] = useState("");

  const [inputs, setInputs] = useState([
    {
      id: 0,
      name: "name",
      type: "text",
      placeholder: "Room Name",
      value: "",
      required: true,
    },
    {
      id: 1,
      name: "description",
      type: "textarea",
      placeholder: "Description",
      value: "",
      required: true,
    },
    {
      id: 2,
      name: "type",
      type: "select",
      placeholder: "Type Room",
      value: "",
      required: true,
    },
    {
      id: 3,
      name: "maxPeople",
      type: "number",
      placeholder: "Max People : e.g 20 people",
      value: "",
    },
    {
      id: 4,
      name: "item",
      type: [],
      placeholder: "Item Room : e.g AC, WiFi, etc",
      value: "",
    },
    {
      id: 5,
      name: "image",
      type: [],
      placeholder: "upload image here",
      value: "",
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

  const [imageRoom, setImageRoom] = useState("");
  console.log(imageRoom);

  const uploadImageRoom = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setImageRoom(base64);
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
      //       thumbnail: imageRoom,
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
          placeholder: "Room Name",
          value: "",
          required: true,
        },
        {
          id: 1,
          name: "description",
          type: "textarea",
          placeholder: "Description",
          value: "",
          required: true,
        },
        {
          id: 2,
          name: "type",
          type: "select",
          placeholder: "Type Room",
          value: "",
          required: true,
        },
        {
          id: 3,
          name: "maxPeople",
          type: "number",
          placeholder: "Max People : e.g 20 people",
          value: "",
        },
        {
          id: 4,
          name: "item",
          type: [],
          placeholder: "Item Room : e.g AC, WiFi, etc",
          value: "",
        },
        {
          id: 5,
          name: "image",
          type: [],
          placeholder: "upload image here",
          value: "",
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
        placeholder: "Room Name",
        value: "",
        required: true,
      },
      {
        id: 1,
        name: "description",
        type: "textarea",
        placeholder: "Description",
        value: "",
        required: true,
      },
      {
        id: 2,
        name: "type",
        type: "select",
        placeholder: "Type Room",
        value: "",
        required: true,
      },
      {
        id: 3,
        name: "maxPeople",
        type: "number",
        placeholder: "Max People : e.g 20 people",
        value: "",
      },
      {
        id: 4,
        name: "item",
        type: [],
        placeholder: "Item Room : e.g AC, WiFi, etc",
        value: "",
      },
      {
        id: 5,
        name: "image",
        type: [],
        placeholder: "upload image here",
        value: "",
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
                  <h3 className="text-2xl text-left font-bold">Create Room</h3>
                  <IoIosCloseCircleOutline
                    onClick={_handleClose}
                    className="top-8 right-8 text-primary-black text-3xl cursor-pointer"
                  />
                </div>
                <p className="has-text-centered text-error-red">{msg}</p>
                <div className="w-full grid grid-col gap-4">
                  {inputs.map((input, inputIdx) =>
                    input.name === "description" ? (
                      <FormTextArea
                        key={inputIdx}
                        {...input}
                        value={input.value}
                        type={input.type}
                        onChange={(e) => handleChange(e.target.value, inputIdx)}
                      />
                    ) : input.name === "type" ? (
                      <FormSelectWrap
                        type={input.type}
                        onChange={(e) => {
                          console.log(e.target.value);
                          handleChange(e.target.value, inputIdx);
                        }}
                      >
                        <option disabled selected>
                          {input.placeholder}
                        </option>
                        <option value="meeting room">Meeting Room</option>
                        <option value="coworking space">Coworking Space</option>
                        <option value="aula">Aula</option>
                      </FormSelectWrap>
                    ) : input.name === "image" ? (
                      <FormInput
                        type="file"
                        id="gambar"
                        onChange={(e) => uploadImageRoom(e)}
                        multiple
                      />
                    ) : (
                      <FormInput
                        key={inputIdx}
                        {...input}
                        value={input.value}
                        type={input.type}
                        onChange={(e) => handleChange(e.target.value, inputIdx)}
                      />
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
                        Create Room
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
