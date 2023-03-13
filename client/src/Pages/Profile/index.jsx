import React, { useContext, useState } from "react";
import { GoMail } from "react-icons/go";
import { FaUniversity } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import FormProfile from "../../Components/FormProfile";
import ModalHistory from "../../Components/ModalHistory";
import ModalPrivacy from "../../Components/ModalPrivacy";
import Button from "../../Components/Button";
import Navbar from "../../Components/Navbar";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";


export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showModal, setShowModal] = useState(false);
  const [showModalHistory, setShowModalHistory] = useState(false);
  const [showModalPrivacy, setShowModalPrivacy] = useState(false);

  const _handleOpenModal = () => {
    setShowModal(true);
  };
  const _handleCloseModal = () => {
    setShowModal(false);
  };

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const _handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Yakin logout?",
      text: "Jika ingin masuk silahkan login kembali!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "LOGOUT" }); 
        localStorage.removeItem("user");
        Cookies.remove("access_token");
        navigate("/");
        Swal.fire({
          title: "Logout Success",
          text: "You can Login again.",
          icon: "success",
          confirmButtonColor: "#4C35E0",
        });
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-8 items-center justify-center">
        <h1 className="text-4xl uppercase font-bold">My Account</h1>
        <img
          src={require("../../Assets/image-carousel.png")}
          alt="profile"
          className="w-32 h-32 rounded-full"
        />
        <div className="text-center">
          <p className="text-base uppercase font-semibold">{user.name}</p>
          <div className="flex gap-2 items-center justify-center">
            <GoMail />
            <p>{user.email}</p>
          </div>
          <div className="flex gap-2 items-center justify-center">
            <FaUniversity />
            <p>{user.occupation}</p>
          </div>
        </div>
        <div className="w-1/2 phone:w-full flex flex-col items-center justify-center">
          <button
            className="flex w-full justify-between items-center bg-primary-white m-4 p-2 rounded-md"
            onClick={_handleOpenModal}
          >
            <h2>Personal Information</h2>
            <IoIosArrowDropright />
          </button>
          {showModal ? (
            <FormProfile
              isOpen={_handleOpenModal}
              onClose={_handleCloseModal}
              user={user}
            />
          ) : null}

          <button
            className="flex w-full justify-between items-center bg-primary-white m-4 p-2 rounded-md"
            onClick={() => setShowModalHistory(!showModalHistory)}
          >
            <h2>History Booking</h2>
            <IoIosArrowDropright />
          </button>
          {showModalHistory ? (
            <ModalHistory
              handleClose={() => setShowModalHistory(!showModalHistory)}
            />
          ) : null}

          <button
            className="flex w-full justify-between items-center bg-primary-white m-4 p-2 rounded-md"
            onClick={() => setShowModalPrivacy(!showModalPrivacy)}
          >
            <h2>Privacy and Security</h2>
            <IoIosArrowDropright />
          </button>
          {showModalPrivacy ? (
            <ModalPrivacy
              handleClose={() => setShowModalPrivacy(!showModalPrivacy)}
            />
          ) : null}
          <Button onClick={_handleLogout} className="bg-primary-red text-primary-white uppercase m-4 font-semibold">
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
