import React from "react";
import { Spin } from "antd";

const contentStyle = {
  padding: " 50px",
  // background: "rgba(0, 0, 0, 0.05)",
  background: "transparent",
  borderRadius: " 4px",
  maxHeight: "100vh",
};
const loading = {
  height: "100vh",
  width: "100%",
  display: "grid",
  placeItems: "center",
};
const GlobalLoader = () => {
  return (
    <div style={loading}>
      <Spin tip="Loading ..." size="large" style={{ color: "#28100b" }}>
        <div style={contentStyle} />
      </Spin>
    </div>
  );
};

export default GlobalLoader;
