import React, { useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useLocation } from "react-router-dom";

import "./NavbarStyle.css";

const NAVBAR_TEXTS = [
  { pages: "Dashboard", path: "/dashboard" },
  { pages: "Room", path: "/room" },
  { pages: "Create Room", path: "/create-room" },
  { pages: "Update Room", path: "/update-room/:id" },
  { pages: "Building", path: "/building" },
  { pages: "Create Building", path: "/create-building" },
  { pages: "Update Building", path: "/update-building/:id" },
  { pages: "Complex", path: "/complex" },
  { pages: "Create Complex", path: "/create-complex" },
  { pages: "Update Complex", path: `/update-complex/:id` },

  { pages: "Customer", path: "/customer" },
  { pages: "Manage Review", path: "/review" },
  { pages: "Chat", path: "/chat" },
  { pages: "Manage Booking", path: "/booking" },
];

export default function Navbar({ fixed }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();
  const textToShow = NAVBAR_TEXTS.find(
    (text) => text.path === location.pathname
  );

  // console.log(textToShow);

  return (
    <>
      <div className="flex flex-wrap fixed justify-end md:w-10/12 w-3/12 bg-primary-white right-0 rounded-l">
        <div className="w-full">
          <nav className=" flex flex-wrap right-0 items-center justify-between px-2 py-3 bg-primary-white rounded-l-lg">
            <div className="container px-6 mx-auto flex flex-wrap items-center justify-between">
              <div className="w-full relative flex left-8 justify-end lg:w-auto lg:static lg:block ">
                <button
                  className="text-primary-blue cursor-pointer text-xl leading-none px-3 py-1 rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <HiOutlineMenuAlt3 />
                </button>
              </div>
              <div
                className={
                  "lg:flex flex-grow items-center" +
                  (menuOpen ? " row" : " hidden")
                }
                id="example-navbar-info"
              >
                <h1 className="font-bold text-2xl">{textToShow.pages}</h1>

                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-primary-blue hover:opacity-75"
                      href="#pablo"
                    >
                      Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-primary-blue hover:opacity-75"
                      href="#pablo"
                    >
                      Settings
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
