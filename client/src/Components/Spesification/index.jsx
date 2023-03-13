import React from "react";

export default function Spesification() {
  return (
    <>
      <div className="flex flex-col flex-wrap w-1/2 tablet:w-full phone:w-full gap-4 rounded-lg shadow-xl p-4 bg-primary-white">
        <h3 className="text-2xl text-center">Spesification</h3>
        <table className="min-w-full mt-4">
          <tr className="border-collapse border">
            <th className="w-1/4 text-base font-semibold bg-secondary-softblue px-2 py-2 text-left">
              Kapasitas
            </th>
            <td className="w-1/2 text-base font-medium px-2 py-2 text-left">
              10 Orang
            </td>
          </tr>
          <tr className="border-collapse border">
            <th className="w-1/4 text-base font-semibold bg-secondary-softblue px-2 py-2 text-left">
              Luas
            </th>
            <td className="w-1/2 text-base font-medium px-2 py-2 text-left">
              10 meter
            </td>
          </tr>
          <tr className="border-collapse border">
            <th className="w-1/4 text-base font-semibold bg-secondary-softblue px-2 py-2 text-left">
              Bentuk Meja
            </th>
            <td className="w-1/2 text-base font-medium px-2 py-2 text-left">
              Office Table
            </td>
          </tr>
          <tr className="border-collapse border">
            <th className="w-1/4 text-base font-semibold bg-secondary-softblue px-2 py-2 text-left">
              Ruangan
            </th>
            <td className="w-1/2 text-base font-medium px-2 py-2 text-left">
              lt.2
            </td>
          </tr>
          <tr className="border-collapse border">
            <th className="w-1/4 text-base font-semibold bg-secondary-softblue px-2 py-2 text-left">
              Tipe Ruangan
            </th>
            <td className="w-1/2 text-base font-medium px-2 py-2 text-left">
              Working Space - Meeting Room
            </td>
          </tr>
          <tr className="border-collapse border">
            <th className="w-1/4 text-base font-semibold bg-secondary-softblue px-2 py-2 text-left">
              Status
            </th>
            <td className="w-1/2 text-base font-medium px-2 py-2 text-left">
              <button className="bg-secondary-error text-primary-red font-bold py-2 px-6 rounded-full">
                Booked
              </button>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}
