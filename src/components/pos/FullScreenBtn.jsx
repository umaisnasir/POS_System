import React, { useState } from "react";
import { ExpandOutlined, CompressOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const FullScreenBtn = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <Tooltip placement="top" title="Full Screen">
      <div
        className={isFullScreen ? "fullscreen-enter-active" : "fullscreen-exit-active"}
        style={{ display: "inline-block" }}
      >
        {isFullScreen ? (
          <CompressOutlined
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={toggleFullScreen}
          />
        ) : (
          <ExpandOutlined
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={toggleFullScreen}
          />
        )}
      </div>
    </Tooltip>
  );
};

export default FullScreenBtn;
