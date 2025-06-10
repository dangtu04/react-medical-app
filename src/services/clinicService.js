import axios from "../axios";

const createClinic = (data) => {
  return axios.post("/api/create-clinic", data);
};

const getClinic = () => {
  return axios.get(`/api/get-clinic`);
};

const getClinicDetail = (data) => {
  return axios.get(`/api/get-detail-clinic?id=${data.id}`);
};

const getClinicById = (id) => {
  return axios.get(`/api/get-clinic-by-id?id=${id}`);
};

const updateClinic = (data) => {
  return axios.put(`/api/update-clinic`, data);
};

const deleteClinic = (id) => {
  return axios.delete(`/api/delete-clinic?id=${id}`);
};

export {
  createClinic,
  getClinic,
  getClinicDetail,
  getClinicById,
  updateClinic,
  deleteClinic,
};
