import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../Components/Button";
import FormInput from "../../Components/FormInput";
import FormWrap from "../../Components/FormWrap";
import FormTextArea from "../../Components/FormTextArea";
import FormSelectWrap from "../../Components/FormSelectWrap";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar";

export default function UpdateRoom() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [room, setRoom] = useState(state);

  const value = Object.values(room);
  console.log(value);
  const getDataRoom = value?.map((item) => {
    return item;
  });

  const [data, setData] = useState({
    name: "",
    description: "",
    type: "",
    image: [],
    status: false,
    maxPeople: 0,
    items: [],
  });

  console.log(data);
  const [msg, setMsg] = useState("");

  const [inputs, setInputs] = useState([
    {
      id: 0,
      name: "name",
      type: "text",
      placeholder: "Room Name",
      value: getDataRoom[0].name,
      required: true,
    },
    {
      id: 1,
      name: "description",
      type: "textarea",
      placeholder: "Description",
      value: getDataRoom[0].description,
      required: true,
    },
    { 
      id: 2,
      name: "type", 
      type: "select",
      placeholder: "Type Room",
      value: getDataRoom[0].type,
      required: true,
    },
    {
      id: 3,
      name: "status",
      type: "select",
      placeholder: "Status Room",
      value: getDataRoom[0].status,
      required: true,
    },
    {
      id: 4,
      name: "maxPeople",
      type: "number",
      placeholder: "Max People : e.g 20 people",
      value: getDataRoom[0].maxPeople,
    },
    {
      id: 5,
      name: "item",
      type: [],
      placeholder: "Item Room : e.g AC, WiFi, etc",
      value: getDataRoom[0].items,
    },
    {
      id: 6,
      name: "image",
      type: [],
      placeholder: "upload image here",
      value: getDataRoom[0].photos,
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

  const _handleUpdateRoom = (e) => {
    if (
      inputs[0].value &&
      inputs[1].value &&
      inputs[2].value &&
      inputs[3].value &&
      inputs[4].value &&
      inputs[5].value
    ) {
      //   updateDataRoom(getDataRoomm[0].room_id, {
      //     variables: {
      //       id: room._id,
      //       room_name: inputs[0].value,
      //       building_id: inputs[1].value,
      //       room_description: inputs[3].value,
      //       price_per_day: inputs[4].value,
      //       floor: inputs[6].value,
      //       thumbnail: imageRoom,
      //       status: inputs[9].value,
      //     },
      //   });
      e.preventDefault();
      navigate("/room");

      setInputs([
        {
          id: 0,
          name: "name",
          type: "text",
          placeholder: "Room Name",
          value: getDataRoom[0].name,
          required: true,
        },
        {
          id: 1,
          name: "description",
          type: "textarea",
          placeholder: "Description",
          value: getDataRoom[0].description,
          required: true,
        },
        {
          id: 2,
          name: "type",
          type: "select",
          placeholder: "Type Room",
          value: getDataRoom[0].type,
          required: true,
        },
        {
          id: 3,
          name: "status",
          type: "select",
          placeholder: "Status Room",
          value: getDataRoom[0].status,
          required: true,
        },
        {
          id: 4,
          name: "maxPeople",
          type: "number",
          placeholder: "Max People : e.g 20 people",
          value: getDataRoom[0].maxPeople,
        },
        {
          id: 5,
          name: "item",
          type: [],
          placeholder: "Item Room : e.g AC, WiFi, etc",
          value: getDataRoom[0].items,
        },
        {
          id: 6,
          name: "image",
          type: [],
          placeholder: "upload image here",
          value: getDataRoom[0].photos,
        },
      ]);
    } else {
      setMsg("Please fill all the fields");
    }
  };

  const _handleClose = (e) => {
    e.preventDefault();
    navigate("/room");
    setInputs([
      {
        id: 0,
        name: "name",
        type: "text",
        placeholder: "Room Name",
        value: getDataRoom[0].name,
        required: true,
      },
      {
        id: 1,
        name: "description",
        type: "textarea",
        placeholder: "Description",
        value: getDataRoom[0].description,
        required: true,
      },
      {
        id: 2,
        name: "type",
        type: "select",
        placeholder: "Type Room",
        value: getDataRoom[0].type,
        required: true,
      },
      {
        id: 3,
        name: "status",
        type: "select",
        placeholder: "Status Room",
        value: getDataRoom[0].status,
        required: true,
      },
      {
        id: 4,
        name: "maxPeople",
        type: "number",
        placeholder: "Max People : e.g 20 people",
        value: getDataRoom[0].maxPeople,
      },
      {
        id: 5,
        name: "item",
        type: [],
        placeholder: "Item Room : e.g AC, WiFi, etc",
        value: getDataRoom[0].items,
      },
      {
        id: 6,
        name: "image",
        type: [],
        placeholder: "upload image here",
        value: getDataRoom[0].photos,
      },
    ]);
  };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-col flex-wrap w-full">
          <Navbar />
          <div className="flex-col flex-wrap p-2">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-6">
                <FormWrap onSubmit={_handleUpdateRoom}>
                  <h3 className="text-2xl text-left font-bold">Update Room</h3>
                  <p className="has-text-centered text-error-red">{msg}</p>
                  <div className="w-full grid grid-col gap-4">
                    {inputs.map((input, inputIdx) =>
                      input.name === "description" ? (
                        <FormTextArea
                          key={inputIdx}
                          {...input}
                          value={input.value}
                          type={input.type}
                          onChange={(e) =>
                            handleChange(e.target.value, inputIdx)
                          }
                        />
                      ) : input.type === "select" ? (
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
                          {input.name === "type" ? (
                            <>
                              <option value="meeting room">Meeting Room</option>
                              <option value="coworking space">
                                Coworking Space
                              </option>
                              <option value="aula">Aula</option>
                            </>
                          ) : (
                            <>
                              <option value="true">Booked</option>
                              <option value="false">Available</option>
                            </>
                          )}
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
                          onChange={(e) =>
                            handleChange(e.target.value, inputIdx)
                          }
                        />
                      )
                    )}

                    <div className="w-full flex justify-end">
                      <div className="w-1/2 flex justify-end gap-4">
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
                          onClick={_handleUpdateRoom}
                        >
                          Create Room
                        </Button>
                      </div>
                    </div>
                  </div>
                </FormWrap>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
