import React from "react";
import ModalWrap from "../ModalWrap";
import { GrClose } from "react-icons/gr";
import Button from "../Button";

export default function ModalHistory(props) {
  const { handleClose } = props;
  return (
    <>
      <ModalWrap>
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold">History Booking</h1>
          <button onClick={handleClose}>
            <GrClose />
          </button>
        </div>
        <hr className="w-full border-1" />
        <div className="flex items-center bg-primary-white rounded-lg mt-2 shadow-xl w-80 p-2 gap-2">
          <img
            src={require("../../Assets/image-carousel.png")}
            alt=""
            width="80"
            className="rounded-lg"
          />
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="font-bold text-xl">Meeting Room 1</h1>
              <p className="text-xs">Booking : 12/10/2022</p>
            </div>
            <div className="flex">
              <Button className="bg-primary-blue text-primary-white text-xs">
                Give Review
              </Button>
            </div>
          </div>
        </div>
      </ModalWrap>
    </>
  );
}
