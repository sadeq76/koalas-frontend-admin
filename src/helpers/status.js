export const statusTitle = (status) => {
  return status === "done"
    ? "انجام شده"
    : status === "sent"
    ? "ارسال شده"
    : status === "InProgress"
    ? "در حال آماده سازی"
    : "لغو شده";
};
export const statusColor = (status) => {
  return status === "done"
    ? "success"
    : status === "sent"
    ? "info"
    : status === "InProgress"
    ? "warning"
    : "error";
};
