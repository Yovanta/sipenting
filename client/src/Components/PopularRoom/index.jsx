import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";

export default function PopularRoom() {
  const { data, loading, error } = useFetch("/rooms/popular");

  return (
    <>
      {data?.map((room, index) => (
        <div
          key={index}
          className="flex flex-col items-center bg-primary-white rounded-lg mt-2 shadow-xl w-80 pb-2 gap-2"
        >
          <img src={room.photos[0]} alt="" width="328" className="rounded-lg" />
          <div className="flex gap-8 justify-between">
            <div>
              <h1 className="font-bold">{room.name}</h1>
              <ul>
                <li className="text-xs">{room.item}</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex text-xs">
                ⭐️ rating {room.rating} (4 review)
              </div>

              {room.status ? (
                <button className="bg-secondary-error text-primary-red font-bold py-2 px-6 rounded-full">
                  Booked
                </button>
              ) : (
                <button className="bg-secondary-successful text-primary-green font-bold py-2 px-6 rounded-full">
                  <Link to={`/rooms/${room._id}`}>Available</Link>
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
