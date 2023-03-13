import React from "react";
import { Chrono } from "react-chrono";
import { data } from "./data";
import "./styles.css";

export default function Timeline() {
  return (
    <div className="timeline">
      <div style={{ width: "1250px", height: "420px" }}>
        <Chrono
          items={data}
          mode="HORIZONTAL"
          slideShow
          slideItemDuration={4500}
          itemWidth={310}
          theme={{
            primary: "#4C35E0",
            secondary: "#fff",
            titleColor: "#4C35E0",
          }}
        />
      </div>
    </div>
  );
}
