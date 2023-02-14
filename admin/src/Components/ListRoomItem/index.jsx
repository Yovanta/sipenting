import React from "react";
import IconDelete from "../IconDelete";

export default function ListRoomItem(props) {
  const { roomItem } = props;
  return (
    <div className="w-full flex flex-col gap-4 justify-items-start">
      <h4 className="text-lg font-bold">List Room Item</h4>
      <div className="w-2/5 bg-secondary-white2 flex flex-col">
        <div className="flex items-center justify-center gap-32 p-4 w-full">
          <h4>AC</h4>
          <h5>1</h5>
          <button>
            <IconDelete />
          </button>
        </div>
      </div>
    </div>
  );
}
