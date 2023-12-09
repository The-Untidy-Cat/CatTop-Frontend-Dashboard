const PRODUCT_VARIANT_STATE = {
    draft: "Bản nháp",
    out_of_stock: "Hết hàng",
    archive: "Lưu trữ",
    published: "Đang bán",
}

const PRODUCT_STATE = {
    draft: "Bản nháp",
    out_of_stock: "Hết hàng",
    archive: "Lưu trữ",
    published: "Đang bán",
}

const CUSTOMER_GENDER = {
    0: "Nam",
    1: "Nữ", 
}

const CUSTOMER_STATE = {
    draft: "Bản nháp",
    inactive: "Không hoạt động",
    active: "Đang hoạt động",
    banned: "Đã cấm",
}

const ORDER_STATE = {
    draft: "Bản nháp",
    pending: "Đang xử lý",
    confirm: "Đã xác nhận",
    delivering: "Đang giao hàng",
}

const PAYMENT_STATE = {
    unpaid: "Chưa thanh toán",
    partially_paid: "Thanh toán một phần",
    paid: "Đã thanh toán",
}

const PAYMENT_METHOD = {
    cash: "Tiền mặt",
    banking: "Chuyển khoản",
}

export {PRODUCT_VARIANT_STATE, PRODUCT_STATE, CUSTOMER_GENDER, CUSTOMER_STATE, ORDER_STATE, PAYMENT_STATE, PAYMENT_METHOD}