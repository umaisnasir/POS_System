import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";

const handleChange = (e) => {
  console.log(e);
};
const SearchBox = () => {
  return (
    <Input
      placeholder="Search here"
      onChange={handleChange}
      prefix={<SearchOutlined />}
      size="large"
    />
  );
};

export default SearchBox;
// import React, { useState } from "react";
// import { SearchOutlined } from "@ant-design/icons";
// import { Input } from "antd";
// import debounce from "lodash.debounce";
// import { useSearchParams } from "react-router-dom";

// const SearchBox = ({ onSrcChange }) => {
//   const [searchParam, setSearchParam] = useSearchParams();
//   // console.log("🚀 ~ SearchBox ~ searchParam:", searchParam.get("q"));
//   const handleChange = debounce((e) => {
//     const newValue = e.target.value;
//     onSrcChange(
//       setSearchParam((prev) => {
//         prev.set("q", newValue);
//         prev.delete("category");
//         return prev;
//       })
//     );
//   }, 1000);
//   return (
//     <Input
//       placeholder="Search here"
//       onChange={handleChange}
//       prefix={<SearchOutlined />}
//     />
//   );
// };

// export default SearchBox;
