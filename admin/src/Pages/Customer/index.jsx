import React, { useState } from "react";

import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import TableCustomer from "../../Components/TableCustomer";
import Swal from "sweetalert2";

export default function Customer() {
  const [customer, setCustomer] = useState([]);

  const removeCustomer = (cust_id) => {
    console.log(cust_id);
    Swal.fire({
      title: "Do You Want To Delete This Customer?",
      text: "All data will be lost",
      confirmButtonColor: "#4C35E0",
      confirmButtonText: "Delete",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "#4C35E0",
    }).then((result) => {
      console.log(result);
      if (result.value) {
        //   deleteCustomer({ variables: {cust_id: cust_id} });
      }
    });
  };

  const [tabelHeader] = useState([
    "Customer Name",
    "Username",
    "Email",
    "Province",
    "City",
    "District",
    "Actions",
  ]);

  return (
    <div className="flex h-full bg-secondary-softblue">
      <Sidebar />
      <Navbar />
      <div className="basis-5/6">
        <div className="px-4 py-4 mt-20">
          <div className="flex justify-end">
            <div className="w-auto"></div>
          </div>
          <div className="bg-primary-white items-center rounded mt-4">
            <TableCustomer
              customer={customer}
              tabelHeader={tabelHeader}
              removeCustomer={removeCustomer}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
