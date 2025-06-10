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

const getDoctorSchedule = (doctorId, date) => {
  return axios.get(
    `/api/get-doctor-schedule?doctorId=${doctorId}&date=${date}`
  );
};

const getDoctorInforExtra = (doctorId) => {
  return axios.get(`/api/get-doctor-infor-extra?doctorId=${doctorId}`);
};

const getProfileDoctor = (doctorId) => {
  return axios.get(`/api/get-profile-doctor?doctorId=${doctorId}`);
};

const postBookingAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};

const postVerifyBookingAppointment = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};

const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const postSendRemedy = (data) => {
  return axios.post("/api/send-remedy", data);
};

const getAppointmentHistory = (patientId) => {
  return axios.get(
    `/api/get-appointment-history?patientId=${patientId}`
  );
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
  getDoctorSchedule,
  getDoctorInforExtra,
  getProfileDoctor,
  postBookingAppointment,
  postVerifyBookingAppointment,
  getAllPatientForDoctor,
  postSendRemedy,
  getAppointmentHistory
};
