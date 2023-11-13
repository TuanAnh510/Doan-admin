import requests from "./httpService";

const CategoryBlogServices = {
    getAllCategoryBlog: async () => {
        return requests.get("/blog-category/all");
    },

    getCategoryBlogById: async (id) => {
        return requests.get(`/blog-category/${id}`);
    },
    addCategoryBlog: async (body) => {
        return requests.post('/blog-category/add', body);
    },
    updateCategoryBlog: async (id, body) => {
        return requests.put(`/blog-category/${id}`, body);
    },
    deleteCategoryBlog: async (id) => {
        return requests.delete(`/blog-category/${id}`);
    },

};

export default CategoryBlogServices;
