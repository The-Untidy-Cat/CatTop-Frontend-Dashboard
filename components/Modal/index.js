import { Button, Modal } from "antd";
import React, { useState } from "react";

export const ModalToggle = ({
  children,
  title,
  buttonType,
  buttonLabel,
  buttonIcon,
  ...modalProps
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
        type={buttonType}
        onClick={() => setVisible(true)}
        icon={buttonIcon}
        className={`flex items-center align-center font-medium ${
          buttonType === "primary" && "text-white bg-primary"
        }`}
      >
        {buttonLabel}
      </Button>
      <Modal
        title={title}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        centered
      >
        {clonedChildren}
      </Modal>
    </>
  );
};
