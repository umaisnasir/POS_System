import { Button, Tooltip, Menu } from "antd";
import React, { useState } from "react";
import { MoreOutlined, AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { FaBullseye } from "react-icons/fa";
import Menus from "./Menus";

const DrawerBtn = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip placement="top" title="POS MENU">
        <MoreOutlined
          onClick={(() => setOpen(true))}
          style={{ fontSize: "25px", cursor: "pointer" }}
        />
      </Tooltip><Menus open={open} setOpen={setOpen} />
    </>
  );
};

export default DrawerBtn;
