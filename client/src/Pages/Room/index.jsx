import React from "react";
import Loader from "../../Components/Loader";
import Navbar from "../../Components/Navbar";
import RoomContainer from "../../Components/RoomContainer";
import useFetch from "../../Hooks/useFetch";

export default function Room() {
  const { data, loading, error } = useFetch("/rooms");

  console.log(data);
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-full">
          <div className="w-full m-4 bg-primary-white rounded-lg shadow-xl mt-8 p-4 justify-center">
            <div className="flex flex-wrap gap-4 justify-center ">
              {loading ? <Loader /> : <RoomContainer dataRoom={data} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
