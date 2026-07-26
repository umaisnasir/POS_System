/* eslint-disable max-len */
import React from "react";
import { CoffeeOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { Link } from "react-router-dom";
import GlobalLoader from "../utils/GlobalLoader";
import bg from "../assets/bg.jpg";

const boxStyle = {
  height: "100vh",
  width: "100%",
  display: "grid",
  placeItems: "center",
  // background: "linear-gradient(to right, #5a3f37, #023020)",
  backgroundImage: `linear-gradient(to right, #5a3f37, #023020) ,url(${bg})`,
  backgroundPosition: "center center",
  backgroundRepeat: "repeat",
  backgroundBlendMode: "multiply"
};

const homeStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
};
const Home = () => {
  return (
    <div style={boxStyle}>
      <span style={homeStyle}>
        <h1 style={{ fontFamily: " 'Satisfy', cursive", fontWeight: "600", margin: "0px", fontSize: "70px", color: "lavenderblush" }}>POS</h1><br />
        <h2 style={{ color: "lavenderblush" }}>POINT OF SALE</h2><br />
        <Link to="/pos">
          <Button
            type="primary"
            icon={<CoffeeOutlined />}
            size="large"
            style={{ marginTop: "15px", background: "#28100b" }}

          >
            Let&apos;s Start
          </Button>
        </Link>
      </span>
    </div>

  );
};

export default Home;
