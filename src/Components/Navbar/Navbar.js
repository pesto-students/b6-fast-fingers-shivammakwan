import React from "react";
import { useDataLayerValue } from "../../Context/DataLayer";

export const Navbar = () => {
  const [{ playerName, level, scores }, dispatch] = useDataLayerValue();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{playerName}</span>
        <span>LEVEL - {level}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>FAST FINGERS</span>
        <span>SCORE - {Math.round(scores.reduce((a, b) => a + b, 0))}</span>
      </div>
    </div>
  );
};
