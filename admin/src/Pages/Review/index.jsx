import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import TableReview from "../../Components/TableReview";
import UseFetch from "../../Hooks/UseFetch";

export default function Review() {
  const { data, loading, error } = UseFetch("/reviews");
  const [list, setList] = useState([]);

  const [tabelHeader] = useState([
    "Id Review",
    "Room Name",
    "Username",
    "Rating",
    "Review",
    "Actions",
  ]);

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Do You Want To Delete This Review?",
        text: `Data review will be lost`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonColor: "#4C35E0",
        confirmButtonText: "Delete",
        cancelButtonColor: "#FF0000",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`/reviews/${id}`);
            setList(list.filter((item) => item._id !== id));
            Swal.fire({
              title: "Review Deleted",
              text: "The review has been successfully deleted.",
              icon: "success",
              confirmButtonColor: "#4C35E0",
            });
          } catch (error) {
            Swal.fire({
              title: "Error Can't Delete Review",
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
        <div className="flex-col flex-wrap p-2">
          <div className="flex h-full">
            <div className="w-full py-4">
              <div className="bg-primary-white items-center rounded-lg mt-4">
                <TableReview
                  tabelHeader={tabelHeader}
                  review={data}
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
