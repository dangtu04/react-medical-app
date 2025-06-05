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

export { createClinic, getClinic, getClinicDetail};
