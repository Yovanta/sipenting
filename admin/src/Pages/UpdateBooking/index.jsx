import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import TimeRange from "react-time-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

import Button from "../../Components/Button";
import FormInput from "../../Components/FormInput";
import FormWrap from "../../Components/FormWrap";
import FormTextArea from "../../Components/FormTextArea";
import FormSelectWrap from "../../Components/FormSelectWrap";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/Navbar";
import UseFetch from "../../Hooks/UseFetch";

export default function UpdateBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const [booking, setBooking] = useState(state);

  const value = Object.values(booking);
  console.log(value);
  const getDataBooking = value?.map((item) => {
    return item;
  });

  const [room, setRoom] = useState([]);
  const { data: rooms, loading, error } = UseFetch("/rooms");
  console.log(room);

  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [data, setData] = useState({
    room: "",
    userId: "",
    startDate: "",
    endDate: "",
    keperluan: "",
    notes: "",
  });

  console.log(data);
  const [msg, setMsg] = useState("");

  const [inputs, setInputs] = useState([
    {
      id: 0,
      name: "room",
      type: "select",
      placeholder: "Select Room",
      value: getDataBooking[0].room,
      required: true,
    },
    {
      id: 1,
      name: "keperluan",
      type: "text",
      placeholder: "Keperluan : e.g meeting, study, etc",
      value: getDataBooking[0].keperluan,
      required: true,
    },
    {
      id: 2,
      name: "notes",
      type: "textarea",
      placeholder: "Notes : e.g meminjam proyektor, etc",
      value: getDataBooking[0].notes,
      required: true,
    },
  ]);

  const handleChange = (value, index) => {
    setInputs(
      inputs.map((input) => {
        if (input.id === index) {
          return {
            ...input,
            value,
          };
        }
        return input;
      })
    );
    setData({
      ...data,
      [inputs[index].name]: value,
    });
  };

  const handleDateChange = (ranges) => {
    setDates([ranges.selection]);

    setData((prevBooking) => ({
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

    setData((prevBooking) => ({
      ...prevBooking,
      startDate: dates[0].startDate,
      endDate: dates[0].endDate,
    }));
  };

  const _handleUpdateBooking = (e) => {
    if (inputs[0].value && inputs[1].value && inputs[2].value) {
      //   updateDataRoom(getDataBookingm[0].room_id, {
      //     variables: {
      //       id: room.room_id,
      //       room_name: inputs[0].value,
      //       building_id: inputs[1].value,
      //       room_description: inputs[3].value,
      //       price_per_day: inputs[4].value,
      //       floor: inputs[6].value,
      //       thumbnail: imageRoom,
      //       status: inputs[9].value,
      //     },
      //   });
      e.preventDefault();
      navigate("/booking");

      setInputs([
        {
          id: 0,
          name: "room",
          type: "select",
          placeholder: "Select Room",
          value: getDataBooking[0].room,
          required: true,
        },
        {
          id: 1,
          name: "keperluan",
          type: "text",
          placeholder: "Keperluan : e.g meeting, study, etc",
          value: getDataBooking[0].keperluan,
          required: true,
        },
        {
          id: 2,
          name: "notes",
          type: "textarea",
          placeholder: "Notes : e.g meminjam proyektor, etc",
          value: getDataBooking[0].notes,
          required: true,
        },
      ]);
    } else {
      setMsg("Please fill all the fields");
    }
  };

  const _handleClose = (e) => {
    e.preventDefault();
    navigate("/booking");
    setInputs([
      {
        id: 0,
        name: "room",
        type: "select",
        placeholder: "Select Room",
        value: getDataBooking[0].room,
        required: true,
      },
      {
        id: 1,
        name: "keperluan",
        type: "text",
        placeholder: "Keperluan : e.g meeting, study, etc",
        value: getDataBooking[0].keperluan,
        required: true,
      },
      {
        id: 2,
        name: "notes",
        type: "textarea",
        placeholder: "Notes : e.g meminjam proyektor, etc",
        value: getDataBooking[0].notes,
        required: true,
      },
    ]);
  };

  useEffect(() => {
    setRoom(rooms);
  }, [rooms]);

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="flex-col flex-wrap w-full">
          <Navbar />
          <div className="flex-col flex-wrap p-2">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-6">
                <FormWrap onSubmit={_handleUpdateBooking}>
                  <h3 className="text-2xl text-left font-bold">
                    Update Booking Room
                  </h3>
                  <p className="has-text-centered text-error-red">{msg}</p>
                  <div className="w-full grid grid-col gap-4">
                    {inputs.map((input, inputIdx) =>
                      input.name === "notes" ? (
                        <FormTextArea
                          key={inputIdx}
                          {...input}
                          value={input.value}
                          type={input.type}
                          onChange={(e) =>
                            handleChange(e.target.value, inputIdx)
                          }
                        />
                      ) : input.name === "room" ? (
                        <FormSelectWrap
                          type={input.type}
                          onChange={(e) => {
                            console.log(e.target.value);
                            handleChange(e.target.value, inputIdx);
                          }}
                        >
                          <option disabled selected>
                            {input.placeholder}
                          </option>
                          {room.map((option, optionIdx) => (
                            <option key={optionIdx} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </FormSelectWrap>
                      ) : (
                        <FormInput
                          key={inputIdx}
                          {...input}
                          value={input.value}
                          type={input.type}
                          onChange={(e) =>
                            handleChange(e.target.value, inputIdx)
                          }
                        />
                      )
                    )}
                    <div className="w-full flex flex-col flex-wrap rounded-lg border-2 border-secondary-softblue gap-4">
                      <span
                        onClick={() => setOpenDate(!openDate)}
                        className="p-4 text-secondary-gray cursor-pointer"
                      >{`${format(
                        dates[0].startDate,
                        "dd/MM/yyyy HH:mm"
                      )} to ${format(
                        dates[0].endDate,
                        "dd/MM/yyyy HH:mm"
                      )}`}</span>
                      {openDate && (
                        <div className="flex gap-2">
                          <DateRange
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={false}
                            className="absolute z-10 mt-14"
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
                    <div className="w-full flex justify-end">
                      <div className="w-1/2 flex justify-end gap-4">
                        <Button
                          className="font-bold bg-secondary-softblue text-primary-blue uppercase px-6 py-3 text-xs rounded shadow mb-1 cursor-pointer"
                          type="button"
                          onClick={_handleClose}
                        >
                          Close
                        </Button>
                        <Button
                          className="bg-primary-blue text-primary-white font-bold w-full uppercase text-xs py-3 rounded shadow mb-1"
                          type="button"
                          onClick={_handleUpdateBooking}
                        >
                          Update Book
                        </Button>
                      </div>
                    </div>
                  </div>
                </FormWrap>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
