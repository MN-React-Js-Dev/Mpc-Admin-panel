import axios from "axios";

const token = JSON.parse(localStorage.getItem("MPCADMIN"));
const tracker = localStorage.getItem("TRACKER")

const headersParam = {
    "Authorization" : `Bearer ${token?.token}`,
};
const headersParam1 = {
    "Authorization" : `Bearer ${tracker}`,
}; 

export const loadOrdersApi = async () => await axios.get(`${process.env.REACT_APP_KEY}/order/`, { headers: headersParam });

export const createOrdersApi = async (order) => await axios.post(`${process.env.REACT_APP_KEY}/order/Create`, order, { headers: headersParam });

export const updateOrderApi = async (order) => await axios.put(`${process.env.REACT_APP_KEY}/order/${order.get('id')}`, order, { headers : headersParam });

export const deleteOrderApi = async (order) => await axios.delete(`${process.env.REACT_APP_KEY}/order/${order}`, { headers : headersParam });

export const updateOrderStausApi = async (order) => await axios.put(`${process.env.REACT_APP_KEY}/order/updateStatus`, order, { headers : headersParam });

export const loadOrderListApi = async () => await axios.get(`${process.env.REACT_APP_KEY}/order/orderDetails/`, { headers: headersParam });

export const loadFilterOrdersApi = async (data) => await axios.get(`${process.env.REACT_APP_KEY}/order/?status=${data}`, { headers: headersParam });

export const loadSingleOrdersApi = async (data) => await axios.get(`${process.env.REACT_APP_KEY}/order/singleOrder/${data}`);


// export const loadAllTrackersOrderApi = async () => await axios.get(`${process.env.REACT_APP_KEY}/logictic/logistics`, { headers: headersParam });
export const loadAllTrackersOrderApi = async () => await axios.get(`${process.env.REACT_APP_KEY}/logictic/logistics`, { headers: headersParam });

export const pageChangeApi = async (pageNumber) => await axios.get(`https://apiv2.shiprocket.in/v1/external/orders?page=${pageNumber}`, { headers: headersParam1 });