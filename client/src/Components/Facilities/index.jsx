import React from "react";
import { IoIosWifi } from "react-icons/io";
import { BiChalkboard } from "react-icons/bi";
import { MdChair, MdFoodBank } from "react-icons/md";
import {GiThermometerCold, GiDesk, GiCharging} from "react-icons/gi";
import {RiProjector2Fill} from "react-icons/ri";

export default function Facilities() {
  return (
    <>
      <div className="flex-col w-1/2 tablet:w-full phone:w-full gap-4 bg-primary-white rounded-lg shadow-xl p-4">
        <h3 className="text-2xl text-center">Facilities</h3>
        <ul className="flex flex-wrap m-4 text-center ">
          <li class="p-4 w-1/4 tablet:w-1/2 phone:w-1/2">
            <div class="flex flex-col border-2 border-sec px-4 py-6 rounded-lg items-center">
              <IoIosWifi />
              <p class="leading-relaxed">WIFI</p>
            </div>
          </li>
          <li class="p-4 w-1/4 tablet:w-1/2 phone:w-1/2">
            <div class="flex flex-col border-2 border-sec px-4 py-6 rounded-lg items-center">
              <BiChalkboard />
              <p class="leading-relaxed">Board</p>
            </div>
          </li>
          <li class="p-4 w-1/4 tablet:w-1/2 phone:w-1/2">
            <div class="flex flex-col border-2 border-sec px-4 py-6 rounded-lg items-center">
              <MdChair />
              <p class="leading-relaxed">Sofa</p>
            </div>
          </li>
          <li class="p-4 w-1/4 tablet:w-1/2 phone:w-1/2">
            <div class="flex flex-col border-2 border-sec px-4 py-6 rounded-lg items-center">
              <GiThermometerCold/>
              <p class="leading-relaxed">Pendingin</p>
            </div>
          </li>
          <li class="p-4 w-1/4 tablet:w-1/2 phone:w-1/2">
            <div class="flex flex-col border-2 border-sec px-4 py-6 rounded-lg items-center">
              <RiProjector2Fill/>
              <p class="leading-relaxed">Projector</p>
            </div>
          </li>
          <li class="p-4 w-1/4 tablet:w-1/2 phone:w-1/2">
            <div class="flex flex-col border-2 border-sec px-4 py-6 rounded-lg items-center">
              <GiDesk/>
              <p class="leading-relaxed">Meja</p>
            </div>
          </li>
          <li class="p-4 w-1/4 tablet:w-1/2 phone:w-1/2">
            <div class="flex flex-col border-2 border-sec px-4 py-6 rounded-lg items-center">
              <GiCharging/>
              <p class="leading-relaxed">Charging</p>
            </div>
          </li>
          <li class="p-4 w-1/4 tablet:w-1/2 phone:w-1/2">
            <div class="flex flex-col border-2 border-sec px-4 py-6 rounded-lg items-center">
              <MdFoodBank/>
              <p class="leading-relaxed">FoodCourt</p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
