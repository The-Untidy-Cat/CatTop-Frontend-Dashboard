const PRODUCT_VARIANT_STATE = {
  draft: "Bản nháp",
  out_of_stock: "Hết hàng",
  archived: "Lưu trữ",
  published: "Đang bán",
};

const PRODUCT_STATE = {
  draft: "Bản nháp",
  out_of_stock: "Hết hàng",
  archived: "Lưu trữ",
  published: "Đang bán",
};

const BRAND_STATE = {
  draft: "Bản nháp",
  active: "Đang hoạt động",
  archived: "Lưu trữ",
};

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
  pending: "Chờ xử lý",
  confirmed: "Đã xác nhận",
  delivering: "Đang vận chuyển",
  delivered: "Đã giao",
  cancelled: "Đã hủy",
  refunded: "Đã hoàn tiền",
  failed: "Thất bại",
};

const PAYMENT_STATE = {
  paid: "Đã thanh toán",
  unpaid: "Chưa thanh toán",
  partially_paid: "Còn thiếu",
};

const PAYMENT_METHOD = {
  cash: "Tiền mặt",
  banking: "Chuyển khoản",
};

const SHOPPING_METHOD = {
  online: "Online",
  offline: "Offline",
};

const EMPLOYEE_STATE = {
  draft: "Bản nháp",
  inactive: "Không hoạt động",
  active: "Đang hoạt động",
  banned: "Đã cấm",
};

const EMPLOYEE_GENDER = {
  0: "Nam",
  1: "Nữ",
}

export {
  PRODUCT_VARIANT_STATE,
  PRODUCT_STATE,
  BRAND_STATE,
  CUSTOMER_GENDER,
  ORDER_STATE,
  PAYMENT_STATE,
  PAYMENT_METHOD,
  SHOPPING_METHOD,
  CUSTOMER_STATE,
  EMPLOYEE_GENDER,
  EMPLOYEE_STATE,
};
