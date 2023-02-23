import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteOrderStart,
  getAllOrderListStart,
  getAllOrdersStart,
  getFilterOrdersStart,
  updateOrderStatusStart,
} from "../Redux/Actions/ordersActions";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@mui/material/TablePagination';
import SearchBar from "material-ui-search-bar";
import Paper from "@material-ui/core/Paper";
import Checkbox from '@mui/material/Checkbox';
import { AppBar, Box, Tab, Tabs, TextField, Typography } from "@material-ui/core";



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Orders = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searched, setSearched] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [status, setStatus] = useState();
  const [filter, SetFilter] = useState("");
  let itemIds = [];
    const dataArr = [];

  useEffect(() => {
    dispatch(getFilterOrdersStart(filter));
  }, [filter]);

  useEffect(() => {
    dispatch(getAllOrderListStart());
  }, []);

  const orderListData = useSelector(
    (state) => state?.orders?.orderList?.ordersDetails?.orders
  );
  const [rows, setRows] = useState(orderListData);
 
  const filterordersData = useSelector(
    (state) => state?.orders?.orders?.ordersData?.rows
  );
const [data , setData] = useState(filterordersData)

  const handleClick = (id) => {
    dispatch(deleteOrderStart(id));
  };

  const handleCheck = (e) => {
    var checked_arr = [...checked];
    if (e.target.checked) {
      checked_arr = [...checked, e.target.value];
    } else {
      checked_arr.splice(checked.indexOf(e.target.value), 1);
    }
    setChecked(checked_arr);
  };

  if (status) {
    itemIds = checked.map(Number);
    dispatch(updateOrderStatusStart({ itemIds, status }));
    window.location.reload();
  }

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const requestSearch = (searchedVal) => {
    setRows(searchData);
  };


  const searchData = (searchedVal) => {
    const searching = filterordersData && filterordersData?.filter((data) => {
      // console.log('DATA~~~~>>', data.orderName);
      return data?.orderName?.toLowerCase().includes(searchedVal.toLowerCase())
    })
    console.log('SERACHING~~~~', searching) 
    setData(searching)
    // setRows(searching)  
  }

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
    searchData(searched)
  };



  return (
    <>
      <div class="container-xxl flex-grow-1 container-p-y">
        {
          value === 0 && (
            <div>
            <div class="row">
              <div class="col-lg-3 col-md-12 col-6 mb-4">
                <div class="card" onClick={() => SetFilter("confirm-Orders")}>
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
                    {/* <h3 class="card-title mb-2">$12,628</h3> */}
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-12 col-6 mb-4">
                <div class="card" onClick={() => SetFilter("In-Production")}>
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
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-12 col-6 mb-4">
                <div class="card" onClick={() => SetFilter("Shiped")}>
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
                          class="rounded"
                        />
                      </div>
                    </div>
                    <span class="fw-semibold d-block mb-1">Deliverd</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
          )
        }
        
        <h4 class="fw-bold py-3 mb-4">All Order</h4>
        <div class="card mb-4">
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="Manual Orders" {...a11yProps(0)} />
                <Tab label="Web Orders" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <div class="card-header d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  class="btn btn-info m-1"
                  onClick={() => window.location.reload()}
                >
                  ↻ Refresh
                </button>
                <div class="d-flex justify-content-between">
                  {checked.length >= 1 && (
                    <div class="input-group input-group-merge m-1">
                      <select
                        id="exampleFormControlSelect1"
                        name="role"
                        aria-lbel="Default select example"
                        className={`form-control`}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option selected disabled>
                          Update Status
                        </option>
                        <option value="ReadytoPrint">Ready to Print</option>
                        <option value="InProduction">In Production</option>
                        <option value="Shiped">Shiped</option>
                        <option value="Deliverd">Deliverd</option>
                      </select>
                    </div>
                  )}

                  <Link to={`/form`}>
                    <button type="button" class="btn btn-primary m-1">
                      + NEW
                    </button>
                  </Link>
                </div>
              </div>
              
              <div class="card-body">
                <div class="table-responsive text-nowrap">
                <SearchBar
          value={searched}
          onChange={(searchVal) => searchData(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="left"></TableCell>
                <TableCell align="left">Order Number</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Contact</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
             <TableBody>
              {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((orderList) => {
                let cssClass;
                if (orderList?.status === "Deliverd") {
                  cssClass = "bg-label-success";
                } else if (orderList?.status === "Shiped") {
                  cssClass = "bg-label-primary";
                } else if (orderList?.status === "InProduction") {
                  cssClass = "bg-label-warning";
                } else if (orderList?.status === "ReadytoPrint") {
                  cssClass = "bg-label-danger";
                } else {
                  cssClass = "bg-label-secondary";
                }
                return (
                <TableRow >
                    <Checkbox  onChange={handleCheck}
                                value={orderList?.id} 
                                />
                  <TableCell component="th" scope="row">{orderList.id}</TableCell>
                  <TableCell align="left">{orderList.orderName}</TableCell>
                  <TableCell align="left">{orderList?.status}</TableCell>
                  <TableCell align="left">{orderList?.phone}</TableCell>
                  <TableCell align="left">
                  <Link to={`/form/${orderList.id}`}>
                                      <a class="dropdown-item">
                                        <i class="bx bx-edit-alt me-1"></i> Edit
                                      </a>
                  </Link>
                  </TableCell>
                  <TableCell align="left">
                  <a
                                      class="dropdown-item"
                                      onClick={() => handleClick(orderList.id)}
                                    >
                                      <i class="bx bx-trash me-1"></i> Delete
                                    </a>
                  </TableCell>
                </TableRow>
                )
})}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filterordersData && filterordersData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
                  {/* <table class="table">
                    <thead>
                      <tr>
                        <th></th>
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
                      {filterordersData
                        ? filterordersData?.map((orderList) => {
                            let cssClass;

                            if (orderList?.status === "Deliverd") {
                              cssClass = "bg-label-success";
                            } else if (orderList?.status === "Shiped") {
                              cssClass = "bg-label-primary";
                            } else if (orderList?.status === "InProduction") {
                              cssClass = "bg-label-warning";
                            } else if (orderList?.status === "ReadytoPrint") {
                              cssClass = "bg-label-danger";
                            } else {
                              cssClass = "bg-label-secondary";
                            }

                            return (
                              <>
                                <tr class="table-light">
                                  <td>
                                    <input
                                      type="checkbox"
                                      onChange={handleCheck}
                                      value={orderList?.id}
                                    />
                                  </td>
                                  <td>
                                    <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>{" "}
                                    <strong>{orderList?.id}</strong>
                                  </td>
                                  <td>{orderList?.orderName}</td>
                                  <td>
                                    <span class={`badge ${cssClass} me-1`}>
                                      {orderList?.status}
                                    </span>
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
                  </table> */}
                </div>
              </div>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Orders List</h5>
                <div class="d-flex justify-content-between"></div>
              </div>

              <div class="card-body">
                <div class="table-responsive text-nowrap">
                  {/* <table class="table">
                    <>
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
                            <b>Key</b>
                          </th>
                          <th>
                            <b>Tracing Id</b>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="table-border-bottom-0">
                        {orderListData
                          ? orderListData.map((orderList) => {
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
                                          if (items?.name === "status") {
                                            return (
                                                <td class='bg-label-warning'>{items.value}</td>
                                            );
                                          }
                                        }
                                      )}
                                   </td>
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
                                    <td>{orderList?.phone}</td>
                                  </tr>
                                </>
                              );
                            })
                          : null}
                      </tbody>
                    </>
                  </table> */}
<Paper>
<SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
<TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Order Number</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Key</TableCell>
                <TableCell align="left">Tracing Id</TableCell>
              </TableRow>
            </TableHead>
             <TableBody>
              {orderListData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row) => {
                return (

                <TableRow >
                  <TableCell component="th" scope="row">{row.order_number}</TableCell>
                  {row?.line_items?.map((items) => (
                    <TableCell align="left"  
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}>{items.name}</TableCell>
                  ))}
                  <TableCell align="left">{row.line_items[0]?.properties.map((items) => {
                    if(items?.name === 'status'){
                      return (
                        <TableCell class='bg-label-warning'>{items?.value}</TableCell>
                      )
                    }
                  })}
                  </TableCell>
                  <TableCell align="left">{row.line_items[0]?.properties?.map((items) => {
                    if(items?.name === 'key'){
                      return (

                        <TableCell class='bg-label-success'>{items?.value}</TableCell>
                      )
                    }
                  })}
                  </TableCell>
                  <TableCell align="left">{row?.phone}</TableCell>
                </TableRow>
                )
})}
            </TableBody>
          </Table>
        </TableContainer>
</Paper>
        <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={orderListData && orderListData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
                </div>
              </div>
            </TabPanel>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Orders;
