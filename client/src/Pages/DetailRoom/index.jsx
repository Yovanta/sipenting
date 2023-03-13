import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import {
  IoIosCloseCircleOutline,
  IoIosArrowDropleft,
  IoIosArrowDropright,
} from "react-icons/io";
import Facilities from "../../Components/Facilities";
import Spesification from "../../Components/Spesification";
import Button from "../../Components/Button";
import useFetch from "../../Hooks/useFetch";
import Loader from "../../Components/Loader";
import { AuthContext } from "../../Context/AuthContext";
import Booking from "../Booking";
import Navbar from "../../Components/Navbar";

export default function DetailRoom() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(`/rooms/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const images = [
    {
      img: require("../../Assets/image-carousel.png"),
      title: "Dolore magna",
      text: "Lorem ipsums dolor sit amet elit.",
    },
    {
      img: require("../../Assets/image-carousel.png"),
      title: "Eget est lorem",
      text: "Lorem Ipsum adipiscing elit ipsum.",
    },
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleBooking = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {loading ? (
        <Loader />
      ) : (
        <>
          {open && (
            <div className="fixed overflow-y-auto top-0 left-0 w-screen h-screen bg-secondary-blackrgba z-50 flex items-center">
              <IoIosCloseCircleOutline
                onClick={() => setOpen(false)}
                className="absolute top-8 right-8 text-primary-white text-3xl cursor-pointer"
              />
              <IoIosArrowDropleft
                onClick={() => handleMove("1")}
                className="m-8 text-primary-white text-3xl cursor-pointer"
              />
              <div className="w-full h-full flex justify-center items-center">
                <img
                  src={images[slideNumber].img}
                  alt=""
                  className="w-4/5 h-[80vh]"
                />
              </div>
              <IoIosArrowDropright
                onClick={() => handleMove("r")}
                className="m-8 text-primary-white text-3xl cursor-pointer"
              />
            </div>
          )}
          <div className="flex flex-col gap-8 relative w-full mt-0 top-0">
            <Navbar />

            <div className="flex justify-between items-center mx-4 tablet:flex-col phone:flex-col">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold">{data.name}</h1>
                <div>
                  <p>
                    ⭐️
                    <span>{data.rating} | 35 review</span>
                  </p>
                </div>
              </div>
              <h2 className="font-semibold">
                Gedung Kemahasiswaan FISIP Unila lantai 2
              </h2>
            </div>
            <div className="flex flex-wrap justify-between">
              {images.map((photo, i) => (
                <div className="w-1/2" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo.img}
                    alt=""
                    className="w-full object-cover cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-2xl">Description</h3>
              <p>{data.description}</p>
              <div className="flex">
                <Button
                  onClick={handleBooking}
                  className="bg-primary-blue text-primary-white"
                >
                  Booking Now
                </Button>
              </div>
            </div>
            <div className="flex justify-between m-8 gap-8 tablet:flex-col phone:flex-col">
              <Spesification />
              <Facilities />
            </div>
          </div>

          {openModal && <Booking setOpenModal={setOpenModal} roomId={id} />}

          <hr className="text-secondary-gray2 " />
          <div className="m-4">
            <h3 className="text-2xl text-center">Reviews</h3>
            <div className="flex justify-evenly phone:justify-between my-4">
              <p>
                ⭐️<span class="list_item_rating"> 4.5 | 35 review</span>
              </p>
              <NavLink className="text-primary-blue">View all</NavLink>
            </div>
            <div className="flex flex-wrap items-center justify-center">
              <div className="flex-col flex-wrap w-1/2 tablet:w-full phone:w-full m-4 gap-8 bg-primary-white rounded-lg shadow-xl  p-4 justify-center">
                <div className="flex flex-wrap justify-between items-center mb-2">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={require("../../Assets/image-carousel.png")}
                    alt="profile"
                  />
                  <div className="flex-col gap-2 -ml-64 phone:ml-0 tablet:ml-0">
                    <h1 className="text-xl font-bold">Jesica Jane</h1>
                    <p className="text-secondary-gray2">14 January 2022</p>
                  </div>
                  <p>
                    ⭐️<span class="list_item_rating"> 4.5</span>
                  </p>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Asperiores sit quia illo perferendis quasi minima! Ratione
                  quia itaque quidem, nostrum cum provident earum tempore cumque
                  dolores eaque architecto, pariatur molestiae.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
