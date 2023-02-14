import React from "react";
import Button from "../Button";

export default function RoomContainer() {
  return (
    <>
      <div className="flex flex-col items-center bg-primary-white rounded-lg mt-2 shadow-xl w-80 pb-2 gap-2">
        <img
          src={require("../../Assets/image-carousel.png")}
          alt=""
          width="328"
          className="rounded-lg"
        />
        <div className="flex gap-8 justify-between">
          <div>
            <h1 className="font-bold">Downtown Room</h1>
            <ul>
              <li className="text-xs">AC</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex text-xs">⭐️ rating 4.9 (4 review)</div>
            <Button className={"bg-secondary-green text-primary-green"}>
              Available
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
