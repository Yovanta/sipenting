import React from "react";
import PageNotFound from "../../Assets/pagenotfound.png";

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className=" md:container md:mx-auto mt-6 px-3 ">
        <div>
          <img src={PageNotFound} className=" img-notfound mx-auto" alt="404" />
          <h1 className="text-center title-notfound">
            This page is outside of the Universe
          </h1>
          <p className="text-center mb-4 subtitle-notfound">
            The page you are trying to access doesn't exist or has been moved.{" "}
            <br />
            Try going back to our homepage.
          </p>
          <p className="text-center text-secondary-red hover:text-primary-blue ">
            <Link to="/dashboard" className="">
              Back to Dashboard
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
