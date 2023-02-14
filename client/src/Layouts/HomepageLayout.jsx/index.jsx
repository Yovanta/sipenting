import React from "react";
import Navbar from "../../Components/Navbar";

export default function HomepageLayout(props) {
  return (
    <div>
      <Navbar {...props}/>
      {props.children}
    </div>
  );
}
