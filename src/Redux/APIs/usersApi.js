import axios from "axios";

const token = JSON.parse(localStorage.getItem("MPCADMIN"));

const headersParam = {
    "Authorization" : `Bearer ${token?.token}`,
};

let params = (new URL(document.location)).searchParams;
let name = params.get("token");

export const loginUsersApi = async (users) => await axios.post(`http://localhost:7000/api/user/login`, users);

export const forgotPasswordApi = async (data) => await axios.post(`http://localhost:7000/api/user/forgot_password`, data);

export const resetPasswordApi = async (data) => await axios.post(`http://localhost:7000/api/user/reset_password/${name}`, data, data);

export const ChangePasswordApi = async (data) => await axios.patch(`http://localhost:7000/api/user/change-password`, data, { headers: headersParam });

export const loadUsersApi = async () => await axios.get(`http://localhost:7000/api/user/getall`, { headers: headersParam });

export const registerUserApi = async (user) => await axios.post(`http://localhost:7000/api/user/Create`, user, { headers: headersParam});

export const updateUserApi = async (user) => await axios.patch(`http://localhost:7000/api/user/${user.id}`, user, { headers : headersParam });

export const deleteUserApi = async (user) => await axios.delete(`http://localhost:7000/api/user/${user}`, { headers : headersParam });

export const getUserBYRoleApi = async (role) => await axios.get(`http://localhost:7000/api/user/?title=${role}`, { headers: headersParam });

