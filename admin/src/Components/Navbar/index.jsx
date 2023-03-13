import React, { useContext, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineDarkMode } from "react-icons/md";

import { useLocation } from "react-router-dom";
import { DarkModeContext } from "../../Context/darkModeContext";
import Button from "../Button";
import ModalProfile from "../ModalProfile";

import "./NavbarStyle.css";

const NAVBAR_TEXTS = [
  { pages: "Dashboard", path: "/dashboard" },
  { pages: "Manage Room", path: "/room" },
  { pages: "Manage Customer", path: "/customer" },
  { pages: "Manage Review", path: "/review" },
  { pages: "Manage Booking", path: "/booking" },
];

export default function Navbar() {
  const location = useLocation();
  const textToShow = NAVBAR_TEXTS.find(
    (text) => text.path === location.pathname
  );

  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="w-full flex flex-wrap relative bg-primary-white rounded-l h-16 items-center border-b">
        <div className="w-full p-5 flex items-center justify-between font-semibold">
          <div className="flex items-center text-2xl">{textToShow?.pages}</div>
          <div className="flex items-center">
            <div className="flex gap-4 items-center mr-5 relative">
              <span>Hi, {user.username}!</span>
              <img
                src={user?.photo || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                alt="profile"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={() => setOpen(!open)}
              />
              {open && (
                <div className="flex flex-col gap-2 float-right -right-8 absolute z-10 top-10 min-w-max items-center bg-primary-white text-base p-2 list-none text-left rounded-lg shadow-lg m-0 border-secondary-softblue border-2">
                  <Button
                    className="text-primary-white bg-primary-blue"
                    onClick={handleOpenModal}
                  >
                    Edit Profile
                  </Button>
                  <ModalProfile
                    isOpen={openModal}
                    onClose={closeModal}
                    user={user}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
