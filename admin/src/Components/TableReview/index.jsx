import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import IconDelete from "../IconDelete";
import SearchBar from "../SearchBar";

export default function TableReview(props) {
  const { review, handleDelete, tabelHeader } = props;

  const PER_PAGE = 5;

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
    setDataPagination(review);
  }, [review]);
  console.log(dataPagination);

  return (
    <div>
      <div className="flex flex-col mb-6">
        <div className="inline-block w-full p-4">
          <div className="overflow-hidden">
            <div className="flex flex-row justify-between">
              <SearchBar _handleSearch={_handleSearch} />
              <div className="flex gap-2 items-center">
                <p className="text-primary-gray2">{`${offset + 1} - ${
                  offset + PER_PAGE
                } of ${review?.length}`}</p>
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
            <table className=" w-full">
              <thead className="">
                <tr>
                  {tabelHeader.map((item) => (
                    <th className="text-base font-medium px-6 py-4 text-center border-y-2">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {review
                  ?.filter((item) => {
                    return item.userId.username
                      .toLowerCase()
                      .includes(searchValue.toLowerCase());
                  })
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(offset, offset + PER_PAGE)
                  .map((value, reviewIdx) => (
                    <tr
                      className=" odd:bg-secondary-softblue text-primary-gray"
                      key={reviewIdx}
                      data-key={value._id}
                    >
                      <td className="text-base text-textColor-blackThin px-6 py-4 ">
                        {value._id}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {value.room.name}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {value.userId.username}
                      </td>
                      <td className="text-base text-textColor-blackThin px-6 py-4 ">
                        ⭐️ {value.rating}
                      </td>
                      <td className="text-base text-textColor-blackThin px-6 py-4 ">
                        {value.reviewText}
                      </td>
                      <td className="flex justify-center gap-2 py-4 whitespace-nowrap">
                        <button onClick={() => handleDelete(value._id)}>
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
    </div>
  );
}
