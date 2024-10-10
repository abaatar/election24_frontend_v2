import requests from "./httpService";

const PinkServices = {
  addPink: async (body) => {
    return requests.post("/pink/add", body);
  },
  addAllPink: async (body) => {
    return requests.post("/pink/add/all", body);
  },
  getAllPinks: async (queryParams) => {
    return requests.get(`/pink?${queryParams.toString()}`);
  },
  getPinkById: async (id) => {
    return requests.get(`/pink/${id}`);
  },
  getPinkByRegister: async (register) => {
    // New method for getting pinks by register
    return requests.get(`/pink/register/${register}`);
  },
  updatePink: async (id, body) => {
    return requests.put(`/pink/${id}`, body);
  },
  updateManyPinks: async (body) => {
    return requests.patch("/pink/update/many", body);
  },
  updateStatus: async (id, body) => {
    return requests.put(`/pink/status/${id}`, body);
  },
  deletePink: async (id) => {
    return requests.delete(`/pink/${id}`);
  },
  deleteManyPinks: async (body) => {
    return requests.patch(`/pink/delete/many`, body);
  },
};

export default PinkServices;
