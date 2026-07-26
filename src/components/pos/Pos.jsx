/* eslint-disable max-len */
import { SearchOutlined } from "@ant-design/icons";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Col, Input, Row, Select, Tabs } from "antd";
import debounce from "lodash.debounce";
import React, { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AxiosInstance } from "../../utils/Axios";
import CartItem from "./CartItem";
import DraftButton from "./DraftButton";
import DrawerBtn from "./DrawerBtn";
import FullScreenBtn from "./FullScreenBtn";
import PosCalculationBlock from "./PosCalculationBlock";
import PosCustomer from "./PosCustomer";
import ProductCard from "./ProductCard";
import ThemeBtn from "./ThemeBtn";
import { posState } from "../../context/CartContext";
import GlobalLoader from "../../utils/GlobalLoader";

const Pos = () => {
  const { state, dispatch } = posState();
  const [userId, setUserId] = useState();
  const [searchParam, setSearchParam] = useSearchParams();
  const q = searchParam.get("q") || "";
  const category = searchParam.get("category") || "";

  const {
    isLoading: catIsLoading,
    isError: catIsError,
    data: categories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      AxiosInstance.get("/products/categories").then((res) => res.data),
  });
  console.log("🚀 ~ Pos ~ categories:", categories);
  // console.log("🚀 ~ Pos ~ categories:", categories);
  const {
    isLoading,
    isError,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products", q, category],
    queryFn: async () => {
      let url = `/products/search?q=${q}`;
      if (category) {
        url = `/products/category/${category}`;
      }
      const res = await AxiosInstance.get(url);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });

  const categoryHandler = (key) => {
    setSearchParam((prev) => {
      prev.delete("q");
      prev.set("category", key);
      return prev;
    });
  };
  const handleAddToCart = (c_item) => {
    console.log("🚀 ~ handleAddToCart ~ c_item:", c_item);
    dispatch({
      type: "ADD_TO_CART",
      payload: c_item,
    });

    const updatedCart = [...state.cart, c_item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleUserSelect = (userId) => {
    console.log("Selected user robin---:", userId);
    setUserId(userId);
  };

  if (isLoading) return <GlobalLoader />;
  if (isError) return `An error has occurred: ${error.message}`;

  return (
    <div className="pos">
      <div className="pos__products">
        <div className="pos__top">
          <Row gutter={[24, 0]} style={{ paddingTop: "10px" }}>
            <Col span={2}>
              <DrawerBtn />
            </Col>
            <Col span={8}>
              <Input
                placeholder="Search here"
                onChange={debounce((e) => {
                  setSearchParam((prev) => {
                    prev.set("q", e.target.value);
                    prev.delete("category");
                    return prev;
                  });
                }, 1000)}
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col span={8}>
              <Select
                name="category"
                showSearch
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
    }
                filterSort={(optionA, optionB) =>
                  (String(optionA?.label ?? "")).toLowerCase()
                    .localeCompare((String(optionB?.label ?? "")).toLowerCase())
    }
                options={categories?.map((category, index) => ({
                  value: category.slug, // Use 'slug' as the value
                  label: category.name, // Use 'name' to render the label
                }))}
                onChange={(value) => {
                  setSearchParam((prev) => {
                    const newSearchParams = new URLSearchParams(prev.toString()); // Copy to avoid mutating the original object
                    newSearchParams.delete("q");
                    newSearchParams.set("category", value); // Correct way to update the URL search params
                    return newSearchParams; // Return the updated object
                  });
                }}
              />
            </Col>
            <Col span={2}>
              <DraftButton />
            </Col>
            <Col span={2}>
              <FullScreenBtn />
            </Col>
            <Col span={2}>
              <ThemeBtn />
            </Col>
          </Row>
        </div>
        <div className="pos__menu">
          <Row gutter={[24, 0]}>
            <Col span={24}>
              <Tabs
                defaultActiveKey="1"
                tabPosition="top"
                style={{
                  height: 50,
                }}
                items={
                !catIsLoading && !catIsError && Array.isArray(categories)
                  ? categories.map((category) => {
                    return {
                      label: category.name,
                      key: category.slug,
                    };
                  })
                  : []
              }
                onTabClick={categoryHandler}
              />

            </Col>
          </Row>
        </div>
        <div className="show__product">
          <Row gutter={[24, 24]}>
            {products?.products.map((product) => (
              <Col span={12} md={8} lg={6} xxl={6} key={product.id} onClick={() => handleAddToCart(product)}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <div className="pos__cart">
        <div className="cart__top">
          <PosCustomer onSelectUser={handleUserSelect} />
        </div>

        <div className="cart__items">
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <CartItem />
            </Col>
          </Row>
        </div>
        <div className="cart__calculation">
          <PosCalculationBlock userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Pos;
