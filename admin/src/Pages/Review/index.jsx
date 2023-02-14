import React, { useState, useEffect } from "react";

import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import TableReview from "../../Components/TableReview";

export default function Review() {
  const [review, setReview] = useState([]);

  const [tabelHeader] = useState([
    "Id Review",
    "Username",
    "Room Name",
    "Name Customer",
    "Reply Reviews",
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
          <div className="bg-primary-white items-center rounded-lg mt-4 ml-6 w-10/12">
            <TableReview tabelHeader={tabelHeader} review={review} />
          </div>
        </div>
      </div>
    </div>
  );
}
