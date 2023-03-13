import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

import { SidebarData } from "./SidebarData";
import Logo from "../Logo";
import { FaBars } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);
  //logout
  const logout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Yakin logout?",
      text: "Jika ingin masuk silahkan login kembali!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "LOGOUT" }); 
        localStorage.removeItem("user");
        Cookies.remove("access_token");
        navigate("/");
        Swal.fire("Berhasil!", "success");
      }
    });
  };

  return (
    <>
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section ">
          <Logo className={`${isOpen ? "block" : "none"}`} />
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <div className="">
          {SidebarData.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="text-primary-gray link my-2"
              activeclassname="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.title}
              </div>
            </NavLink>
          ))}
        </div>
        <hr className="mx-3 text-primary-gray3" />
        <div className="icon my-2">
          <NavLink onClick={logout} className="link">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="mt-1"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.25 19C11.25 18.5858 11.5858 18.25 12 18.25H18C18.1381 18.25 18.25 18.1381 18.25 18L18.25 6C18.25 5.86193 18.1381 5.75 18 5.75L12 5.75C11.5858 5.75 11.25 5.41421 11.25 5C11.25 4.58579 11.5858 4.25 12 4.25H18C18.9665 4.25 19.75 5.0335 19.75 6V18C19.75 18.9665 18.9665 19.75 18 19.75H12C11.5858 19.75 11.25 19.4142 11.25 19Z"
                className="fill-primary-black"
              />
              <path
                d="M15.6116 13.1152C15.6116 13.6675 15.1639 14.1152 14.6116 14.1152H9.75562C9.73269 14.4706 9.70399 14.8258 9.66951 15.1805L9.63985 15.4857C9.59162 15.982 9.06466 16.2791 8.61504 16.0637C6.78712 15.1876 5.13234 13.9889 3.73028 12.525L3.70032 12.4937C3.43323 12.2148 3.43323 11.7751 3.70032 11.4962L3.73028 11.4649C5.13234 10.001 6.78712 8.80226 8.61504 7.92625C9.06466 7.71077 9.59162 8.00796 9.63985 8.5042L9.66951 8.8094C9.70399 9.16413 9.73269 9.51928 9.75562 9.8747L14.6116 9.87471C15.1639 9.87471 15.6116 10.3224 15.6116 10.8747V13.1152Z"
                className="fill-primary-black"
              />
            </svg>
            <span
              style={{ display: isOpen ? "block" : "none" }}
              className="text-primary-black"
            >
              logout
            </span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
