import axiosClient from "./axiosClient";

const userApi = {
  updateIcon: (params) => axiosClient.put("user/updateIcon", params),
};

export default userApi;
