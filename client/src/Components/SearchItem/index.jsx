import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";

export default function SearchItem({ item }) {
  return (
    <>
      <div className="flex gap-4 p-2 items-center justify-around bg-primary-white rounded-lg mt-2 shadow-xl pb-2">
        <img
          src={require("../../Assets/image-carousel.png")}
          alt=""
          width="144"
          className="rounded-lg"
        />
        <div className="flex gap-4 justify-between items-center">
          <div>
            <h1 className="font-bold">{item.name}</h1>
            <ul>
              <li className="text-xs">AC</li>
            </ul>
            <div className="flex text-xs">⭐️ rating 4.9 (4 review)</div>
          </div>
          <div className="flex">
            {item.status ? (
              <button className="bg-secondary-error text-primary-red font-bold py-2 px-6 rounded-full">
                Booked
              </button>
            ) : (
              <button className="bg-secondary-successful text-primary-green font-bold py-2 px-6 rounded-full">
                <Link to={`/rooms/${item._id}`}>Available</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
