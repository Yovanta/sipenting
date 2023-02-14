import React, { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";
import FormTextArea from "../../Components/FormTextArea";
import FormInput from "../../Components/FormInput";
import Button from "../../Components/Button";

export default function Booking() {
  const [data, setData] = useState({
    userId: "",
    roomId: "",
    checkIn: "",
    checkOut: "",
    name: "",
    description: "",
  });
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const handleCheckInDate = (date) => {
    setCheckInDate(date);
    setCheckOutDate(null);
  };
  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-1/2 tablet:w-full phone:w-full flex flex-wrap flex-col gap-4 mx-4 p-4 bg-primary-white shadow-xl rounded-lg">
          <h1 className="text-3xl font-bold uppercase text-center">Booking Form</h1>
          <h2 className="text-xl font-bold">Room Details</h2>
          <div className="flex gap-4">
            <img
              src={require("../../Assets/image-carousel.png")}
              alt=""
              width="77"
              className="rounded-lg"
            />
            <div className="flex-col">
              <h2 className="text-lg font-bold">Meeting Room 1</h2>
              <p className="text-xs">
                Gedung Lembaga Kemahasiswaan FISIP Unila
              </p>
              ⭐️ <span className="text-primary-gray text-xs">4.9/5</span>
            </div>
          </div>
          <hr className="font-bold w-full text-secondary-gray2" />
          <div>
            <h2 className="text-xl font-bold">Date</h2>
            <div className="bg-secondary-gray3 w-full flex flex-col flex-wrap p-4 my-4 rounded-lg gap-4">
              <div className="flex items-center gap-4">
                <FaRegCalendarAlt />
                <p className="text-xs">Check-in</p>
                <div>
                  <DatePicker
                    selected={checkInDate}
                    minDate={new Date()}
                    onChange={handleCheckInDate}
                    filterDate={isWeekday}
                    className="rounded-lg p-2"
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                    showTimeSelect
                    filterTime={filterPassedTime}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FaRegCalendarAlt />
                <p className="text-xs">Check-out</p>
                <div>
                  <DatePicker
                    selected={checkOutDate}
                    minDate={checkInDate}
                    className="rounded-lg p-2"
                    onChange={handleCheckOutDate}
                    filterDate={isWeekday}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                    showTimeSelect
                    filterTime={filterPassedTime}
                  />
                </div>
              </div>
              {checkInDate && checkOutDate && (
                <div className="text-xs">
                  <p>
                    You book a meeting room from{" "}
                    {moment(checkInDate).format("MMMM d, yyyy h:mm a")} to{" "}
                    {moment(checkOutDate).format("MMMM d, yyyy h:mm a")} with
                    duration :
                    <span className="font-bold">
                      {moment(checkOutDate).diff(checkInDate, "minutes")} minutes
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <hr className="font-bold w-full text-secondary-gray2" />
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Information</h2>
            Nama :
            <FormInput />
            Deskripsi :
            <FormTextArea />
          </div>
          <Button className="bg-primary-blue text-primary-white">
            Book Now!
          </Button>
          <Button className="bg-primary-red text-primary-white">Cancel</Button>
        </div>
      </div>
    </>
  );
}
