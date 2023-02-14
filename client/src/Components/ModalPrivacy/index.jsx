import React from "react";
import ModalWrap from "../ModalWrap";
import { GrClose } from "react-icons/gr";
import Button from "../Button";

export default function ModalPrivacy(props) {
  const { handleClose } = props;
  return (
    <>
      <ModalWrap>
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold">Privacy and Security</h1>
          <button onClick={handleClose}>
            <GrClose />
          </button>
        </div>
        <hr className="w-full border-1" />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
          eligendi cumque ipsa. Odit natus veritatis consequuntur asperiores
          fugiat, laboriosam sit molestiae eius dicta. Voluptates nihil ab ea
          molestiae assumenda deleniti?
        </p>
      </ModalWrap>
    </>
  );
}
