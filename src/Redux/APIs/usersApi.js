import axios from "axios";

const token = JSON.parse(localStorage.getItem("MPCADMIN"));
// console.log("token~~~FROM user API~~???", token)

const headersParam = {
    "Authorization" : `Bearer ${token?.token}`,
};


let params = (new URL(document.location)).searchParams;
let name = params.get("token");

export const loginUsersApi = async (users) => await axios.post(`http://api-v1.niceishfabrics.com/api/login`, users);

export const forgotPasswordApi = async (data) => await axios.post(`http://api-v1.niceishfabrics.com/api/forgot_password`, data);

export const resetPasswordApi = async (data) => await axios.post(`http://api-v1.niceishfabrics.com/api/reset_password/${name}`, data, data);

export const ChangePasswordApi = async (data) => await axios.patch(`http://api-v1.niceishfabrics.com/api/change-password`, data, { headers: headersParam });

export const loadUsersApi = async () => await axios.get(`http://api-v1.niceishfabrics.com/api/getall`, { headers: headersParam });

export const registerUserApi = async (user) => await axios.post(`http://api-v1.niceishfabrics.com/api/Create`,user, { headers: headersParam });

export const updateUserApi = async (user) => await axios.patch(`http://api-v1.niceishfabrics.com/api/${user.id}`, user, { headers : headersParam });

export const deleteUserApi = async (user) => await axios.delete(`http://api-v1.niceishfabrics.com/api/${user}`, { headers : headersParam });

export const getUserBYRoleApi = async (role) => await axios.get(`http://api-v1.niceishfabrics.com/api/?title=${role}`, { headers: headersParam });

