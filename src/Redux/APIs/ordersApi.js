import axios from "axios";

const token = JSON.parse(localStorage.getItem("MPCADMIN"));

const headersParam = {
    "Authorization" : `Bearer ${token?.token}`,
};

export const loadOrdersApi = async () => await axios.get(`http://localhost:7000/api/order/`, { headers: headersParam });

export const createOrdersApi = async (order) => await axios.post(`http://localhost:7000/api/order/Create`, order, { headers: headersParam });

export const updateOrderApi = async (order) => await axios.put(`http://localhost:7000/api/order/${order.get('id')}`, order, { headers : headersParam });

export const deleteOrderApi = async (order) => await axios.delete(`http://localhost:7000/api/order/${order}`, { headers : headersParam });

export const updateOrderStausApi = async (order) => await axios.patch(`http://localhost:7000/api/order/updateStatus`, order, { headers : headersParam });