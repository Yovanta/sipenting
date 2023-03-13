import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";

import Loader from "../../Components/Loader";
import SearchItem from "../../Components/SearchItem";
import useFetch from "../../Hooks/useFetch";
import Button from "../../Components/Button";
import Navbar from "../../Components/Navbar";

export default function SearchResult() {
  const location = useLocation();
  const [name, setName] = useState(location.state.name);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);

  const { data, loading, error, reFetch } = useFetch(`/rooms?name=${name}`);

  const handleClick = () => {
    reFetch();
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="max-w-fit my-4 flex flex-wrap justify-start items-center gap-8 bg-primary-white rounded-lg shadow-xl mt-8 p-24">
          <div className="flex-wrap w-fit bg-primary-blue text-primary-white p-4 rounded-xl sticky top-2 max-h-max">
            <h1 className="text-3xl mb-2 text-center">Search</h1>
            <div className="flex flex-col gap-1 mb-2">
              <label>Room Name</label>
              <input
                placeholder={name}
                type="search"
                className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-xs text-primary-gray bg-primary-white bg-clip-padding rounded-md transition ease-in-out m-0 focus:text-primary-gray focus:bg-primary-white focus:border-primary-white focus:outline-1"
                aria-label="Search"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label>Check-in Date</label>
              <span className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-xs text-primary-gray bg-primary-white bg-clip-padding rounded-md transition ease-in-out m-0 focus:text-primary-gray focus:bg-primary-white focus:border-primary-white focus:outline-1" onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="flex w-full">
              <Button
                className="bg-primary-white text-primary-blue"
                onClick={handleClick}
              >
                Search
              </Button>
            </div>
          </div>

          <div className="flex flex-col">
            {loading ? (
              <Loader />
            ) : (
              <>
                {data?.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
