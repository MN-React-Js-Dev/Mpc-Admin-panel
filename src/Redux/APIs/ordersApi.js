import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("MPCADMIN"));
const tracker = sessionStorage.getItem("TRACKER")

const headersParam = {
    "Authorization" : `Bearer ${token?.token}`,
};
const headersParam1 = {
    "Authorization" : `Bearer ${tracker}`,
}; 

export const loadOrdersApi = async () => await axios.get(`https://api-v1.niceishfabrics.com/api/order/`, { headers: headersParam });

export const createOrdersApi = async (order) => await axios.post(`https://api-v1.niceishfabrics.com/api/order/Create`, order, { headers: headersParam });

export const updateOrderApi = async (order) => await axios.put(`https://api-v1.niceishfabrics.com/api/order/${order.get('id')}`, order, { headers : headersParam });

export const deleteOrderApi = async (order) => await axios.delete(`https://api-v1.niceishfabrics.com/api/order/${order}`, { headers : headersParam });

export const updateOrderStausApi = async (order) => await axios.put(`https://api-v1.niceishfabrics.com/api/order/updateStatus`, order, { headers : headersParam });

export const loadOrderListApi = async () => await axios.get(`https://api-v1.niceishfabrics.com/api/order/orderDetails/`, { headers: headersParam });

export const loadFilterOrdersApi = async (data) => await axios.get(`https://api-v1.niceishfabrics.com/api/order/?status=${data}`, { headers: headersParam });

export const loadSingleOrdersApi = async (data) => await axios.get(`https://api-v1.niceishfabrics.com/api/order/singleOrder/${data}`);

export const loadAllTrackersOrderApi = async () => await axios.get(`https://api-v1.niceishfabrics.com/api/logictic/logistics`, { headers: headersParam });

export const pageChangeApi = async (pageNumber) => await axios.get(`https://apiv2.shiprocket.in/v1/external/orders?page=${pageNumber}`, { headers: headersParam1 });

