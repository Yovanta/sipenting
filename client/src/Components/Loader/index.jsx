import React from "react";

export default function Loader() {
  const circleCommonClasses = "h-2.5 w-2.5 bg-primary-blue rounded-full";

  return (
    <div className="flex">
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
      <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  );
}
