import React from "react";
import Carousel from "../../Components/Carousel";
import images from "../../Components/Carousel/images";
import RoomContainer from "../../Components/RoomContainer";
import SearchBar from "../../Components/SearchBar";
import TypeRoomContainer from "../../Components/TypeRoomContainer";

export default function Home() {
  return (
    <>
      <Carousel images={images} />
      {/* <div className="absolute flex w-full justify-center -mt-8 phone:-mt-6">
        <SearchBar />
      </div> */}
      <div className="flex items-center justify-center">
        <div className="flex-col w-full m-4 gap-8 bg-primary-white rounded-lg shadow-xl mt-12 p-4 justify-center">
          <div className="flex justify-between items-center mb-2">
            <div className="flex-col">
              <h1 className="text-2xl font-bold">Popular Room</h1>
              <p className="text-primary-gray">
                Our best picks for popular room
              </p>
            </div>
            <p className="text-primary-blue">View all</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <RoomContainer className="flex-1"></RoomContainer>
            <RoomContainer className="flex-1"></RoomContainer>
            <RoomContainer className="flex-1"></RoomContainer>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex-col w-full m-4 gap-8 bg-primary-white rounded-lg shadow-xl mt-12 p-4 justify-center">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">Browse by workspace</h1>

            <p className="text-primary-blue">View all</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <TypeRoomContainer className="flex-1"/>
            <TypeRoomContainer className="flex-1"/>
            <TypeRoomContainer className="flex-1"/>
          </div>
        </div>
      </div>
    </>
  );
}
