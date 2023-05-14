import axiosClient from "./axiosClient";

const userApi = {
  updateIcon: (params) => axiosClient.put("user/updateIcon", params),
  updateBgImg: (params) => axiosClient.put("user/updateBgImg", params),
};

export default userApi;
