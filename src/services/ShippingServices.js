import requests from "./httpService";

const ShippingServices = {
  getAllShipping: async () => {
    return requests.get("/shipping/all");
  },
  updateShipping: async (id, body) => {
    return requests.put(`/shipping/${id}`, body);
  },
  addShipping: async (body) => {
    return requests.post(`/shipping/add`, body);
  },
  getShippingById: async (id) => {
    return requests.get(`/shipping/${id}`);
  },
  deleteShipping: async (id) => {
    return requests.delete(`/shipping/${id}`);
  },
};

export default ShippingServices;
