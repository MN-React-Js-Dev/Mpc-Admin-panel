import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteOrderStart,
  getAllOrderListStart,
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
import TablePagination from "@mui/material/TablePagination";
import SearchBar from "material-ui-search-bar";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { AppBar, Tab, Tabs, Typography } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import readyToPrint from "../assets/img/icons/unicons/printing-machine.png"
import inProduction from "../assets/img/icons/unicons/printing.png"
import shipped from "../assets/img/icons/unicons/shipped.png"
import delivered from "../assets/img/icons/unicons/delivered.png"

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
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [checked, setChecked] = useState([]);
  const [searched, setSearched] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [status, setStatus] = useState();
  const [filter, SetFilter] = useState("");
  let itemIds = [];

  const deleteSuccess = useSelector((state) => state?.orders?.orders?.message)
  const orderListData = useSelector((state) => state?.orders?.orderList?.ordersDetails?.orders);
  const filterordersData = useSelector((state) => state?.orders?.orders?.statusFilter);
  const [data, setData] = useState(filterordersData);
  const [datas, setDatas] = useState(orderListData);
  const isLoader = useSelector((state) => state?.orders?.isLoading);
  

  if(deleteSuccess == 'order deleted successfully') {
    setTimeout(() => {
      window.location.reload()
    },1000)
  }

  useEffect(() => {
    dispatch(getFilterOrdersStart(filter));
  }, [filter]);

  useEffect(() => {
    dispatch(getAllOrderListStart());
  }, []);

  useEffect(() => {
    setData(filterordersData);
  }, [filterordersData]);

  const handleClick = ({id}) => {
    dispatch(deleteOrderStart(id))
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

  if (status) {
    itemIds = checked.map(Number);
    dispatch(updateOrderStatusStart({ itemIds, status }));
    window.location.reload();
  }

  const headerCells = [
    {
      id: "Order Number",
      numeric: false,
      disablePadding: true,
      label: "Order Number",
      align: "right"
    },
    {
      id: "Name",
      numeric: true,
      disablePadding: false,
      label: "Name",
    },
    {
      id: "Status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
    {
      id: "Key",
      numeric: true,
      disablePadding: false,
      label: "Key",
    },
    {
      id: "Contact Number",
      numeric: true,
      disablePadding: false,
      label: "Contact Number",
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) { 
      const newSelected = data?.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
  }

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const headCells = [
    {
      id: "Order Number",
      numeric: false,
      disablePadding: false,
      label: "Order Number",
    },
    {
      id: "Name",
      numeric: true,
      disablePadding: false,
      label: "Name",
    },
    {
      id: "Status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
    {
      id: "Contact Numbers",
      numeric: true,
      disablePadding: false,
      label: "Contact Number",
    },
    {
      id: "Orders Created by",
      numeric: true,
      disablePadding: false,
      label: "Orders Created by",
    },
    {
      id: "",
      numeric: true,
      disablePadding: false,
      label: "Action",
    },
  ];

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const handleClicked = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const requestSearch = (searchedVal) => {};

  const searchData = (searchedVal) => {
    const searching =
      filterordersData &&
      filterordersData?.filter((data) => {
        return data?.orderName
          ?.toLowerCase()
          .includes(searchedVal.toLowerCase());
      });
    setData(searching);
  };

  const searchDataOrderList = (searchedVal) => {
    console.log("searchedVal!!!>>>>>",searchedVal)
    // orderListData?.filter(({line_items}) => {
    //   console.log("LINE ITEMS~~>>", line_items)
    //   line_items?.map((data) => {
    //       return data?.name
    //       ?.toLowerCase()
    //       .includes(searchedVal.toLowerCase());
    //   })
    //   console.log("SERVH~~>>", searching)
    //   setDatas(searching)
    // })
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
    searchData(searched);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.length) : 0;

  function EnhancedTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
            </TableCell>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "left" : "left"}
                padding={headCell.disablePadding ? "none" : "normal"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </>
    );
  }

  const handleSelectAllClicked = (event) => {
    if (event.target.checked) {
      const newSelected = orderListData?.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const emptyRowss =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderListData?.length) : 0;

  function EnhancedTableHeader(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <>
        <TableHead>
          <TableRow>
            {headerCells.map((headerCell) => (
              <TableCell
                key={headerCell.id}
                align={headerCell.numeric ? "left" : "left"}
                padding={headerCell.disablePadding ? "none" : "normal"}
                sortDirection={orderBy === headerCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headerCell.id}
                  direction={orderBy === headerCell.id ? order : "asc"}
                  onClick={createSortHandler(headerCell.id)}
                >
                  {headerCell.label}
                  {orderBy === headerCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      </>
    );
  }

  return (
    <>
      <div class="container-xxl flex-grow-1 container-p-y">
        {value === 0 && (
          <div>
            <div class="row">
              <div class="col-lg-3 col-md-12 col-6 mb-4">
                <div class="card cst-hover" onClick={() => SetFilter("ReadytoPrint")}>
                  <div class="card-body">
                    <div class="card-title d-flex align-items-start justify-content-between">
                      <div class="avatar flex-shrink-0">
                        <img
                          src={readyToPrint}
                          alt="chart success"
                          class="rounded"
                        />
                      </div>
                    </div>
                    <span class="fw-semibold d-block mb-1">Ready to Print</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-12 col-6 mb-4">
                <div class="card cst-hover" onClick={() => SetFilter("InProduction")}>
                  <div class="card-body">
                    <div class="card-title d-flex align-items-start justify-content-between">
                      <div class="avatar flex-shrink-0">
                        <img
                          src={inProduction}
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
                <div class="card cst-hover" onClick={() => SetFilter("Shiped")}>
                  <div class="card-body">
                    <div class="card-title d-flex align-items-start justify-content-between">
                      <div class="avatar flex-shrink-0">
                        <img
                          src={shipped}
                          alt="Credit Card"
                          class="rounded"
                        />
                      </div>
                    </div>
                    <span class="fw-semibold d-block mb-1">Shipped</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-12 col-6 mb-4">
                <div class="card cst-hover" onClick={() => SetFilter("Deliverd")}>
                  <div class="card-body">
                    <div class="card-title d-flex align-items-start justify-content-between">
                      <div class="avatar flex-shrink-0">
                        <img
                          src={delivered}
                          alt="Credit Card"
                          class="rounded"
                        />
                      </div>
                    </div>
                    <span class="fw-semibold d-block mb-1">Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
                  ↻ See All
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
                      + CREATE NEW ORDER
                    </button>
                  </Link>
                </div>
              </div>
              <div class="card-body">
                <div class="table-responsive text-nowrap">
                  <TableContainer
                    style={{
                      display: isLoader ? "flex" : null,
                      justifyContent: isLoader ?"center" : null,
                      alignItems: isLoader ? "center": null,
                      flexDirection: isLoader ? "column" : null,
                      padding: isLoader ? '5px' : null,
                    }}
                  >
                    {isLoader === true ? (
                      <CircularProgress />
                    ) : (
                      <>
                        <SearchBar
                          value={searched}
                          onChange={(searchVal) => searchData(searchVal)}
                          onCancelSearch={() => cancelSearch()}
                          style={{ alignSelf: "flex-start", margin: "2%" , width: 250}}
                        />
                        <Table
                          sx={{ minWidth: 750 }}
                          aria-labelledby="tableTitle"
                          size={dense ? "small" : "medium"}
                        >
                          <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data?.length}
                          />
                          {/* <TableHead>
                            <TableRow> </TableRow>
                          </TableHead> */}
                          <TableBody>
                            {stableSort(data, getComparator(order, orderBy))
                              ?.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              ?.map((orderList, index) => {
                                const checked = isSelected(orderList?.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                let cssClass;

                                if (orderList?.status === "Deliverd") {
                                  cssClass = "bg-label-success";
                                } else if (orderList?.status === "Shiped") {
                                  cssClass = "bg-label-primary";
                                } else if (
                                  orderList?.status === "InProduction"
                                ) {
                                  cssClass = "bg-label-warning";
                                } else if (
                                  orderList?.status === "ReadytoPrint"
                                ) {
                                  cssClass = "bg-label-danger";
                                } else {
                                  cssClass = "bg-label-secondary";
                                }

                                return (
                                  <TableRow
                                    hover
                                    onClick={(event) =>
                                      handleClicked(event, orderList?.id)
                                    }
                                    role="checkbox"
                                    aria-checked={checked}
                                    tabIndex={-1}
                                    key={orderList.id}
                                    selected={checked}
                                  >
                                    <TableCell padding="checkbox">
                                      <Checkbox
                                        color="primary"
                                        onChange={handleCheck}
                                        value={orderList?.id}
                                        align='right'
                                        inputProps={{
                                          "aria-labelledby": labelId,
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell
                                      component="th"
                                      id={labelId}
                                      scope="row"
                                      align="center"
                                    >
                                      {orderList.id}
                                    </TableCell>
                                    <TableCell align="left">
                                      {orderList.orderName}
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      class={`badge ${cssClass}`}
                                    >
                                      {orderList.status ? orderList.status : "NA"}
                                    </TableCell>
                                    <TableCell align="left">
                                      {orderList.phone}
                                    </TableCell>
                                    <TableCell align="left">
                                      {orderList.orderAssign ? orderList.orderAssign : "NA"}
                                    </TableCell>
                                    <TableCell align="left">
                                      <td>
                                        <Link to={`/form/${orderList.id}`}>
                                          <a class="dropdown-item">
                                            <i class="bx bx-edit-alt me-1"></i>
                                            Edit
                                          </a>
                                        </Link>
                                      </td>
                                      <td>
                                        <a
                                          class="dropdown-item"
                                          onClick={() => handleClick(orderList)}>
                                          <i class="bx bx-trash me-1"></i>
                                          Delete
                                        </a>
                                      </td>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            {emptyRows > 0 && (
                              <TableRow
                                style={{
                                  height: (dense ? 33 : 53) * emptyRows,
                                }}
                              >
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </>
                    )}
                  </TableContainer>
                  {
                    !isLoader ? (
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={data?.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    ) : null
                  }
                  
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
                  <TableContainer
                    style={{
                      isplay: isLoader ? "flex" : null,
                      justifyContent: isLoader ?"center" : null,
                      alignItems: isLoader ? "center": null,
                      flexDirection: isLoader ? "column" : null,
                      padding: isLoader ? '5px' : null,
                    }}
                  >
                    {!orderListData ? (
                      <CircularProgress />
                    ) : (
                      <>
                        <Table
                          sx={{ minWidth: 750 ,marginTop:20}}
                          aria-labelledby="tableTitle"
                          size={dense ? "small" : "medium"}
                        >
                          <EnhancedTableHeader
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClicked}
                            onRequestSort={handleRequestSort}
                            rowCount={orderListData?.length}
                          />
                          <TableHead>
                            <TableRow></TableRow>
                          </TableHead>
                          <TableBody>
                            {stableSort(orderListData, getComparator(order, orderBy))
                              ?.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              ?.map((orderList, index) => {
                                const checked = isSelected(orderList?.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                  <TableRow
                                    hover
                                    onClick={(event) =>
                                      handleClicked(
                                        event,
                                        orderList?.order_number
                                      )
                                    }
                                    role="checkbox"
                                    aria-checked={checked}
                                    tabIndex={-1}
                                    key={orderList.order_number}
                                    selected={checked}
                                  >
                                    <TableCell
                                      component="th"
                                      id={labelId}
                                      scope="row"
                                      align="left"
                                    >
                                      {orderList?.order_number}
                                    </TableCell>
                                    <TableCell>
                                      {orderList?.line_items?.map((item) => {
                                        return (
                                          <td
                                            align="left"
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                            }}
                                          >
                                            {item?.name}
                                          </td>
                                        );
                                      })}
                                    </TableCell>
                                    <TableCell>
                                      {orderList?.line_items[0]?.properties.map(
                                        (items) => {
                                          if(items?.name === 'status') {
                                               return (
                                              <td class="bg-label-warning">
                                                {items.value}
                                              </td>
                                            );
                                          }
                                        } 
                                      )}
                                    </TableCell>
                                    <TableCell align="left">
                                      {orderList?.line_items[0]?.properties.map(
                                        (items) => {
                                          if (items?.name === "key") {
                                            return (
                                              <td class="bg-label-success">
                                                {items.value}
                                              </td>
                                            );
                                          }
                                        }
                                      )}
                                    </TableCell>
                                    <TableCell align="left">
                                      {orderList.phone ? orderList.phone : 'NA'}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            {emptyRowss > 0 && (
                              <TableRow
                                style={{
                                  height: (dense ? 33 : 53) * emptyRowss,
                                }}
                              >
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </>
                    )}
                  </TableContainer>
                  {
                    !isLoader ? (
                      <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={orderListData?.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    ) : null
                  }
                 
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
