import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrderListStart } from '../Redux/Actions/ordersActions';

export const TrackersOrders = () => {

    
    useEffect(() => {
        dispatch(getAllOrderListStart());
    }, []);
    
    const [filter, SetFilter] = useState("");
    const dispatch = useDispatch();
    const orderListData = useSelector((state) => state?.orders?.orderList?.ordersDetails?.orders);

  return (
    <div class="container-xxl flex-grow-1 container-p-y">
          <div>
            <div class="row">
              <div class="col-lg-3 col-md-12 col-6 mb-4">
                <div class="card" onClick={() => SetFilter("Action-Required")}>
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
                    <span class="fw-semibold d-block mb-1">Action Required</span>
                    {/* <h3 class="card-title mb-2">$12,628</h3> */}
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-12 col-6 mb-4">
                <div class="card" onClick={() => SetFilter("Action-Requested")}>
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
                    <span class="fw-semibold d-block mb-1">Action Requested</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-12 col-6 mb-4">
                <div class="card" onClick={() => SetFilter("RTO")}>
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
                    <span class="fw-semibold d-block mb-1">RTO</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-12 col-6 mb-4">
                <div class="card" onClick={() => SetFilter("Deliverd")}>
                  <div class="card-body">
                    <div class="card-title d-flex align-items-start justify-content-between">
                      <div class="avatar flex-shrink-0">
                        <img
                          src="../assets/img/icons/unicons/cc-primary.png"
                          alt="Credit Card"
                          class="rounded "

                        />
                      </div>
                    </div>
                    <span class="fw-semibold d-block mb-1">Deliverd</span>
                    </div>
                </div>
              </div>
            </div>
          </div>

        <h4 class="fw-bold py-3 mb-4">All Order</h4>

        <div class="card mb-4">
             <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Orders List</h5>
               
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
                          <b>Name</b>
                        </th>
                        <th>
                            <b>Status</b>
                        </th>
                        <th>
                          <b>Tracing ID</b>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                      {orderListData
                        ? orderListData?.map((orderList) => {
                            return (
                              <>
                                <tr class="table-light">
                                  <td>
                                    <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>{" "}
                                    <strong>{orderList?.order_number}</strong>
                                  </td>
                                  {orderList?.line_items?.map((data) => {
                                      return (
                                        <td
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                          }}
                                        >
                                          {data?.name}
                                        </td>
                                      );
                                    })}
                                  <td>
                                      {orderList?.line_items[0]?.properties.map(
                                        (items) => {
                                          if (items?.name === "key") {
                                            return (
                                                <td class='bg-label-success'>{items.value}</td>
                                            );
                                          }
                                        }
                                      )}
                                   </td>
                                  <td>
                                    <>
                                        {/* <Barcode value={`${orderList?.order_number}`} 
                                            width={1}
                                            height={25}
                                            displayValue={false}
                                            format={'CODE128'}
                                            background= {"#ffffff"}
                                            lineColor= {"#000000"}
                                            margin={0}
                                           
                                        /> */}
                                    </>
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
  )
}
