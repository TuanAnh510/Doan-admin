import requests from "./httpService";

const CustomPageService = {
  // global setting all function
  addCustomPage: async (body) => {
    return requests.get("/custom/add", body);
  },

  getCustomPage: async () => {
    return requests.get("/custom/show");
  },

  updateCustomPage: async (body) => {
    return requests.put(`/custom/update`, body);
  },
};

export default CustomPageService;
