import requests from "./httpService";

const CouponServices = {
  addCoupon: async (body) => {
    return requests.post("/coupon/add", body);
  },
  addAllCoupon: async (body) => {
    return requests.post("/coupon/add/all", body);
  },
  getAllCoupons: async (queryParams) => {
    return requests.get(`/coupon?${queryParams.toString()}`);
  },
  getCouponById: async (id) => {
    return requests.get(`/coupon/${id}`);
  },
  getCouponByRegister: async (register) => {
    // New method for getting coupons by register
    return requests.get(`/coupon/register/${register}`);
  },
  updateCoupon: async (id, body) => {
    return requests.put(`/coupon/${id}`, body);
  },
  updateManyCoupons: async (body) => {
    return requests.patch("/coupon/update/many", body);
  },
  updateStatus: async (id, body) => {
    return requests.put(`/coupon/status/${id}`, body);
  },
  deleteCoupon: async (id) => {
    return requests.delete(`/coupon/${id}`);
  },
  deleteManyCoupons: async (body) => {
    return requests.patch(`/coupon/delete/many`, body);
  },
};

export default CouponServices;
