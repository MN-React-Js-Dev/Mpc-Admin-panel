import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllOrdersStart } from "../Redux/Actions/ordersActions";

const Orders = () => {

    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(getAllOrdersStart())
    },[])

    const ordersData = useSelector((state) => state?.orders?.orders?.ordersData?.rows)
    console.log("SELECTOR DATA ORDER~~~>>>>", ordersData)

  return (
    <>
      <div class="container-xxl flex-grow-1 container-p-y">
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
                      <b>ID</b>
                    </th>
                    <th>
                      <b>Order</b>
                    </th>
                    <th>
                        <b>Design Image</b>
                    </th>
                    <th>
                      <b>Contact Number</b>
                    </th>
                    <th>
                      <b>Address</b>
                    </th>
                    {/* <th>Address</th> */}
                    {/* <th>Gender</th> */}
                    
                  </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                  {ordersData? ordersData.map((userList) => {
                        return (
                          <>
                            <tr class="table-light">
                              <td>
                                <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>{" "}
                                <strong>{userList?.id}</strong>
                              </td>
                              <td>{userList?.orderName}</td>
                              <td>
                                <img src={`${userList?.image}`} height="50%" width="50%" />
                              </td>
                              <td>{userList?.phone}</td>
                              <td>{userList?.address},{userList.pincode}</td>
                              <td>
                                <Link to={`/form/${userList.id}`}>
                                  <a class="dropdown-item">
                                    <i class="bx bx-edit-alt me-1"></i> Edit
                                  </a>
                                </Link>
                              </td>
                              <td>
                                <a
                                  class="dropdown-item"
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
