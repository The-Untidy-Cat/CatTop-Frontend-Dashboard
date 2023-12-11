import { Button, Modal } from "antd";
import React, { useState } from "react";

export const ModalToggle = ({
  children,
  modal = {
    title: "Modal",
    className: null,
  },
  button = {
    size: "default", // "small", "large"
    label: "Modal",
    type: "default",
    icon: null,
    className: null,
    disabled: false,
  },
}) => {
  const [visible, setVisible] = useState(false);
  const clonedChildren = React.cloneElement(children, {
    onClose: () => {
      setVisible(false);
    },
  });
  return (
    <>
      <Button
        type={button.type}
        onClick={() => setVisible(true)}
        icon={button.icon}
        className={`flex items-center align-center font-medium ${
          button.type === "primary" && "text-white bg-primary"
        } ${button.className}`}
        size={button.size}
        disabled={button.disabled}
      >
        {button.label}
      </Button>
      <Modal
        title={modal.title}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        className={"lg:min-w-[60%] modal.className"}
        centered
      >
        {clonedChildren}
      </Modal>
    </>
  );
};
