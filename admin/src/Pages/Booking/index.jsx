import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../../Components/Button";

import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import TableBooking from "../../Components/TableBooking";
import UseFetch from "../../Hooks/UseFetch";
import ModalCreateBooking from "./ModalCreateBooking";

export default function Booking() {
  const location = useLocation();
  const path = location.pathname.split("/dashboard")[1];
  console.log(path);

  const { data, loading, error } = UseFetch(`/${path}`);
  const [list, setList] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const [tabelHeader] = useState([
    "ID Order",
    "Room",
    "User",
    "Date",
    "Keperluan",
    "Notes",
    "Actions",
  ]);

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Do You Want To Delete This Booking?",
        text: `Data booking will be lost `,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonColor: "#4C35E0",
        confirmButtonText: "Delete",
        cancelButtonColor: "#FF0000",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`/${path}/${id}`);
            setList(list.filter((item) => item._id !== id));
            Swal.fire({
              title: "Booking Deleted",
              text: "The Booking has been successfully deleted.",
              icon: "success",
              confirmButtonColor: "#4C35E0",
            });
          } catch (error) {
            Swal.fire({
              title: "Error Can't Delete Booking",
              text: error.response.message,
              confirmButtonColor: "#4C35E0",
              confirmButtonText: "Ok!",
            });
            console.log(error);
          }
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.message,
        confirmButtonColor: "#4C35E0",
        confirmButtonText: "Ok!",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    setList(data);
  }, [data]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full flex-col flex-wrap">
        <Navbar />
        <div className="flex-col flex-wrap">
          <div className="flex h-full">
            <div className="py-4 w-full">
              <div className="flex items-center justify-end mb-4">
                <div className="min-w-fit mx-1">
                  <Button
                    type="button"
                    onClick={handleOpenModal}
                    className="bg-primary-blue text-primary-white flex gap-2 items-center font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    <AiOutlinePlus />
                    Create Booking
                  </Button>
                </div>
              </div>
              <ModalCreateBooking isOpen={openModal} onClose={closeModal} />

              <div className="bg-primary-white items-center rounded mx-1">
                <TableBooking
                  tabelHeader={tabelHeader}
                  booking={list}
                  handleDelete={handleDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
