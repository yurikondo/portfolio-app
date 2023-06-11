import axiosClient from "./axiosClient";

const postApi = {
  create: (params) => axiosClient.post("post", params),
  getAll: () => axiosClient.get("post"),
  getProfilePosts: () => axiosClient.get("post/profile"),
  getLikedPosts: () => axiosClient.get("post/favorite"),
  getFollowingUsersPosts: (userId) => axiosClient.get(`post/${userId}/posts`),
  getOne: (id) => axiosClient.get(`post/${id}`),
  update: (id, params) => axiosClient.put(`post/${id}`, params),
  like: (id, params) => axiosClient.put(`post/${id}/like`, params),
  delete: (id) => axiosClient.delete(`post/${id}`),
};

export default postApi;
