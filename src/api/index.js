import axios from "axios";

const api = (method, url, data) => {
  let token = localStorage.getItem("token");
  let config = {
    auth: token,
  };
  return axios({
    method: method,
    url: `${process.env.ROOT_URL}${url}`,
    headers: config,
    data: data,
  })
    .then((res) => {
      if (res.statusCode == 401) {
        window.location = "/login";
      } else {
        return res;
      }
    })
    .catch((err) => {
      throw err;
    });
};

const uploadApi = (method, url, data) => {
  let token = localStorage.getItem("token");
  let config = {
    auth: token,
    "Content-Type": "multipart/form-data",
  };
  return axios({
    method: method,
    url: `${getConfig().ROOT_URL}${url}`,
    headers: config,
    data: data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

const apiWithoutToken = (method, url, data) => {
  console.log({
    method: method,
    url: `${getConfig().ROOT_URL}${url}`,
    data: data,
  });
  return axios({
    method: method,
    url: `${getConfig().ROOT_URL}${url}`,
    data: data,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

export const login = (data) => {
  return apiWithoutToken("post", constants.API.LOGIN, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const signUp = (data) => {
  return api("post", constants.API.SIGNUP, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const uploadFiles = (data) => {
  return uploadApi("post", constants.API.UPLOAD_FILES, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};