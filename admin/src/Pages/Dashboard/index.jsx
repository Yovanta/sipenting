import React from "react";
import Sidebar from "../../Components/Sidebar";
import Widget from "../../Components/Widget";
import Featured from "../../Components/Featured";
import Navbar from "../../Components/Navbar";
import Chart from "../../Components/Chart";
import UseFetch from "../../Hooks/UseFetch";

export default function Dashboard() {
  const { data: room } = UseFetch("/rooms");
  const availableRoom = room.filter((item) => item.status === false);

  const { data: booking } = UseFetch("/booking");
  const today = new Date();
  const todaysBooking = booking.filter((item) => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    return (
      (startDate.getDate() === today.getDate() &&
        startDate.getMonth() === today.getMonth() &&
        startDate.getFullYear() === today.getFullYear()) ||
      (endDate.getDate() === today.getDate() &&
        endDate.getMonth() === today.getMonth() &&
        endDate.getFullYear() === today.getFullYear())
    );
  });

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full flex-col flex-wrap">
          <Navbar />
          <div className="flex-col flex-wrap p-2">
            <div className="flex p-5 gap-5">
              <Widget type="user" />
              <Widget
                type="order"
                booking={booking}
                todaysBooking={todaysBooking}
              />
              <Widget type="available" availableRoom={availableRoom} />
              <Widget
                type="new"
                booking={booking}
                todaysBooking={todaysBooking}
              />
            </div>
            <div className="flex p-5 gap-5">
              <Featured
                todaysBooking={todaysBooking}
                booking={booking}
                room={room}
              />
              <Chart title="Last 6 Months (Booking)" aspect={2 / 1} booking={booking}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
