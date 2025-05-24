import axios from "../axios";

const getAllCode = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

export {getAllCode};
