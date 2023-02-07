import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("MPC_ADMIN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`,
};

export const loginUsersApi = async (users) => await axios.post(`http://localhost:7000/api/user/login`, users);
export const loadUsersApi = async () => await axios.get(`http://localhost:7000/api/user/`, { headers: headersParam });
