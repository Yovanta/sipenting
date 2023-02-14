import React from "react";

export default function CustomButton({ children, ...otherProps }) {
  return <button {...otherProps}>{children}</button>;
}
