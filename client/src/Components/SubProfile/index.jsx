import React from "react";
import { IoIosArrowDropright } from "react-icons/io";
import FormProfile from "../FormProfile";

export const ProfileData = [
  {
    title: "Personal Information",
    iconOpened: <IoIosArrowDropright />,
    popup: <FormProfile/>
  },
  {
    title: "History",
    iconOpened: <IoIosArrowDropright />,
  },
  {
    title: "Privacy",
    iconOpened: <IoIosArrowDropright />,
  },
];
