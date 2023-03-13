import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Featured({ todaysBooking, booking, room }) {
  const bookingPercentage = Math.round(
    (booking.length / room.length) * 100
  );

  const dataLastWeek = booking.filter((booking) => {
    const bookingDate = new Date(booking.startDate);
    const today = new Date();
    const daysSinceBooking = Math.floor(
      (today - bookingDate) / (1000 * 60 * 60 * 24)
    );
    return daysSinceBooking <= 7;
  });

  const dataLastMonth = booking.filter((booking) => {
    const bookingDate = new Date(booking.startDate);
    const today = new Date();
    const daysSinceBooking = Math.floor(
      (today - bookingDate) / (1000 * 60 * 60 * 24)
    );
    return daysSinceBooking <= 30;
  });

  return (
    <div className="flex-2 shadow-xl p-2 bg-primary-white rounded-xl w-full">
      <div className="flex items-center justify-center">
        <h1 className="text-lg font-semibold">Total Booking</h1>
      </div>
      <div className="p-5 flex flex-col items-center justify-center gap-4">
        <div className="w-28 h-28">
          <CircularProgressbar
            value={bookingPercentage}
            text={`${bookingPercentage}%`}
            strokeWidth={5}
          />
        </div>
        <p className="text-lg font-semibold">Total booking made today</p>
        <p className="text-3xl">{todaysBooking.length}</p>
        <div className="w-full flex items-center justify-center gap-8">
          <div className="items-center flex flex-col justify-center">
            <div className="text-lg font-semibold">Last Week</div>
            <div className="flex items-center text-xl text-primary-blue">
              <div className="text-base">{dataLastWeek.length} booking</div>
            </div>
          </div>
          <div className="items-center flex flex-col justify-center">
            <div className="text-lg font-semibold">Last Month</div>
            <div className="flex items-center text-xl text-primary-blue">
              <div className="text-base">{dataLastMonth.length} booking</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
