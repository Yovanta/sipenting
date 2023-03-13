import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import IconDelete from "../IconDelete";
import IconEdit from "../IconEdit";
import Button from "../Button";
import SearchBar from "../SearchBar";

export default function TableBooking(props) {
  const { booking, tabelHeader, handleDelete } = props;
  console.log(booking);

  const PER_PAGE = 5;
  const setDataBooking = (booking) => {
    console.log("ini data booking di table booking", booking);
  };

  //search
  const [searchValue, setSearchValue] = useState("");
  const _handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  console.log(searchValue);

  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [dataPagination, setDataPagination] = useState([]);

  function handlePageClick({ selected: selectedPage }) {
    console.log("selectedPage", selectedPage);
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;
  console.log("offset", offset);

  const pageCount = Math.ceil(dataPagination.length / PER_PAGE);
  useEffect(() => {
    setDataPagination(booking);
  }, [booking]);
  console.log(dataPagination);

  return (
    <div className="flex flex-col mb-6">
      <div className="inline-block w-full p-4">
        <div className="overflow-y-auto">
          <div className="flex flex-row justify-between">
            <SearchBar _handleSearch={_handleSearch} />
            <div className="flex gap-2 items-center">
              <p className="text-secondary-gray2">{`${offset + 1} - ${
                offset + PER_PAGE
              } of ${booking?.length}`}</p>
              <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                previousLinkClassName="pagination__link"
                nextLinkClassName="pagination__link"
                disabledClassName="pagination__link--disabled"
                activeClassName="pagination__link--active"
              />
            </div>
          </div>
          <table className="table-auto w-full overflow-auto">
            <thead className="bg-white">
              <tr>
                {tabelHeader.map((item) => (
                  <th className="text-sm font-medium text-primary-black border-y-2 py-4 text-center">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {booking
                ?.filter((item) => {
                  return item?.room.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
                })
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(offset, offset + PER_PAGE)
                .map((booking, bookingIdx) => (
                  <tr
                    className="odd:bg-secondary-softblue text-primary-gray"
                    key={bookingIdx}
                    data-key={booking._id}
                  >
                    <td className="text-xs py-4 whitespace-no-wrap">
                      {booking._id}
                    </td>
                    <td className="text-xs py-4 whitespace-nowrap">
                      {booking.room.name}
                    </td>
                    <td className="text-xs py-4 whitespace-nowrap">
                      {booking.userId?.username}
                    </td>
                    <td className="text-xs py-4 whitespace-nowrap">
                      {booking.startDate} - {booking.endDate}
                    </td>
                    <td className="text-xs py-4 whitespace-nowrap">
                      {booking.keperluan}
                    </td>
                    <td className="text-xs py-4 whitespace-nowrap">
                      {booking.notes}
                    </td>
                    <td className="flex justify-center gap-2 py-4 whitespace-nowrap">
                      <Button>
                        <Link
                          to={`/update-booking/${booking._id}`}
                          state={{ booking }}
                          key={bookingIdx}
                          onClick={() => setDataBooking(booking)}
                        >
                          <IconEdit />
                        </Link>
                      </Button>
                      <button onClick={() => handleDelete(booking._id)}>
                        <IconDelete />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
