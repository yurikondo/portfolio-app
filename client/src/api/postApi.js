import axiosClient from "./axiosClient";

const postApi = {
  create: (params) => axiosClient.post("post", params),
  getAll: () => axiosClient.get("post"),
  getOne: (id) => axiosClient.get(`post/${id}`),
  update: (id, params) => axiosClient.put(`post/${id}`, params),
  delete: (id) => axiosClient.delete(`post/${id}`),
};

export default postApi;
