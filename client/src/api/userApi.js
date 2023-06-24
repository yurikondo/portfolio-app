import axiosClient from "./axiosClient";

const userApi = {
  getOne: (userId) => axiosClient.get(`user/getOne/${userId}`),
  getLatestUsers: () => axiosClient.get("user/getLatestUsers"),
  getUsersByIds: (params) => axiosClient.get("user/getUsersByIds", params),
  getFollowingUsers: () => axiosClient.get("user/getFollowingUsers"),
  getFollowerUsers: () => axiosClient.get("user/getFollowerUsers"),
  getUsersByIds: (params) => axiosClient.post("user/getUsersByIds", params),
  updateIcon: (params) => axiosClient.put("user/updateIcon", params),
  updateBgImg: (params) => axiosClient.put("user/updateBgImg", params),
  follow: (id, params) => axiosClient.put(`user/${id}/follow`, params),
  unfollow: (id, params) => axiosClient.put(`user/${id}/unfollow`, params),
};

export default userApi;
