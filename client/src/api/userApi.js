import axiosClient from "./axiosClient";

const userApi = {
  getLatestUser: () => axiosClient.get("user/getLatestUser"),
  updateIcon: (params) => axiosClient.put("user/updateIcon", params),
  updateBgImg: (params) => axiosClient.put("user/updateBgImg", params),
  follow: (id, params) => axiosClient.put(`user/${id}/follow`, params),
  unfollow: (id, params) => axiosClient.put(`user/${id}/unfollow`, params),
};

export default userApi;
