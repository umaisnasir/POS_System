import React, { useState } from "react";
import { Drawer, Button, Tooltip, Menu } from "antd";
import { MoreOutlined, AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { FaBullseye } from "react-icons/fa";
import bg from "../../assets/bg.jpg";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("POS", "grp", null, [
    getItem("User List", "13"),
    getItem("Product List", "14"),
    getItem("Order List", "15")
  ], "group"),
];
const Menus = ({ open, setOpen }) => {
  const onClose = () => {
    setOpen(false);
  };
  const onClick = (e) => {
    console.log("click ", e);
  };
  return (

    <Drawer
      title="POS MENU"
      onClose={onClose}
      open={open}
      placement="left"
      width="250px"
    >
      <Menu
        onClick={onClick}
        style={{
          width: 200,
          background: "transparent"
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </Drawer>

  );
};

export default Menus;
