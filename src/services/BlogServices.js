import requests from "./httpService";

const BlogServices = {
  getAllBlog: async () => {
    return requests.get("/blog/all");
  },
  getBlogById: async (id) => {
    return requests.get(`/blog/${id}`);
  },
  addBlog: async (body) => {
    return requests.post("/blog/add", body);
  },
  updateBlog: async (id, body) => {
    return requests.put(`/blog/${id}`, body);
  },
  updateStatus: async (id, body) => {
    return requests.put(`/blog/status/${id}`, body);
  },
  deleteBlog: async (id) => {
    return requests.delete(`/blog/${id}`);
  },
  deleteBlogComment: async (idBlog, idComment) => {
    return requests.delete(
      `/blog/delete-comment?idcomment=${idComment}&idblog=${idBlog}`
    );
  },
};

export default BlogServices;
