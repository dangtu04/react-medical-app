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

export { createSpecialty, getSpecialty, getSpecialtyDetail };
