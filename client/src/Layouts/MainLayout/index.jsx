import React from "react";
import NavbarLogin from "../../Components/NavbarLogin";

export default function MainLayout(props) {
  return (
    <div>
      <NavbarLogin {...props} />
      {props.children}
    </div>
  );
}
