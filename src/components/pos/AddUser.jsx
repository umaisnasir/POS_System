import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Modal, message } from "antd";
import React from "react";
import dayjs from "dayjs";
import { AxiosInstance } from "../../utils/Axios";
import UserForm from "./UserForm";

const AddUser = ({ modal1Open, setModal1Open }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  //   const { mutate } = useMutation({
  //     mutationFn: (values) => {
  //       return AxiosInstance.post("/users/add", values);
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["users"] });
  //       // navigate("/admin");
  //     },
  //   });

  const { mutate } = useMutation({
    mutationFn: (values) => {
      return AxiosInstance.post("/users/add", values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      message.success("User added successfully!");
    },
    onError: (error) => {
      message.error("Failed to add user. Please try again.");
    },
  });
  const handleSubmit = (values) => {
    const data = {
      ...values,
      birthDate: dayjs(values?.birthDate).format("YYYY-M-D"),
    };
    console.log("🚀 ~ handleSubmit ~ data:", data);
    mutate(data);
    setModal1Open(false);
  };
  return (
    <Modal
      title="New Customer"
      style={{
        top: 30,
      }}
      open={modal1Open}
      onOk={() => setModal1Open(false)}
      onCancel={() => setModal1Open(false)}
      footer={false}
    >
      <UserForm initialValue={{}} handleSubmit={handleSubmit} />
    </Modal>
  );
};

export default AddUser;
