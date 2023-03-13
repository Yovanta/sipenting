import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"; 
import { BiSearchAlt, BiCalendarEvent } from "react-icons/bi";
import { MdMeetingRoom } from "react-icons/md";

import { SearchContext } from "../../Context/SearchContext";
import Button from "../Button";

export default function SearchBar() {
  const [name, setName] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const { dispatch } = useContext(SearchContext);

  const navigate = useNavigate();
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { name, dates } });
    navigate(`/rooms?${name}`, { state: { name, dates } });
  };
  console.log(dates);

  //search
  // const [filteredData, setFilteredData] = useState([]);
  // const [wordEntered, setWordEntered] = useState("");

  // const handleFilter = (e) => {
  //   const searchWord = e.target.value;
  //   setWordEntered(searchWord);
  //   const newFilter = dataRoom.filter((value) => {
  //     return value.name.toLowerCase().includes(searchWord.toLowerCase());
  //   });

  //   if (searchWord === "") {
  //     setFilteredData([]);
  //   } else {
  //     setFilteredData(newFilter);
  //   }
  // };

  // const clearInput = () => {
  //   setFilteredData([]);
  //   setWordEntered("");
  // };

  return (
    <>
      <div className="ml-2 mt-2 w-4/5">
        {/* <div className="w-full"> */}
        <div className="input-group relative flex items-stretch justify-between w-full mb-2 bg-primary-white border border-solid hover:border-primary-blue rounded-lg p-2 shadow-xl">
          <div className="flex w-1/2 items-center">
            <MdMeetingRoom />
            <input
              type="search"
              className="form-control relative block w-full px-3 py-1.5 text-xs text-primary-gray bg-primary-white bg-clip-padding rounded-md transition ease-in-out m-0 focus:text-primary-gray focus:bg-primary-white focus:border-primary-white focus:outline-none"
              placeholder="Cari ruangan disini..."
              aria-label="Search"
              aria-describedby="button-addon3"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <BiCalendarEvent />
            <span
              onClick={() => setOpenDate(!openDate)}
              className="text-secondary-gray cursor-pointer"
            >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
              dates[0].endDate,
              "MM/dd/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="absolute z-10 top-10"
                minDate={new Date()}
              />
            )}
          </div>

          <div className="flex">
            <Button
              className="w-1/6 flex gap-2 items-center justify-end mr-2 text-primary-white bg-primary-blue rounded-lg"
              onClick={handleSearch}
            >
              <BiSearchAlt className="w-4 " />
              Search
            </Button>
          </div>
          {/* {filteredData.length === 0 ? (
            ) : (
              <div className="w-1/6 flex items-center justify-end mr-2">
                <MdOutlineCancel
                  onClick={clearInput}
                  className="w-4 text-primary-gray"
                />
              </div>
            )} */}
        </div>

        {/* {filteredData.length !== 0 && (
            <>
              {filteredData?.map((value, key) => {
                return (
                  <NavLink
                    to={`/detail/${value._id}`}
                    state={{ value }}
                    onClick={value._id}
                  >
                    <SearchItem value={value} />
                  </NavLink>
                );
              })}
            </>
          )} */}
      </div>
      {/* </div> */}
    </>
  );
}
