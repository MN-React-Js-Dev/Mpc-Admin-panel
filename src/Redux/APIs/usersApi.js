import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("MPCADMIN"));
// console.log("token~~~FROM user API~~???", token)

const headersParam = {
    "Authorization" : `Bearer ${token?.token}`,
};

let params = (new URL(document.location)).searchParams;
let name = params.get("token");

export const loginUsersApi = async (users) => await axios.post(`https://api-v1.niceishfabrics.com/api/user/login`, users);

export const forgotPasswordApi = async (data) => await axios.post(`https://api-v1.niceishfabrics.com/api/user/forgot_password`, data);

export const resetPasswordApi = async (data) => await axios.post(`https://api-v1.niceishfabrics.com/api/user/reset_password/${name}`, data, data);

export const ChangePasswordApi = async (data) => await axios.patch(`https://api-v1.niceishfabrics.com/api/user/change-password`, data, { headers: headersParam });

export const loadUsersApi = async () => await axios.get(`https://api-v1.niceishfabrics.com/api/user/getall`, { headers: headersParam });

export const registerUserApi = async (user) => await axios.post(`https://api-v1.niceishfabrics.com/api/user/create`,user, { headers: headersParam });

export const updateUserApi = async (user) => await axios.patch(`https://api-v1.niceishfabrics.com/api/user/${user.id}`, user, { headers : headersParam });

export const deleteUserApi = async (user) => await axios.delete(`https://api-v1.niceishfabrics.com/api/user/${user}`, { headers : headersParam });

export const getUserBYRoleApi = async (role) => await axios.get(`https://api-v1.niceishfabrics.com/api/user/?title=${role}`, { headers: headersParam });

