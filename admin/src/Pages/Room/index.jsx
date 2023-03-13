import React, { useEffect, useState } from "react";

import Button from "../../Components/Button";
import TableRoom from "../../Components/TableRoom";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar";
import { AiOutlinePlus } from "react-icons/ai";
import UseFetch from "../../Hooks/UseFetch";
import ModalCreateRoom from "./ModalCreateRoom";
import Swal from "sweetalert2";
import axios from "axios";

export default function Room() {
  const { data, loading, error } = UseFetch("/rooms");
  const [list, setList] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const [tabelHeader] = useState([
    "ID Room",
    "Picture",
    "Room Name",
    "Type",
    "Room Item",
    "Description",
    "Status",
    "Actions",
  ]);

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Do You Want To Delete This Room?",
        text: `Data room will be lost `,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonColor: "#4C35E0",
        confirmButtonText: "Delete",
        cancelButtonColor: "#FF0000",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`/rooms/${id}`);
            setList(list.filter((item) => item._id !== id));
            Swal.fire({
              title: "room Deleted",
              text: "The room has been successfully deleted.",
              icon: "success",
              confirmButtonColor: "#4C35E0",
            });
          } catch (error) {
            Swal.fire({
              title: "Error Can't Delete Room",
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
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-col flex-wrap w-full">
        <Navbar />
        <div className="flex-col flex-wrap p-2">
          <div className="flex flex-wrap w-full h-full">
            <div className="w-full py-4">
              <div className="flex items-center justify-end mb-4">
                <div className="w-auto">
                  <Button
                    onClick={handleOpenModal}
                    type="button"
                    className="bg-primary-blue text-primary-white flex gap-2 items-center font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    <AiOutlinePlus />
                    Create Room
                  </Button>
                </div>
              </div>
              <ModalCreateRoom isOpen={openModal} onClose={closeModal} />

              <div className="bg-primary-white items-center">
                <TableRoom
                  room={list}
                  tabelHeader={tabelHeader}
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
