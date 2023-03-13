import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdMeetingRoom } from "react-icons/md";
import useFetch from "../../Hooks/useFetch";
import Loader from "../../Components/Loader";

export default function TypeRoomContainer() {
  const { data, loading, error } = useFetch("/rooms/countByType");

  console.log(data);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {data?.map((roomType, index) => (
            <div key={index} className="flex items-center bg-primary-white rounded-lg mt-2 shadow-xl w-80 p-2 gap-2">
              <img
                src={require("../../Assets/image-carousel.png")}
                alt=""
                width="80"
                className="rounded-lg"
              />
              <div className="flex-col gap-4">
                <div>
                  <h1 className="font-bold">{roomType.type}</h1>
                  <p className="text-xs">Bookable rooms available by the day</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex w-16 text-xs bg-secondary-softblue rounded-lg m-2  p-2 shadow-xl items-center gap-2">
                    <BsFillPersonFill />
                    <p>1-20</p>
                  </div>
                  <div className="flex text-xs bg-secondary-softblue rounded-lg m-2  p-2 shadow-xl items-center gap-2">
                    <MdMeetingRoom />
                    <p>{roomType.count} rooms</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
