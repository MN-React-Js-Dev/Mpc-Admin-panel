import axios from "axios";

const token = JSON.parse(localStorage.getItem("MPCADMIN"));

const headersParam = {
    "Authorization" : `Bearer ${token?.token}`,
};

export const loadOrdersApi = async () => await axios.get(`http://localhost:7000/api/order/`, { headers: headersParam });

export const createOrdersApi = async (order) => await axios.post(`http://localhost:7000/api/order/Create`, order, { headers: headersParam });
