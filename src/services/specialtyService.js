import axios from "../axios";

const createSpecialty = (data) => {
  return axios.post("/api/create-specialty", data);
};

const getSpecialty = () => {
  return axios.get(`/api/get-specialty`);
};

const getSpecialtyDetail = (data) => {
  return axios.get(
    `/api/get-detail-specialty?id=${data.id}&location=${data.location}`
  );
};

const getSpecialtyById = (id) => {
  return axios.get(`/api/get-specialty-by-id?id=${id}`);
};
const updateSpecialty = (data) => {
  return axios.post(`/api/update-specialty`, data);
};
const deleteSpecialty = (id) => {
  return axios.delete(`/api/delete-specialty?id=${id}`);
};

export {
  createSpecialty,
  getSpecialty,
  getSpecialtyDetail,
  getSpecialtyById,
  updateSpecialty,
  deleteSpecialty,
};
