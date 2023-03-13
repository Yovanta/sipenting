import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import IconDelete from "../IconDelete";
import SearchBar from "../SearchBar";

export default function TableCustomer(props) {
  const { customer, tabelHeader, handleDelete } = props;

  const PER_PAGE = 5;

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
    setData(customer);
  }, [customer]);
  console.log(data);

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
                } of ${customer?.length}`}</p>
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
            <table className="w-full">
              <thead className="bg-white">
                <tr>
                  {tabelHeader.map((item) => (
                    <th className="text-base font-medium text-primary-black px-6 py-4 text-left border-y-2">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {customer &&
                  customer
                    .filter((item) => item.isAdmin !== true)
                    ?.filter((item) => {
                      return item.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase());
                    })
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .slice(offset, offset + PER_PAGE)
                    .map((customer, customerIdx) => (
                      <tr className="odd:bg-secondary-softblue text-primary-gray">
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {customer._id}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {customer.name}
                        </td>
                        <td className="text-base text-textColor-blackThin px-6 py-4 whitespace-nowrap">
                          {customer.username}
                        </td>
                        <td className="text-base text-textColor-blackThin px-6 py-4 whitespace-nowrap">
                          {customer.email}
                        </td>
                        <td className="text-base text-textColor-blackThin  px-6 py-4 whitespace-nowrap">
                          {customer.occupation}
                        </td>
                        <td className="flex justify-center gap-8 px-6 py-4 whitespace-nowrap">
                          <button onClick={() => handleDelete(customer._id)}>
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
