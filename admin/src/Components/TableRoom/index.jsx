import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Button from "../Button";
import IconDelete from "../IconDelete";
import IconEdit from "../IconEdit";

import SearchBar from "../SearchBar";

export default function TableRoom(props) {
  const { room, tabelHeader, handleDelete } = props;
  const PER_PAGE = 5;
  const setDataRoom = (room) => {
    console.log(room);
  };

  //search
  const [searchValue, setSearchValue] = useState("");
  const _handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  console.log(searchValue);

  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);

  function handlePageClick({ selected: selectedPage }) {
    console.log("selectedPage", selectedPage);
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;
  console.log("offset", offset);

  const pageCount = Math.ceil(data.length / PER_PAGE);
  useEffect(() => {
    setData(room);
  }, [room]);
  console.log(data);

  return (
    // <div>
    <div className="flex flex-col mb-6 w-full">
      <div className="inline-block w-full p-4">
        <div className="overflow-hidden">
          <div className="flex flex-row justify-between">
            <SearchBar _handleSearch={_handleSearch} />
            <div className="flex gap-2 items-center">
              <p className="text-secondary-gray2">{`${offset + 1} - ${
                offset + PER_PAGE
              } of ${room?.length}`}</p>
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
          <table className="table-auto w-full">
            <thead className="bg-primary-white">
              <tr>
                {tabelHeader.map((item) => (
                  <th className="text-sm font-medium text-primary-black border-y-2 px-6 py-4 text-center">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {room
                ?.filter((item) => {
                  return item.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
                })
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(offset, offset + PER_PAGE)
                .map((room, roomIdx) => (
                  <tr className="odd:bg-secondary-softblue text-primary-gray">
                    <td className="text-xs font-light whitespace-nowrap">
                      {room._id}
                    </td>
                    <td className="text-xs font-light whitespace-nowrap">
                      <img src={room.photo} alt="room" width="72px" />
                    </td>
                    <td className="text-xs font-light whitespace-nowrap">
                      {room.name}
                    </td>
                    <td className="text-xs font-light whitespace-nowrap">
                      {room.type}
                    </td>
                    <td className="flex gap-2 text-xs font-light whitespace-nowrap">
                      {/* {room.roomitem?.map((roomitem) => (
                          <li className="list-none">{roomitem.itemName}</li>
                        ))} */}
                    </td>
                    <td className="text-xs font-light whitespace-nowrap">
                      {room.description}
                    </td>
                    <td className="text-xs font-light whitespace-nowrap">
                      {room.status ? (
                        <button className="bg-secondary-error text-primary-red font-bold py-2 px-6 rounded-full">
                          Booked
                        </button>
                      ) : (
                        <button className="bg-secondary-successful text-primary-green font-bold py-2 px-6 rounded-full">
                          Available
                        </button>
                      )}
                    </td>
                    <td className="flex justify-around items-center whitespace-nowrap">
                      <Button>
                        <Link
                          to={`/update-room/${room._id}`}
                          state={{ room }}
                          key={roomIdx}
                          onClick={() => setDataRoom(room)}
                        >
                          <IconEdit />
                        </Link>
                      </Button>
                      <button
                        onClick={() => handleDelete(room._id)}
                        className="px-2 py-4"
                      >
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
    // </div>
  );
}
