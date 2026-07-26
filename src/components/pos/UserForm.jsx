import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import React, { useState } from "react";

import {
  CaretLeftOutlined,
  CheckCircleFilled,
  ReloadOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const UserForm = ({ handleSubmit, initialValue }) => {
  const initialValues = {
    firstName: initialValue.firstName || "",
    lastName: initialValue.lastName || "",
    eamil: initialValue.eamil || "",
    phone: initialValue.phone || "",
    username: initialValue.username || "",
    password: initialValue.password || "",
    gender: initialValue.gender || "",
    birthDate: initialValue.birthDate || "",
  };
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("🚀 ~ onFinish ~ values:", values);
    handleSubmit(values);
    form.resetFields();
  };
  return (
    <Form
      form={form}
      name="trigger"
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
      initialValues={initialValues}
    >

      <Row gutter={[16, 8]}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label="First Name"
            validateDebounce={1000}
            rules={[
              {
                max: 10,
                required: true,
                message: "Please enter first name",
              },
            ]}
          >
            <Input placeholder="Please enter first name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            label="Last Name"
            validateDebounce={1000}
            rules={[
              {
                max: 10,
                required: true,
                message: "Please enter last name",
              },
            ]}
          >
            <Input placeholder="Please enter last name" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8]}>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                max: 30,
                required: true,
                message: " enter email ",
              },
            ]}
          >
            <Input placeholder=" enter  email" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                max: 11,
                required: true,
                message: " enter phone number",
              },
            ]}
          >
            <Input placeholder=" enter phone number" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8]}>
        <Col span={12}>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                max: 5,
                required: true,
                message: " enter your username",
              },
            ]}
          >
            <Input placeholder=" enter your username" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                max: 10,
                required: true,
                message: "enter your password",
              },
            ]}
          >
            <Input placeholder="enter your password" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[8]}>
        <Col span={12}>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="birthDate" label="Birthday">
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className="submit__btn">
            <Space>
              <Button icon={<CaretLeftOutlined />}>Back</Button>
              <Button icon={<ReloadOutlined />} htmlType="reset">
                Reset
              </Button>
              <Button
                type="primary"
                icon={<CheckCircleFilled />}
                htmlType="submit"
              >
                Submit
              </Button>
            </Space>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default UserForm;
