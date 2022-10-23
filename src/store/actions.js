export default {
  toggleSnackbar({
    message = "something went wrong ...",
    status = "error",
    timeout = 3000,
  }) {
    this.snackbar = !this.snackbar;
    this.snackbarMessage = message;
    this.snackbarStatus = status;
    this.snackbarTimeout = timeout;
  },
};
