import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteOrderStart,
  getAllOrderListStart,
  getAllOrdersStart,
  updateOrderStatusStart,
} from "../Redux/Actions/ordersActions";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Box, Tab, Tabs, Typography } from "@material-ui/core";

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
  const [showEdit, setShowEdit] = useState(false);
  const [status, setStatus] = useState();
  let itemIds = [];

  useEffect(() => {
    dispatch(getAllOrdersStart());
  }, []);

  useEffect(() => {
    dispatch(getAllOrderListStart());
  }, []);

  const orderListData = useSelector((state) => state?.orders?.orderList?.ordersDetails?.orders);
  console.log("ORDERSLIST ADTA~~>>>",orderListData)
  const ordersData = useSelector((state) => state?.orders?.orders?.ordersData?.rows);

  const handleClick = (id) => {
    // console.log("DELTE ID~~~>>>", id);
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
                <h5 class="mb-0">Orders List</h5>
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
                  <table class="table">
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
                      {ordersData
                        ? ordersData.map((orderList) => {
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
                  </table>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Orders List</h5>
            <div class="d-flex justify-content-between">
              </div>
          </div>

          <div class="card-body">
            <div class="table-responsive text-nowrap">
                
              <table class="table">
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
                      {orderListData? orderListData.map((orderList) => {
                            return (
                              <>
                                <tr class="table-light">
                                  
                                  <td>
                                    <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>{" "}
                                    <strong>{orderList?.order_number}</strong>
                                  </td>
                                  <td>{orderList?.line_items[0]?.title}</td>
                                  <td>
                                  {
                                      orderList?.line_items[0]?.properties.map((items) => {
                                        if(items?.name === 'status') {
                                          return (

                                            items.value
                                          )
                                        }
       
                                      })
                                    }
                                  </td>
                                  <td>
                                    {
                                      orderList?.line_items[0]?.properties.map((items) => {
                                        if(items?.name === 'key') {
                                          return (

                                            items.value
                                          )
                                        }
                                        
                                         
                                      })
                                    }
                                  </td>
                                  <td>{orderList?.phone}</td>
                                </tr>
                              </>
                            );
                          })
                        : null}
                    </tbody>
                  </>
              </table>
            </div>
          </div>
            </TabPanel>
          </div>

          {/* <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Orders List</h5>
            <div class="d-flex justify-content-between">

            {
              checked.length >= 1 && (
                <div class="input-group input-group-merge m-1">
                <select
                  id="exampleFormControlSelect1"
                  name="role"
                  aria-lbel="Default select example"
                  className={`form-control`}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                > 
                  <option selected disabled>Update Status</option>
                  <option value="ReadytoPrint">Ready to Print</option>
                  <option value="InProduction">In Production</option>
                  <option value="Shiped">Shiped</option>
                  <option value="Deliverd">Deliverd</option>
                </select>
              </div>
              )
            }
                

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
                  {ordersData
                    ? ordersData.map((orderList) => {

                      let cssClass;

                              if (orderList?.status === 'Deliverd') {
                                  cssClass = 'bg-label-success'
                              } else if (orderList?.status === 'Shiped') {
                                  cssClass = 'bg-label-primary'
                              } else if (orderList?.status === 'InProduction') {
                                  cssClass = 'bg-label-warning'
                              } else if (orderList?.status === 'ReadytoPrint') {
                                cssClass = 'bg-label-danger'
                              } else {
                                  cssClass = 'bg-label-secondary'
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
                                <span class={`badge ${cssClass} me-1`}>{orderList?.status}</span>
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Orders;
