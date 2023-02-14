import React from "react";

export default function SearchBar(props) {
  const { _handleSearch } = props;

  return (
    <>
      <div className="ml-2 mt-2 row justify-start">
        <div className="xl:w-96 ">
          <div className="input-group relative flex items-stretch w-full mb-4 bg-primary-white border border-solid hover:border-primary-blue border-primary-gray3 rounded-lg p-2">
            <input
              type="search"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-primary-gray bg-primary-white bg-clip-padding rounded-md transition ease-in-out m-0 focus:text-primary-gray focus:bg-primary-white focus:border-primary-white focus:outline-none"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon3"
              onChange={(e) => _handleSearch(e)}
            />
            <button
              className="relative btn inline-block px-4 py-2 hover:text-primary-blue text-primary-gray font-medium text-xs leading-tight uppercase rounded-r-md border-secondary-white hover:bg-secondary-white hover:bg-opacity-3 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              type="button"
              id="button-addon3"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
