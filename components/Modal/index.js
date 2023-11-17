import { Button, Modal } from "antd";
import { useState } from "react";

export const ModalToggle = ({children, title, buttonType, buttonLabel, buttonIcon, ...modalProps}) => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Button class="rounded-lg w-24 h-9 mr-7 bg-lime-500	" type={buttonType} onClick={() => setVisible(true)} icon={buttonIcon}>
                {buttonLabel}
            </Button>
            <Modal
                title={title}
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                centered
                {...modalProps}
            >
                {children}
            </Modal>
        </>
    )
}