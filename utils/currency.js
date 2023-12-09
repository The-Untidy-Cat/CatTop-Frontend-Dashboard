function formatCurrency(value) {
  return String(
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(value)
      .replace("₫", "")
      .trim()
  );
}

export { formatCurrency };
