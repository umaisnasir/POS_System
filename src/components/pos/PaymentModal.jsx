import { Button, Input, Modal, Select, Table, message } from "antd";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Invoice from "./Invoice";

const PaymentModal = (
  {
    modal1Open,
    setModal1Open,
    payable_amount,
    subtotal,
    discountPercentage,
    totalWithDiscount,
    serviceCharge,
    userId
  }) => {
  const navigate = useNavigate();
  const paymentOptions = [
    {
      label: "Cash",
      value: 1,
    },
    {
      label: "Card",
      value: 2,
    },
    {
      label: "Wallet",
      value: 3,
    },
  ];
  const [payingAmount, setPayingAmount] = useState(0);
  const [options, setOptions] = useState(paymentOptions);
  const [paymentRow, setPaymentRow] = useState([
    {
      type: "",
      tranx_id: "",
      total: "",
    },
  ]);

  const addMoreBtnHandler = () => {
    const remainingAmount = payable_amount - payingAmount;

    if (remainingAmount <= 0) {
      message.warning("Remaining amount is zero or less. No more payments can be added.");
    } else {
      // Add a new payment row
      setPaymentRow((prevState) => {
        return [
          ...prevState,
          {
            type: "",
            tranx_id: "",
            total: "",
          },
        ];
      });
    }
  };
  const handleSelect = (value, v, idx) => {
    const newPaymentRow = [...paymentRow];
    newPaymentRow[idx].type = value;

    const newPaymentOptions = [...paymentOptions];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; newPaymentRow.length > i; i++) {
      // eslint-disable-next-line no-plusplus
      for (let j = 0; newPaymentOptions.length > j; j++) {
        if (newPaymentRow[i].type === newPaymentOptions[j].value) {
          newPaymentOptions.splice(j, 1);
        }
      }
    }
    setOptions(newPaymentOptions);
    setPaymentRow(newPaymentRow);
  };
  const handleChange = (e, idx) => {
    const newPaymentRow = [...paymentRow];
    if (e.target.name === "total") {
      newPaymentRow[idx][e.target.name] = +e.target.value;
    } else {
      newPaymentRow[idx][e.target.name] = e.target.value;
    }
    setPaymentRow(newPaymentRow);
    if (e.target.name === "total") {
      const totalPayingAmount = newPaymentRow.reduce(
        (prevValue, currValue) => prevValue + parseFloat(currValue.total || 0),
        0
      );
      console.log("totalPayingAmount----------", totalPayingAmount);
      console.log("payable_amount----------", payable_amount);

      if (totalPayingAmount > payable_amount) {
        message.warning("Total amount exceeds the paying amount");
      } else {
        // message.warning("");
      }

      setPayingAmount(totalPayingAmount);
    }

    if (e.target.name === "tranx_id" && (newPaymentRow[idx].type === 2 || newPaymentRow[idx].type === 3)) {
      const maxFourDigits = e.target.value.slice(0, 4);
      newPaymentRow[idx].tranx_id = maxFourDigits;
    }
  };
  const removeHandler = (idx) => {
    if (paymentRow.length > 1) {
      const newPaymentRow = [...paymentRow];
      const deletedMethod = newPaymentRow.splice(idx, 1);

      if (deletedMethod[0].type) {
        const findDeletedOption = paymentOptions.find(
          (item) => item.value === deletedMethod[0].type
        );
        setOptions((prevState) => [...prevState, findDeletedOption]);
      }

      if (deletedMethod[0].total) {
        const totalPayingAmount = paymentRow.reduce(
          // eslint-disable-next-line no-unsafe-optional-chaining
          (prevValue, currValue) => prevValue + +currValue?.total,
          0
        );
        setPayingAmount(totalPayingAmount);
      }
      setPaymentRow(newPaymentRow);
    }
  };
  const handleOk = () => {
    if (payingAmount === 0) {
      message.error("You must enter a payment amount.");
    } else {
      setModal1Open(false);
      window.open(`/pos/invoice/:${userId}`, "_blank");
    }
  };
  const columns = [
    {
      title: "Payment Method",
      dataIndex: "type",
      render: (value, obj, idx) => {
        let methodName;
        if (value === 1) {
          methodName = "Cash";
        } else if (value === 2) {
          methodName = "Card";
        } else if (value === 3) {
          methodName = "Wallet";
        } else {
          methodName = null;
        }
        return (
          <Select
            placeholder="Select a option"
            style={{ width: "100%" }}
            options={options}
            onChange={(changeValue, changeAllValue) =>
              handleSelect(changeValue, changeAllValue, idx)
                }
            value={methodName || null}
          />
        );
      },
    },
    {
      title: "Reference",
      dataIndex: "tranx_id",
      render: (value, v, idx) => {
        let placeholderMsg = "";
        if (v.type == 1) {
          placeholderMsg = "payed by cash";
        } else if (v.type == 2) {
          placeholderMsg = "Last 4 digit";
        } else if (v.type == 3) {
          placeholderMsg = "Transaction ID";
        } else {
          placeholderMsg = "";
        }

        return (
          <Input
            placeholder={placeholderMsg}
            name="tranx_id"
            onChange={(e) => handleChange(e, idx)}
            value={value || null}
            style={{ width: "100%" }}
            disabled={v.type === 1}
          />
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "total",
      render: (value, v, idx) => {
        return (
          <Input
            placeholder="Total"
            name="total"
            onChange={(e) => handleChange(e, idx)}
            type="number"
            value={value || null}
            style={{ width: "100%" }}
          />
        );
      },
    },
    {
      title: "Action",
      align: "center",
      render: (value, val, idx) => {
        return (
          <Button
            type="danger"
            size="small"
            onClick={() => removeHandler(idx)}
            style={{ margin: "0" }}
          >
            Remove
          </Button>
        );
      },
    },
  ];
  return (
    <Modal
      // title="Payment Now"
      style={{ top: 20 }}
      open={modal1Open}
      // onOk={() => setModal1Open(false)}
      onCancel={() => setModal1Open(false)}
      title={`Payable Amount - $ ${payable_amount.toFixed(2)}`}
      width="800px"
      onOk={handleOk}
      // onCancel={handleCancel}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { background: "#28100b" } }}
      maskClosable={false}
      okText="Submit"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            margin: options.length ? "0" : "0 0 8px 0",
            display: "flex",
            columnGap: "5px",
            color: "#23253c",
            alignItems: "baseline",
            marginBottom: "10px"
          }}
        >
          {/* Remain: ${(payable_amount - payingAmount).toFixed(2)} */}
          Remain:<span style={{ color: "#23253c", background: "#faad14", fontWeight: "600", padding: "5px 10px", borderRadius: "5px" }}> ${(payable_amount - payingAmount).toFixed(2)}</span>
        </p>
        {options.length ? (
          <Button type="primary" style={{ background: "#28100b" }} onClick={addMoreBtnHandler}>
            Add More
          </Button>
        ) : null}
      </div>
      <Table
        columns={columns}
        dataSource={paymentRow}
        className="payment__method-table"
        pagination={false}
      />
    </Modal>
  );
};

export default PaymentModal;
