import requests from "./httpService";

const PenServices = {
  addPen: async (body) => {
    return requests.post("/pen/add", body);
  },
  addAllPen: async (body) => {
    return requests.post("/pen/add/all", body);
  },
  getAllPens: async (queryParams) => {
    return requests.get(`/pen?${queryParams.toString()}`);
  },
  getPenById: async (id) => {
    return requests.get(`/pen/${id}`);
  },
  updatePen: async (id, body) => {
    return requests.put(`/pen/${id}`, body);
  },
  updateManyPens: async (body) => {
    return requests.patch("/pen/update/many", body);
  },
  updateStatus: async (id, body) => {
    return requests.put(`/pen/status/${id}`, body);
  },
  deletePen: async (id) => {
    return requests.delete(`/pen/${id}`);
  },
  deleteManyPens: async (body) => {
    return requests.patch(`/pen/delete/many`, body);
  },
};

export default PenServices;
