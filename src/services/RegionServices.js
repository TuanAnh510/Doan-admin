import requests from "./httpService";

const RegionServices = {
  getAllRegion: async () => {
    return requests.get("/region/all");
  },
  updateRegion: async (id, body) => {
    return requests.put(`/region/${id}`, body);
  },
  addRegion: async (body) => {
    return requests.post(`/region/add`, body);
  },
  getShippingById: async (id) => {
    return requests.get(`/region/${id}`);
  },
  deleteRegion: async (id) => {
    return requests.delete(`/region/${id}`);
  },
};

export default RegionServices;
