import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import ModalReplyReview from "../ModalReplyReview";
import SearchBar from "../SearchBar";

export default function TableReview(props) {
  const { review, replyReviews, tabelHeader } = props;

  const PER_PAGE = 5;
  const setDataReview = (review) => {
    console.log("ini data booking di table review", review);
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
    setDataPagination(review);
  }, [review]);
  console.log(dataPagination);

  return (
    <div>
      <div className="flex flex-col mb-6">
        <div className="inline-block min-w-fit p-2">
          <div className="overflow-hidden">
            <div className="flex flex-row justify-between">
              <SearchBar _handleSearch={_handleSearch} />
              <div className="flex gap-2 items-center">
                <p className="text-primary-gray2">{`${offset + 1} - ${
                  offset + PER_PAGE
                } of ${review.length}`}</p>
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
            <table className="ml-4 table-fixed min-w-fit">
              <thead className="">
                <tr>
                  {tabelHeader.map((item) => (
                    <th className="text-base font-medium text-textColor-black px-6 py-4 text-left">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {review
                  ?.filter((item) => {
                    return item.review
                      .toLowerCase()
                      .includes(searchValue.toLowerCase());
                  })
                  .slice(offset, offset + PER_PAGE)
                  .map((value, reviewIdx) => (
                    <tr
                      className=" odd:bg-secondary-softblue text-primary-gray"
                      key={reviewIdx}
                      data-key={value.review_id}
                    >
                      <td className="text-base text-textColor-blackThin px-6 py-4 ">
                        {/* {value.review_id} */}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        {/* {value.user} */}
                      </td>
                      <td className="text-base text-textColor-blackThin px-6 py-4 ">
                        {/* {value.room.room_name} */}
                      </td>
                      <td className="text-base text-textColor-blackThin px-6 py-4 ">
                        {/* {value.reviewer.nama_customer} */}
                      </td>
                      <td className="text-base text-textColor-blackThin px-6 py-4 ">
                        {/* {value.review} */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* {showModal ? (
            <ModalReplyReview
              showModal={showModal}
              handleClose={_handleCloseModal}
              review={review}
            />
          ) : null} */}
        </div>
      </div>
    </div>
  );
}
