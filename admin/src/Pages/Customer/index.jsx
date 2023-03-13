import React, { useEffect, useState } from "react";

import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import TableCustomer from "../../Components/TableCustomer";
import Swal from "sweetalert2";
import UseFetch from "../../Hooks/UseFetch";
import axios from "axios";

export default function Customer() {
  const { data, loading, error } = UseFetch("/users");
  const [list, setList] = useState([]);

  const [tabelHeader] = useState([
    "Customer ID",
    "Customer Name",
    "Username",
    "Email",
    "Occupation",
    "Actions",
  ]);

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Do You Want To Delete This Customer?",
        text: `Data customer will be lost`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonColor: "#4C35E0",
        confirmButtonText: "Delete",
        cancelButtonColor: "#FF0000",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`/users/${id}`);
            setList(list.filter((item) => item._id !== id));
            Swal.fire({
              title: "Customer Deleted",
              text: "The customer has been successfully deleted.",
              icon: "success",
              confirmButtonColor: "#4C35E0",
            });
          } catch (error) {
            Swal.fire({
              title: "Error Can't Delete Customer",
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
        <div className="flex-col flex-wrap p-4"></div>
        <div className="flex h-full bg-secondary-softblue">
          <div className="px-4 py-4 w-full">
            <div className="bg-primary-white items-center rounded mt-4">
              <TableCustomer
                customer={list}
                tabelHeader={tabelHeader}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
