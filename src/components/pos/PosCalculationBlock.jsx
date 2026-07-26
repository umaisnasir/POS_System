import { Button, Col, Form, Input, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  CheckCircleFilled,
  ContainerOutlined,
  DollarCircleFilled,
  PlusCircleOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { posState } from "../../context/CartContext";
import PaymentModal from "./PaymentModal";

const PosCalculationBlock = ({ userId }) => {
  const { state, dispatch } = posState();
  const [modal1Open, setModal1Open] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0); // default value 0
  const [serviceCharge, setServiceCharge] = useState(0); // default value 0
  const [adjustAmount, setAdjustAmount] = useState(0); // default value 0
  const [paymentData, setPaymentData] = useState({});

  // subtotal
  const subtotal = state.cart.reduce((acc, cur) => {
    return acc + (cur.qty * cur.price);
  }, 0);

  const totalWithDiscount = subtotal - (subtotal * discountPercentage) / 100;
  const totalWithServicesCharge = totalWithDiscount + serviceCharge;
  const total = totalWithServicesCharge - adjustAmount;

  useEffect(() => {
    const fetchedPaymentData = JSON.parse(localStorage.getItem("paymentData")) || {};
    setPaymentData(fetchedPaymentData);
  }, []);

  // Update localStorage whenever total changes
  useEffect(() => {
    localStorage.setItem("paymentData", JSON.stringify({
      subtotal,
      totalWithDiscount,
      discountPercentage,
      serviceCharge,
      total
    }));
    // Update paymentData state with the latest values
    setPaymentData({
      subtotal,
      totalWithDiscount,
      discountPercentage,
      serviceCharge,
      total
    });
  }, [subtotal, totalWithDiscount, discountPercentage, serviceCharge, total]);
  const handlePayment = () => {
    if (userId) {
      if (state.cart.length === 0) {
        message.warning("The cart is empty. Please add items before proceeding.");
      } else {
        setModal1Open(true);
      }
    } else {
      message.error("User is Reqired.");
    }
  };
  const resetHandler = () => {
    dispatch({ type: "RESET_CART" });
    setDiscountPercentage(0);
    setServiceCharge(0);
    setAdjustAmount(0);
  };
  return (
    <div className="poscalculation">

      <div className="poscalculation__inputs">
        <Form layout="vertical">
          <Row gutter={[8, 0]}>
            <Col span={12} lg={6}>
              <Form.Item label="Tax" style={{ textAlign: "center" }}>
                <Input
                  size="small"
                  // style={{
                  //   width: 90,
                  //   margin: "0 0px",
                  //   color: "#23253C",
                  //   fontWeight: "bold"
                  // }}
                    // value={cartData.reduce((a, c) => a + (c.tax_amount * c.quantity), 0)}
                  value="00"
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={12} lg={5}>
              <Form.Item label="Discount(%)">
                <Input
                  size="small"
                  style={{
                    width: 80,
                    margin: "0 0px",
                  }}
                  onChange={(e) => setDiscountPercentage(+e.target.value)}
                />
              </Form.Item>
            </Col>

            <Col span={12} lg={7}>
              <Form.Item label="Services">
                <Input
                  size="small"
                  style={{
                    width: 100,
                    margin: "0 0px",
                  }}
                  onChange={(e) => setServiceCharge(+e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12} lg={6}>
              <Form.Item label="Adjustment">
                <Input
                  size="small"
                  // style={{
                  //   width: 90,
                  //   margin: "0 0px",
                  // }}
                  onChange={(e) => setAdjustAmount(+e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

      <div className="poscalculation__area">
        <div className="pos__calculation__item">
          Total Item :<span>{state.cart.length}</span>
        </div>
        <div className="pos__calculation__item">
          SubTotal :<span>{new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(paymentData?.subtotal)}</span>
        </div>
        <div className="pos__calculation__item">
          Total :<span> {new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(paymentData?.total)}</span>
        </div>
      </div>

      <div className="poscalculation__submits">
        <div className="pos__calculation__btn">
          <Button
            icon={<RedoOutlined />}
            size="small"
            onClick={resetHandler}
            style={{ width: "30%", marginTop: "15px" }}
          >
            Reset
          </Button>
          <Button
            type="primary"
            icon={<ContainerOutlined />}
            size="small"
            // onClick={draftHandler}
            style={{ width: "30%", marginTop: "15px", background: "#28100b" }}
          >
            Draft
          </Button>

          <Button
            type="primary"
            icon={<DollarCircleFilled />}
            size="small"
            // onClick={() => setModal1Open(true)}
            onClick={handlePayment}
            style={{ width: "30%", marginTop: "15px", background: "#28100b" }}
          >
            Pay Now
          </Button>
          <PaymentModal
            modal1Open={modal1Open}
            setModal1Open={setModal1Open}
            payable_amount={total}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
};

export default PosCalculationBlock;
