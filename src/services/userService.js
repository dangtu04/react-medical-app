import axios from "../axios";

const userLogin = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-users?id=${inputId}`);
};

const createNewUser = (data) => {
  return axios.post("/api/create-user", data);
};

const deleteUser = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUser = (data) => {
  return axios.put("/api/edit-user", data);
};

const getTopDoctor = (limit) => {
  return axios.get(`/api/get-top-doctor?limit=${limit}`);
};

const getAllDoctors = () => {
  return axios.get("/api/get-all-doctor");
};

const createDoctorDetail = (data) => {
  return axios.post("/api/save-doctor-info", data);
};

const getDoctorDetail = (id) => {
  return axios.get(`/api/get-doctor-detail?id=${id}`);
};

const getMarkdownByDoctorId = (doctorId) => {
  return axios.get(`/api/get-markdown-by-doctorid?doctorId=${doctorId}`);
};

const saveBulkDoctorSchedule = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};
export {
  userLogin,
  getAllUsers,
  createNewUser,
  deleteUser,
  editUser,
  getTopDoctor,
  getAllDoctors,
  createDoctorDetail,
  getDoctorDetail,
  getMarkdownByDoctorId,
  saveBulkDoctorSchedule,
};
