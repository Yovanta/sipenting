import React from "react";
import { BiUser } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdEventAvailable, MdRateReview } from "react-icons/md";
import UseFetch from "../../Hooks/UseFetch";
import { Link, useLocation } from "react-router-dom";

export default function Widget({ type, booking, todaysBooking, availableRoom }) {
  let data = {
    title: "",
    link: "",
    icon: null,
    amount: 0,
  };

  const location = useLocation();
  const path = location.pathname.split("dashboard")[1];

  const { data: review } = UseFetch("/reviews");
  const { data: user } = UseFetch("/users");
  const allUser = user.filter((item) => item.isAdmin === false);


  switch (type) {
    case "user":
      data = {
        title: "users",
        link: "customer",
        amount: allUser.length,
        icon: (
          <BiUser
            className="text-3xl p-1 rounded items-end"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "bookings",
        link: "booking",
        amount: booking.length,
        icon: (
          <AiOutlineShoppingCart
            className="text-3xl p-1 rounded items-end"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "available":
      data = {
        title: "available room",
        link: "room",
        amount: availableRoom.length,
        icon: (
          <MdEventAvailable
            className="text-3xl p-1 rounded items-end"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "new":
      data = {
        title: "review room",
        link: "review",
        amount: review.length,
        icon: (
          <MdRateReview
            className="text-3xl p-1 rounded items-end"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="flex justify-between items-center flex-1 p-2 bg-primary-white rounded-xl shadow-xl h-24">
      <div className="flex flex-col justify-between">
        <span className="font-semibold uppercase">{data.title}</span>
        <span className="text-2xl">{data.amount}</span>
        <Link to={`${path}/${data.link}`}>
          <span className="w-max text-primary-blue">See all {data.title}</span>
        </Link>
      </div>
      <div className="flex">{data.icon}</div>
    </div>
  );
}
