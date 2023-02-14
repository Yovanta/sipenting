import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../Components/Button";
import TableRoom from "../../Components/TableRoom";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar";

export default function Room() {
  const [room, setRoom] = useState([]);

  const [tabelHeader] = useState([
    "ID Room",
    "Picture",
    "Room Name",
    "Floor",
    "Room Item",
    "Rate per day",
    "Status",
    "Actions",
  ]);

  return (
    <div className="flex h-full bg-secondary-softblue">
      <Sidebar />
      <Navbar />
      <div className="basis-5/6 pl-6">
        <div className="px-4 py-4 mt-20">
          <div className="flex items-center justify-end mb-2">
            <div className="w-auto">
              <Link to="/create-room">
                <Button
                  type="button"
                  className="bg-primary-blue text-primary-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Create Room
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-primary-white items-center">
            <TableRoom room={room} tabelHeader={tabelHeader} />
          </div>
        </div>
      </div>
    </div>
  );
}
