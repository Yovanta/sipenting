import React from "react";
import { NavLink } from "react-router-dom";
import Carousel from "../../Components/Carousel";
import images from "../../Components/Carousel/images";
import Navbar from "../../Components/Navbar";
import PopularRoom from "../../Components/PopularRoom";
import SearchBar from "../../Components/SearchBar";
import Timeline from "../../Components/Timeline";
import TypeRoomContainer from "../../Components/TypeRoomContainer";
import useFetch from "../../Hooks/useFetch";

export default function Home() {
  const { data, loading, error } = useFetch("/rooms");

  return (
    <>
      <Navbar />

      <Carousel images={images} />
      <div className="flex items-center justify-center mt-8">
        <SearchBar dataRoom={data} />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex-col w-full m-4 gap-8 bg-primary-white rounded-lg shadow-xl mt-12 p-4 justify-center">
          <div className="flex justify-between items-center mb-2">
            <div className="flex-col">
              <h1 className="text-2xl font-bold">Popular Room</h1>
              <p className="text-primary-gray">
                Our best picks for popular room
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-start gap-8">
            <PopularRoom className="flex-1"></PopularRoom>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex-col w-full m-4 gap-8 bg-primary-white rounded-lg shadow-xl mt-12 p-4">
          <h1 className="text-2xl font-bold">Type of workspace</h1>

          <div className="flex flex-wrap justify-center gap-8">
            <TypeRoomContainer className="flex-1" />
          </div>
        </div>
      </div>

      {/* how to  */}
      <div className="flex items-center justify-center m-4">
        <div className="flex-col w-full m-4 gap-8 bg-primary-white rounded-lg shadow-xl mt-12 p-2">
          <h1 className="text-3xl font-bold my-4 text-center">
            How To Booking Room
          </h1>
          <Timeline />
        </div>
      </div>
    </>
  );
}
