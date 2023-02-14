import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "./index.css";
import ModalWrap from "../ModalWrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function CalendarBooking() {
  const [date, setDate] = useState(new Date());
  const filterDays = (date) => {
    // Disable Weekends
    if (date.getDay() === 0 || date.getDay() === 6) {
      return false;
    } else {
      return true;
    }
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <ModalWrap>
      <div className="calendar-container">
        {/* <Calendar onChange={setDate} value={date} /> */}
        {/* <DatePicker
          selected={date}
          onChange={setDate}
          showTimeSelect
          timeIntervals={30}
          filterDate={filterDays}
          dateFormat="MM/dd/yyyy  EE hh:mm a"
        /> */}
        <DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      </div>
      <span>Selected Date: {date.toDateString()}</span>
    </ModalWrap>
  );
}
