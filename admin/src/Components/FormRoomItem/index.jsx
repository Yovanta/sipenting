import React, { useState } from "react";

import FormInput from "../FormInput";
import Button from "../Button";

export default function FormRoomItem() {
  const [msg, setMsg] = useState("");

  const [roomItem, setRoomItem] = useState({
    id: "",
    roomItem: "",
    quantity: "",
  });
  console.log(roomItem);

  const [inputRoomItem, setInputRoomItem] = useState([
    {
      id: 0,
      name: "roomItem",
      type: "text",
      placeholder: "Room Item",
      value: "",
      required: true,
    },
    {
      id: 1,
      name: "quantity",
      type: "number",
      placeholder: "Quantity",
      value: "",
      required: true,
    },
  ]);

  const _handleChangeRoomItem = (value, index) => {
    setInputRoomItem(
      inputRoomItem.map((input) => {
        if (input.id === index) {
          return {
            ...input,
            value,
          };
        }
        return input;
      })
    );
    setRoomItem({
      ...roomItem,
      [inputRoomItem[index].name]: value,
    });
  };

  const _handleCreateRoomItem = (e) => {
    if (
      inputRoomItem[0].value &&
      inputRoomItem[1].value &&
      inputRoomItem[2].value &&
      inputRoomItem[3].value
    ) {
      //   createRoomItem({
      //     name: inputRoomItem[0].value,
      //     category: inputRoomItem[1].value,
      //     description: inputRoomItem[2].value,
      //     time: inputRoomItem[3].value,
      //   });

      e.preventDefault();

      setInputRoomItem([
        {
          id: 0,
          name: "roomItem",
          type: "text",
          placeholder: "Room Item",
          value: "",
          required: true,
        },
        {
          id: 1,
          name: "quantity",
          type: "number",
          placeholder: "Quantity",
          value: "",
          required: true,
        },
      ]);
    } else {
      setMsg("Please fill out all fields");
    }
  };

  return (
    <div>
      <h4 className="text-lg text-left font-bold mb-4">Room Item</h4>
      <div className="flex gap-4 justify-items-start">
        {inputRoomItem.map((inputRoomItem, inputRoomItemIdx) =>
          inputRoomItem.name === "facility" ? (
            <>
              <FormInput
                key={inputRoomItemIdx}
                {...inputRoomItem}
                value={inputRoomItem.value}
                type={inputRoomItem.type}
                onChange={(e) =>
                  _handleChangeRoomItem(e.target.value, inputRoomItemIdx)
                }
              />
            </>
          ) : (
            <>
              <FormInput
                key={inputRoomItemIdx}
                {...inputRoomItem}
                value={inputRoomItem.value}
                type={inputRoomItem.type}
                onChange={(e) =>
                  _handleChangeRoomItem(e.target.value, inputRoomItemIdx)
                }
              />
            </>
          )
        )}
        <Button
          className="bg-primary-gray text-primary-white font-bold uppercase text-sm px-6 py-3 rounded shadow mr-1 mb-1"
          type="button"
          onClick={_handleCreateRoomItem}
        >
          Add room item
        </Button>
      </div>
    </div>
  );
}
