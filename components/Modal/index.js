import { Button, Modal } from "antd";
import { useState } from "react";

export const ModalToggle = ({
  children,
  title,
  buttonType,
  buttonLabel,
  buttonIcon,
  ...modalProps
}) => {
  const [visible, setVisible] = useState(false);
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
        {children}
      </Modal>
    </>
  );
};
