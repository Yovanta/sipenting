import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   { name: "January", Total: 1200 },
//   { name: "February", Total: 2100 },
//   { name: "March", Total: 800 },
//   { name: "April", Total: 1600 },
//   { name: "May", Total: 900 },
//   { name: "June", Total: 1700 },
// ];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Chart({ aspect, title, booking }) {
  const currentDate = new Date();
  const sixMonthsAgo = new Date();

  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const filteredBookings = booking.filter((value) => {
    const bookingDate = new Date(value.startDate);
    return bookingDate >= sixMonthsAgo && bookingDate <= currentDate;
  });

  const bookingsPerMonth = filteredBookings.reduce((acc, booking) => {
    const bookingMonth = new Date(booking.startDate).getMonth();
    acc[bookingMonth] = acc[bookingMonth] + 1 || 1;
    return acc;
  }, {});

  const sixMonthBookingData = Array.from({ length: 6 }, (_, index) => {
    const monthIndex = currentDate.getMonth() - index;
    const monthName =
      monthIndex >= 0 ? monthNames[monthIndex] : monthNames[12 + monthIndex];
    return {
      name: monthName,
      Total: bookingsPerMonth[currentDate.getMonth() - index] || 0,
    };
  }).reverse();

  console.log(sixMonthBookingData);

  return (
    <div className="flex flex-col w-full shadow-xl p-8 text-primary-gray bg-primary-white rounded-xl">
      <div className="mb-5">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={sixMonthBookingData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid
            strokeDasharray="3 3"
            className="stroke-primary-blue"
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
