import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../Components/Button";
import FormInput from "../../Components/FormInput";
import FormWrap from "../../Components/FormWrap";
import FormTextArea from "../../Components/FormTextArea";
import SelectWrap from "../../Components/SelectWrap";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar";

export default function CreateRoom() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    thumbnail: "",
    room_name: "",
    floor: "",
    room_description: "",
    price_per_day: 0,
    status: false,
  });

  console.log(data);
  console.log(data.room_name);

  const [msg, setMsg] = useState("");
  const [building, setBuilding] = useState([]);

  // const [insertDataRoom] = useMutation(INSERT_ROOM, {
  //   refetchQueries: [GET_DATA_ROOM],
  //   onCompleted: (data) => {
  //     console.log(data);
  //     Swal.fire({
  //       title: "Success",
  //       text: "Create Room Success",
  //       icon: "success",
  //       confirmButtonText: "OK",
  //     });
  //     navigate("/room");
  //   }
  // })

  const [inputs, setInputs] = useState([
    {
      id: 0,
      name: "room_name",
      type: "text",
      placeholder: "Room Name",
      value: "",
      required: true,
    },
    {
      id: 1,
      name: "building_id",
      type: "select",
      placeholder: "Building",
      value: building,
      required: true,
    },
    {
      id: 2,
      name: "address",
      type: "text",
      placeholder: "Address",
      value: "",
    },
    {
      id: 3,
      name: "room_description",
      type: "textarea",
      placeholder: "Description",
      value: "",
      required: true,
    },
    {
      id: 4,
      name: "price_per_day",
      type: "number",
      placeholder: "Room Price",
      value: "",
      required: true,
    },
    {
      id: 5,
      name: "capacity",
      type: "number",
      placeholder: "e.g 10",
      value: "",
    },
    {
      id: 6,
      name: "floor",
      type: "text",
      placeholder: "e.g 10",
      value: "",
      required: true,
    },
    {
      id: 7,
      name: "table",
      type: "text",
      placeholder: "e.g office table",
      value: "",
    },
    {
      id: 8,
      name: "large",
      type: "text",
      placeholder: "e.g 10m",
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
      inputs[3].value &&
      inputs[4].value &&
      inputs[6].value
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
          name: "roomName",
          type: "text",
          placeholder: "Room Name",
          value: "",
          required: true,
        },
        {
          id: 1,
          name: "buildingName",
          type: "select",
          placeholder: "Building",
          value: parseInt(building),
          required: true,
        },
        {
          id: 2,
          name: "address",
          type: "text",
          placeholder: "Address",
          value: "",
        },
        {
          id: 3,
          name: "description",
          type: "textarea",
          placeholder: "Description",
          value: "",
          required: true,
        },
        {
          id: 4,
          name: "roomPrice",
          type: "number",
          placeholder: "Room Price",
          value: "",
          required: true,
        },
        {
          id: 5,
          name: "capacity",
          type: "number",
          placeholder: "e.g 10",
          value: "",
        },
        {
          id: 6,
          name: "floor",
          type: "text",
          placeholder: "e.g 10",
          value: "",
          required: true,
        },
        {
          id: 7,
          name: "table",
          type: "text",
          placeholder: "e.g office table",
          value: "",
        },
        {
          id: 8,
          name: "large",
          type: "text",
          placeholder: "e.g 10m",
          value: "",
        },
      ]);
    } else {
      setMsg("Please fill all the fields");
    }
  };

  const _handleClose = () => {
    navigate("/room");
    setInputs([
      {
        id: 0,
        name: "roomName",
        type: "text",
        placeholder: "Room Name",
        value: "",
        required: true,
      },
      {
        id: 1,
        name: "buildingName",
        type: "select",
        placeholder: "Building",
        value: building,
        required: true,
      },
      {
        id: 2,
        name: "address",
        type: "text",
        placeholder: "Address",
        value: "",
      },
      {
        id: 3,
        name: "description",
        type: "textarea",
        placeholder: "Description",
        value: "",
        required: true,
      },
      {
        id: 4,
        name: "roomPrice",
        type: "number",
        placeholder: "Room Price",
        value: "",
        required: true,
      },
      {
        id: 5,
        name: "capacity",
        type: "number",
        placeholder: "e.g 10",
        value: "",
      },
      {
        id: 6,
        name: "floor",
        type: "text",
        placeholder: "e.g 10",
        value: "",
        required: true,
      },
      {
        id: 7,
        name: "table",
        type: "text",
        placeholder: "e.g office table",
        value: "",
      },
      {
        id: 8,
        name: "large",
        type: "text",
        placeholder: "e.g 10m",
        value: "",
      },
    ]);
  };

  // const getAllBuilding = async () => {
  //   try {
  //     await getBuilding().then((res) => {
  //       setBuilding(res);
  //       console.log(res);
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   const getAllBuildings = async () => {
  //     const allBuilding = await getAllBuilding();
  //     if (allBuilding) {
  //       setBuilding(allBuilding);
  //     }
  //   };
  //   getAllBuildings();
  // }, []);

  return (
    <>
      <div className=" flex bg-secondary-blue h-full">
        <Sidebar />
        <Navbar />
        <div className="basis-5/6">
          <div className="px-4 py-4 mt-20">
            <h1 className="text-3xl font-bold mb-4">Room</h1>

            <div className="flex items-center justify-between mb-6">
              <FormWrap onSubmit={_handleCreateRoom}>
                <h3 className="text-2xl text-left font-bold">Create Room</h3>
                <p className="has-text-centered text-error-red">{msg}</p>
                <div className="w-full grid grid-col gap-4">
                  {inputs.map((input, inputIdx) =>
                    input.name !== "roomPrice" &&
                    input.name !== "description" &&
                    input.type !== "select" &&
                    input.name !== "capacity" &&
                    input.name !== "floor" &&
                    input.name !== "table" &&
                    input.name !== "large" ? (
                      <FormInput
                        key={inputIdx}
                        {...input}
                        value={input.value}
                        type={input.type}
                        onChange={(e) => handleChange(e.target.value, inputIdx)}
                      />
                    ) : input.name === "description" ? (
                      <FormTextArea
                        key={inputIdx}
                        {...input}
                        value={input.value}
                        type={input.type}
                        onChange={(e) => handleChange(e.target.value, inputIdx)}
                      />
                    ) : input.name === "roomPrice" ? (
                      <div className="flex gap-2 items-center w-full">
                        <FormInput
                          key={inputIdx}
                          {...input}
                          value={input.value}
                          type={input.type}
                          onChange={(e) =>
                            handleChange(e.target.value, inputIdx)
                          }
                        />
                        <p className="text-md text-gray-600">/Days</p>
                      </div>
                    ) : (
                      <div className="flex gap-8 justify-start items-center w-full">
                        <div>{input.name}</div>
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
                    )
                  )}
                  <div className="flex items-start justify-start">
                    <FormInput
                      type="file"
                      id="gambar"
                      onChange={(e) => uploadImageRoom(e)}
                    />
                  </div>

                  <hr className="text-secondary-softblue" />

                  <div className="w-full flex justify-end">
                    <div className="flex w-2/4 items-center gap-4">
                      <Button
                        className="font-bold bg-secondary-softblue text-primary-blue w-1/2 uppercase px-6 py-3 text-sm rounded shadow mr-1 mb-1"
                        type="button"
                        onClick={_handleClose}
                      >
                        Close
                      </Button>
                      <Button
                        className="bg-primary-blue w-1/2 text-primary-white font-bold uppercase text-sm px-6 py-3 rounded shadow mr-1 mb-1"
                        type="button"
                        onClick={_handleCreateRoom}
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
    </>
  );
}
