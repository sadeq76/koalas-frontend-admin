import { useStore } from "../../store";
export default {
  fetchData({ headers, url, params, method = "GET", body }) {
    const snackbar = useStore();
    this.addHeaders(headers || {});
    this.addParams(params || {});

    var requestOptions = {
      method: method,
      body: body,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      headers: this.headers,
    };
    let path = url + (this.params.length ? `?${this.params}` : "");

    return fetch(this.baseURL + path, requestOptions).then((response) => {
      if (response.ok) {
        snackbar.toggleSnackbar({
          message: "Successful",
          status: "success",
          timeout: 3000,
        });
        return response
          .text()
          .then((result) => (result ? JSON.parse(result) : ""));
      } else {
        if (response.status < 500 || response.status >= 400) {
          snackbar.toggleSnackbar({
            message: "client error ...",
            status: "error",
            timeout: 3000,
          });
        }
        if (response.status >= 500) {
          snackbar.toggleSnackbar({
            message: "server error ...",
            status: "error",
            timeout: 3000,
          });
        }
        throw new Error(`${response.status} : ${response.statusText}`);
      }
    });
  },

  addHeaders({ headers }) {
    this.headers = new Headers();
    // headers.append("Accept", "application/json");
    // headers.append("Content-Type", "application/json");
    if (localStorage.getItem("token")) {
      this.headers.append(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
    }
    for (const header in headers) {
      this.headers.append(header, headers[header]);
    }
  },

  addParams({ params }) {
    this.params = new URLSearchParams("");
    for (const param in params) {
      this.params.append(param, params[param]);
    }
  },
};
