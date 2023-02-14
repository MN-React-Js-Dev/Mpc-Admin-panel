import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteOrderStart,
  getAllOrdersStart,
} from "../Redux/Actions/ordersActions";


const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersStart());
  }, []);

  const ordersData = useSelector(
    (state) => state?.orders?.orders?.ordersDetails?.orders
  );
  console.log("SELECTOR DATA ORDER~~~>>>>", ordersData);

  const handleClick = (id) => {
    console.log("DELTE ID~~~>>>", id);
    dispatch(deleteOrderStart(id));
  };

 

  return (
    <>
      <div class="container-xxl flex-grow-1 container-p-y">
        <div>
          <div class="row">
            <div class="col-lg-3 col-md-12 col-6 mb-4">
              <div class="card">
                <div class="card-body">
                  <div class="card-title d-flex align-items-start justify-content-between">
                    <div class="avatar flex-shrink-0">
                      <img
                        src="../assets/img/icons/unicons/chart-success.png"
                        alt="chart success"
                        class="rounded"
                      />
                    </div>
                  </div>
                  <span class="fw-semibold d-block mb-1">Confirm Orders</span>
                  <h3 class="card-title mb-2">$12,628</h3>
                  <small class="text-success fw-semibold">
                    <i class="bx bx-up-arrow-alt"></i> +72.80%
                  </small>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-12 col-6 mb-4">
              <div class="card">
                <div class="card-body">
                  <div class="card-title d-flex align-items-start justify-content-between">
                    <div class="avatar flex-shrink-0">
                      <img
                        src="../assets/img/icons/unicons/wallet-info.png"
                        alt="Credit Card"
                        class="rounded"
                      />
                    </div>
                  </div>
                  <span class="fw-semibold d-block mb-1">In Production</span>
                  <h3 class="card-title mb-2">$4,679</h3>
                  <small class="text-success fw-semibold">
                    <i class="bx bx-up-arrow-alt"></i> +28.42%
                  </small>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-12 col-6 mb-4">
              <div class="card">
                <div class="card-body">
                  <div class="card-title d-flex align-items-start justify-content-between">
                    <div class="avatar flex-shrink-0">
                      <img
                        src="../assets/img/icons/unicons/wallet-info.png"
                        alt="Credit Card"
                        class="rounded"
                      />
                    </div>
                  </div>
                  <span class="d-block mb-1">Shiped</span>
                  <h3 class="card-title text-nowrap mb-2">$2,456</h3>
                  <small class="text-danger fw-semibold">
                    <i class="bx bx-down-arrow-alt"></i> -14.82%
                  </small>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-12 col-6 mb-4">
              <div class="card">
                <div class="card-body">
                  <div class="card-title d-flex align-items-start justify-content-between">
                    <div class="avatar flex-shrink-0">
                      <img
                        src="../assets/img/icons/unicons/cc-primary.png"
                        alt="Credit Card"
                        class="rounded"
                      />
                    </div>
                  </div>
                  <span class="fw-semibold d-block mb-1">Deliverd</span>
                  <h3 class="card-title mb-2">$14,857</h3>
                  <small class="text-success fw-semibold">
                    <i class="bx bx-up-arrow-alt"></i> +28.14%
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>


        <h4 class="fw-bold py-3 mb-4">All Order</h4>
        <div class="card mb-4">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Orders List</h5>
            <div class="d-flex justify-content-between">
              <Link to={`/form`}>
                <button type="button" class="btn btn-primary m-1">
                  + NEW
                </button>
              </Link>
            </div>
          </div>

          <div class="card-body">
            <div class="table-responsive text-nowrap">
              <table class="table">
                <thead>
                  <tr>
                    <th>
                      <b>Order Number</b>
                    </th>
                    <th>
                      <b>Title</b>
                    </th>
                    <th>
                      <b>Status</b>
                    </th>
                    <th>
                      <b>Contact Number</b>
                    </th>
                  </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                  {ordersData
                    ? ordersData.map((orderList) => {
                        return (
                          <>
                            <tr class="table-light">
                              <td>
                                <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>{" "}
                                <strong>{orderList?.order_number}</strong>
                              </td>
                              <td>{orderList?.line_items[0].name}</td>
                              <td>
                                {orderList?.financial_status}
                              </td>
                              <td>{orderList?.phone}</td>
                              <td>
                                <Link to={`/form/${orderList.id}`}>
                                  <a class="dropdown-item">
                                    <i class="bx bx-edit-alt me-1"></i> Edit
                                  </a>
                                </Link>
                              </td>
                              <td>
                                <a
                                  class="dropdown-item"
                                  onClick={() => handleClick(orderList.id)}
                                >
                                  <i class="bx bx-trash me-1"></i> Delete
                                </a>
                              </td>
                            </tr>
                          </>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
