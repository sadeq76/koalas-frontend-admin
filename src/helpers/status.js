export const statusTitle = (status) => {
  return status === "Sent"
    ? "ارسال شده"
    : status === "InProgress"
    ? "در حال آماده سازی"
    : "لغو شده";
};
export const statusColor = (status) => {
  return status === "Sent"
    ? "info"
    : status === "InProgress"
    ? "warning"
    : "error";
};
