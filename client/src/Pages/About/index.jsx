import React from "react";
import { MapContainer, Popup, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import Button from "../../Components/Button";
import Timeline from "../../Components/Timeline";
import Navbar from "../../Components/Navbar";

export default function About() {
  const markerIcon = new L.Icon({
    iconUrl: require("../../Assets/marker.png"),
    iconSize: [20, 30],
  });
  return (
    <>
      <Navbar />

      <section className="body-font">
        <div className="container mx-auto flex py-24 flex-row gap-16 items-center tablet:flex-col phone:flex-col">
          <div className="w-1/2 flex-grow phone:w-full">
            <img
              className="rounded-lg object-cover object-center"
              alt="hero"
              src={require("../../Assets/image1.png")}
            />
          </div>
          <div className="w-1/2 flex flex-col items-start text-left">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium">
              Workspace where and when you need it
            </h1>
            <p className="mb-8 leading-relaxed">
              is an Enterprise-grade Facilities Management Software developed,
              owned and supported by SIERRA ODC Private Limited, a two-decade
              year old Software company operating in India with offices in USA,
              Malaysia and the Middle East. SIERRA, a Microsoft Gold-Certified
              partner is committed to provide world-className Software services
              and solutions to customers across the globe. SIERRA strives to
              offer the best long-term value with precision, quality, and
              on-time to all our customers, partners, re-sellers and employees.
            </p>
            <div className="flex justify-center">
              <Button className="inline-flex text-primary-white bg-primary-blue border-0 py-2 px-6 focus:outline-none hover:bg-primary-blue rounded text-lg">
                Discovery Now
              </Button>
            </div>
          </div>
        </div>

        {/* address  */}
        <div className="flex laptop:flex-row tablet:flex-col phone:flex-col gap-8 my-4 mx-4">
          {/* maps  */}
          <MapContainer
            style={{ height: "250px", width: "100%" }}
            center={[-5.2372093307331715, 105.25564210152386]}
            zoom={9}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[-5.2372093307331715, 105.25564210152386]}
              icon={markerIcon}
            >
              <Popup className="font-semibold">
                Gedung Lembaga Kemahasiswaan FISIP Unila
              </Popup>
            </Marker>
          </MapContainer>

          <div className="rounded-lg shadow-xl p-4 flex flex-col gap-4 justify-center">
            <div>
              <h1 className="text-lg font-semibold">Alamat</h1>
              <p>Gedung Lembaga Kemahasiswaan FISIP Universitas Lampung</p>
            </div>
            <div>
              <h1 className="text-lg font-semibold">Jam Buka</h1>
              <p>Senin - Jumat, 08.00-17.00 WIB</p>
            </div>
            <div>
              <h1 className="text-lg font-semibold">Contact Person</h1>
              <p>082280327653</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
