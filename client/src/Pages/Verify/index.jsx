import React from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../Components/Button";
import Loader from "../../Components/Loader";
import useFetch from "../../Hooks/useFetch";

export default function VerifyAccount() {
  const { userId, uniqueString } = useParams();

  console.log(userId);
  console.log(uniqueString);

  const { data, loading, error } = useFetch(
    `/auth/verify/${userId}/${uniqueString}`
  );

  console.log(error);
  const isVerified = data.message === "Email verified successfully";

  return (
    <div className="w-full h-screen bg-primary-white text-primary-white">
      {loading && (
        <div>
          <Loader />
        </div>
      )}{" "}
      {!loading && isVerified && (
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col gap-4 w-1/2 items-center p-5 bg-primary-blue rounded-lg">
            <h2 className="uppercase text-2xl font-semibold">Email has been verified</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="85"
              height="85"
              fill="currentColor"
              class="bi bi-check-circle-fill animated swing"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
            <h3 className="text-xl">You can now log in</h3>
            <Link to="/login">
              <Button className="w-1/2 text-primary-blue bg-primary-white">
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
      {!loading && !isVerified && (
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col gap-4 w-1/2 items-center p-5 bg-primary-red rounded-lg">
            <h2 className="uppercase text-2xl font-semibold">Error verifying email</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="85"
              height="85"
              fill="currentColor"
              class="bi bi-x-circle-fill animated swing"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
            <h3 className="text-xl">Please try again!</h3>
            {error && (
              <div className="flex flex-col m-auto w-1/2 items-center px-5 bg-primary-red italic">
                {error.response.data.message}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
