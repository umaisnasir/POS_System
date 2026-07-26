import React from "react";
import { Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { AxiosInstance } from "../../utils/Axios";

const CategoryBox = ({ onCatChange }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  const category = searchParam.get("category") || "";
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      AxiosInstance
        .get("/products/categories")
        .then((res) => res.data),
  });
  const handleChange = (value) => {
    setSearchParam((prev) => {
      prev.delete("q");
      prev.set("category", value);
      return prev;
    });
    onCatChange(value);
  };
  return (
    <Select
      showSearch
      size="large"
      placeholder="Search to Select"
      optionFilterProp="children"
      filterOption={(input, option) => (option?.label ?? "").includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
      }
      options={
        categories?.map((category, index) => ({
          value: category,
          label: category,
        }))
      }
      onChange={handleChange}
    />
  );
};

export default CategoryBox;
