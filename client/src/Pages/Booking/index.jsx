import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { DateRange } from "react-date-range";
import TimeRange from "react-time-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

import { AuthContext } from "../../Context/AuthContext";
import FormTextArea from "../../Components/FormTextArea";
import FormInput from "../../Components/FormInput";
import Button from "../../Components/Button";

export default function Booking({ setOpenModal, roomId }) {
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  console.log(dates);
  console.log(roomId);

  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user._id,
    startDate: "",
    endDate: "",
    keperluan: "",
    notes: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleDateChange = (ranges) => {
    setDates([ranges.selection]);

    setBooking((prevBooking) => ({
      ...prevBooking,
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    }));
  };

  const handleTimeChange = (time, name) => {
    console.log(time);

    setDates((prevDates) => {
      const { startDate, endDate } = prevDates[0];
      const newDate = new Date(name === "start" ? startDate : endDate);
      console.log(newDate);
      // Convert time string to local date object
      const localTime = new Date(time);
      newDate.setHours(localTime.getHours());
      newDate.setMinutes(localTime.getMinutes());
      return [
        {
          ...prevDates[0],
          startDate: name === "start" ? newDate : startDate,
          endDate: name === "end" ? newDate : endDate,
        },
      ];
    });

    setBooking((prevBooking) => ({
      ...prevBooking,
      startDate: dates[0].startDate,
      endDate: dates[0].endDate,
    }));
  };

  console.log(dates[0].startDate);
  console.log(booking.startDate);
  console.log(booking);

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      if (!user || user === undefined || user === null)
        return navigate(`/login`);

      const res = await axios.post(`/booking/${roomId}`, booking);

      const result = await res.json();
      if (!res.ok) {
        return Swal.fire({
          title: "Failed",
          text: `${result.message}`,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Success",
          text: `Booking ruangan telah berhasil`,
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Failed",
        text: `${err.message}`,
        icon: "error",
      });
    }
  };

  // const { dates } = useContext(SearchContext);
  // const getDatesInRange = (startDate, endDate) => {
  //   const start = new Date(startDate);
  //   const end = new Date(endDate);
  //   const date = new Date(start.getTime());

  //   const dates = [];
  //   while (date <= end) {
  //     dates.push(new Date(date).getTime());
  //     date.setDate(date.getDate() + 1);
  //   }

  //   return dates;
  // };

  // const allDates= getDatesInRange(dates[0].startDate, dates[0].endDate)

  // const filterPassedTime = (time) => {
  //   const currentDate = new Date();
  //   const selectedDate = new Date(time);

  //   return currentDate.getTime() < selectedDate.getTime();
  // };

  // const isWeekday = (date) => {
  //   const day = date.getDay();
  //   return day !== 0 && day !== 6;
  // };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-secondary-blackrgba z-10 flex justify-center items-center"></div>
      <div className="w-1/2 h-4/5 z-20 fixed overflow-auto tablet:w-full phone:w-full flex flex-col gap-4 mx-4 p-10 bg-primary-white shadow-xl rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Room Details</h1>
          <AiOutlineCloseCircle
            onClick={() => setOpenModal(false)}
            className="text-2xl  text-primary-black cursor-pointer"
          />
        </div>
        <div className="flex gap-4">
          <img
            src={require("../../Assets/image-carousel.png")}
            alt=""
            width="77"
            className="rounded-lg"
          />
          <div className="flex-col">
            <h2 className="text-lg font-bold">Meeting Room 1</h2>
            <p className="text-xs">Gedung Lembaga Kemahasiswaan FISIP Unila</p>
            ⭐️ <span className="text-primary-gray text-xs">4.9/5</span>
          </div>
        </div>
        <hr className="font-bold w-full text-secondary-gray2" />
        <div>
          <h1 className="text-xl font-bold">Date</h1>
          <div className="bg-secondary-gray3 w-full flex flex-col flex-wrap p-4 my-4 rounded-lg gap-4">
            <span
              onClick={() => setOpenDate(!openDate)}
              className="text-secondary-gray cursor-pointer"
            >{`${format(dates[0].startDate, "dd/MM/yyyy HH:mm")} to ${format(
              dates[0].endDate,
              "dd/MM/yyyy HH:mm"
            )}`}</span>
            {openDate && (
              <div className="flex gap-2">
                <DateRange
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  className="absolute z-10 mt-10"
                  minDate={new Date()}
                  onChange={handleDateChange}
                  showSelectionPreview={true}
                  ranges={dates}
                  disabledDays={[0, 6]}
                  direction="horizontal"
                  name="date"
                />

                <TimeRange
                  startMoment={dates[0].startDate}
                  endMoment={dates[0].endDate}
                  onChange={(range) => {
                    handleTimeChange(range.startTime, "start");
                    handleTimeChange(range.endTime, "end");
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <hr className="font-bold w-full text-secondary-gray2" />
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold">Information</h1>
          Keperluan :
          <FormTextArea
            onChange={handleChange}
            id="keperluan"
            placeholder="Digunakan untuk rapat, dsb..."
          />
          Catatan :
          <FormInput
            onChange={handleChange}
            id="notes"
            placeholder="Meminjam proyektor, dsb..."
          />
        </div>
        <Button
          className="bg-primary-blue text-primary-white"
          onClick={handleBooking}
        >
          Book Now!
        </Button>
        <Button
          className="bg-primary-red text-primary-white"
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </Button>
      </div>
    </>
  );
}
