import React, { useEffect  } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrderStart, getAllOrderListStart, getAllOrdersStart } from '../Redux/Actions/ordersActions';
import Barcode from 'react-barcode';

export const DesignersOrders = () => {

    useEffect(() => {
        dispatch(getAllOrderListStart());
      }, []);

    const dispatch = useDispatch();
    const orderListData = useSelector((state) => state?.orders?.orderList?.ordersDetails?.orders);

  return (
    <>
      <div class="container-xxl flex-grow-1 container-p-y">
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
                          <b>Image</b>
                        </th>
                        <th>
                            <b>Status</b>
                        </th>
                        <th>
                          <b>barcode</b>
                        </th>
                        <th>
                          <b>Submit</b>
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
                                        <Barcode value={`${orderList?.order_number}`} 
                                            width={1}
                                            height={25}
                                            displayValue={false}
                                            format={'CODE128'}
                                            background= {"#ffffff"}
                                            lineColor= {"#000000"}
                                            margin={0}
                                           
                                        />
                                    </>
                                  </td>
                                  <td>{`submit`}</td>
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
  )
}
