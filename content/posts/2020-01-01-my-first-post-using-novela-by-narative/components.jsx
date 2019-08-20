import React from "react";

export const TestMDXButton = () => (
  <div style={{display: "flex",justifyContent: "center"}}>
    <button
      onClick={() => alert("it works")}
      style={{border: "solid", borderRadius: 5, padding: 10}}
    >
      Click me!
    </button>
  </div>
);
