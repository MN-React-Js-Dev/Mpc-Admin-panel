import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@mui/material/TablePagination';
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import { getAllOrderListStart } from '../Redux/Actions/ordersActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const TrackerOrders = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searched, setSearched] = useState("");
  const classes = useStyles();
    useEffect(() => {
        dispatch(getAllOrderListStart());
      }, []);

    const dispatch = useDispatch();
    const orderListData = useSelector((state) => state?.orders?.orderList?.ordersDetails?.orders);
    const [data , setData] = useState(orderListData)
    // console.log('ORDER-LIST-DATA~~~~~~>>>', orderListData)

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

  return (
    <>
      <div class="container-xxl flex-grow-1 container-p-y">
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
                    <span class="fw-semibold d-block mb-1">Action Required</span>
                    {/* <h3 class="card-title mb-2">$12,628</h3> */}
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
                    <span class="fw-semibold d-block mb-1">Action Requested</span>
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
                    <span class="d-block mb-1">RTO</span>
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
                <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Order Number</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Tracking Id</TableCell>
              </TableRow>
            </TableHead>
             <TableBody>
              {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((orderList) => {
                return (
                <TableRow >
                  <TableCell component="th" scope="row">{orderList.order_number}</TableCell>
                  {orderList?.line_items?.map((items) => (
                    <TableCell align="left"  
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding:'8%',
                    }}>{items.name}</TableCell>
                  ))}
                  <TableCell align="left">{orderList.line_items[0]?.properties?.map((items) => {
                    if(items?.name === 'key'){
                      return (

                        <TableCell class='bg-label-success'>{items?.value}</TableCell>
                      )
                    }
                  })}
                  </TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
                )
})}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={orderListData && orderListData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
                  {/* <table class="table">
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
                          <b>Tracking Id</b>
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
                                   </td><td>
                                  </td>
                                 
                                </tr>
                              </>
                            );
                          })
                        : null}
                    </tbody>
                  </table> */}
                </div>
              </div>
        </div>
        </div>
    </>
  )
}
