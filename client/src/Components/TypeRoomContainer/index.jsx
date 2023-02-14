import React from 'react'
import {BsFillPersonFill} from 'react-icons/bs'

export default function TypeRoomContainer() {
  return (
    <>
    <div className="flex items-center bg-primary-white rounded-lg mt-2 shadow-xl w-80 p-2 gap-2">
      <img
        src={require("../../Assets/image-carousel.png")}
        alt=""
        width="80"
        className="rounded-lg"
      />
      <div className="flex-col gap-4">
        <div>
          <h1 className="font-bold">Meeting Room</h1>
          <p className='text-xs'>Bookable rooms available by the hour</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex w-16 text-xs bg-secondary-softblue rounded-lg m-2  p-2 shadow-xl items-center gap-2">
            <BsFillPersonFill/>
            <p>1-20</p>
            </div>
        </div>
      </div>
    </div>
  </>
  )
}
