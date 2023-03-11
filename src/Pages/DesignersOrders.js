import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Barcode from "react-barcode";
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
import { visuallyHidden } from "@mui/utils";
import { AppBar, Checkbox, Tab, Tabs, Typography } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import { saveAs } from "file-saver";

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

export const DesignersOrders = () => {
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

  useEffect(() => {
    dispatch(getFilterOrdersStart(filter));
  }, [filter]);

  useEffect(() => {
    dispatch(getAllOrderListStart());
  }, []);

  const orderListData = useSelector(
    (state) => state?.orders?.orderList?.ordersDetails?.orders
  );
  const [datas, setDatas] = useState(orderListData);
  // console.log("FILTER~~>>", datas);

  useEffect(() => {
    setDatas(orderListData);
  }, [orderListData]);

  const filterordersData = useSelector(
    (state) => state?.orders?.orders?.statusFilter
  );
  const [data, setData] = useState(filterordersData);
  // console.log("DATA~>>", data)

  useEffect(() => {
    setData(filterordersData);
  }, [filterordersData]);

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

  if (status) {
    itemIds = checked.map(Number);
    dispatch(updateOrderStatusStart({ itemIds, status }));
    window.location.reload();
  }

  const headerCells = [
    {
      id: "Order Number",
      numeric: true,
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
      id: "Key",
      numeric: true,
      disablePadding: false,
      label: "Key",
    },
    {
      id: "Barcode",
      numeric: true,
      disablePadding: false,
      label: "Barcode",
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
      id: "Image",
      numeric: true,
      disablePadding: false,
      label: "Image",
    },
    {
      id: "Barcode",
      numeric: true,
      disablePadding: false,
      label: "Barcode",
    },
    {
      id: "Status",
      numeric: true,
      disablePadding: false,
      label: "Status",
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
              <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
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
      const newSelected = datas?.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const emptyRowss =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas?.length) : 0;

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

  const handleDownload = async (imagePath) => {
    const a = document.createElement("a");
    a.href = await toDataURL(imagePath);
    a.download = "myImage.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  function toDataURL(url) {
    return fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  }

  return (
    <>
      <div class="container-xxl flex-grow-1 container-p-y">
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
                        <option value="InProduction">In Production</option>
                        <option value="Shiped">Shiped</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <div class="card-body">
                <div class="table-responsive text-nowrap">
                  <TableContainer
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    {!data ? (
                      <CircularProgress />
                    ) : (
                      <>
                        <SearchBar
                          value={searched}
                          onChange={(searchVal) => requestSearch(searchVal)}
                          onCancelSearch={() => cancelSearch()}
                          style={{ alignSelf: "flex-start", margin: "2%" }}
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
                          <TableHead>
                            <TableRow></TableRow>
                          </TableHead>
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

                                if (orderList?.status === "InProduction") {
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
                                          inputProps={{
                                            "aria-labelledby": labelId,
                                          }}
                                        />
                                      </TableCell>
                                      <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        align="left"
                                      >
                                        {orderList?.id}
                                      </TableCell>
                                      <TableCell>
                                        {orderList?.orderName}
                                      </TableCell>
                                      <TableCell>
                                        <img
                                          src={orderList?.image}
                                          alt={"IMAGE"}
                                          height={"20%"}
                                          width={"20%"}
                                        />
                                      </TableCell>
                                      <TableCell align="left">
                                        <Barcode
                                          value={`${orderList?.id}`}
                                          width={1}
                                          height={25}
                                          displayValue={false}
                                          format={"CODE128"}
                                          background={"#ffffff"}
                                          lineColor={"#000000"}
                                          margin={0}
                                        />
                                      </TableCell>
                                      <TableCell class={`badge ${cssClass}`}>
                                        {orderList?.status}
                                      </TableCell>
                                      <TableCell align="left">
                                        <Link to={``}>
                                          <button
                                            href={orderList?.image}
                                            onClick={() =>
                                              handleDownload(orderList?.image)
                                            }
                                            type="button"
                                            class="btn btn-primary m-1"
                                            disabled={
                                              orderList.image === null
                                                ? true
                                                : false
                                            }
                                          >
                                            ⇩
                                          </button>
                                        </Link>
                                      </TableCell>
                                    </TableRow>
                                  );
                                }

                                // return (
                                //   <TableRow
                                //     hover
                                //     onClick={(event) =>
                                //       handleClicked(event, orderList?.id)
                                //     }
                                //     role="checkbox"
                                //     aria-checked={checked}
                                //     tabIndex={-1}
                                //     key={orderList.id}
                                //     selected={checked}
                                //   >
                                //     <TableCell padding="checkbox">
                                //       <Checkbox
                                //         color="primary"
                                //         onChange={handleCheck}
                                //         value={orderList?.id}
                                //         inputProps={{
                                //           "aria-labelledby": labelId,
                                //         }}
                                //       />
                                //     </TableCell>
                                //     <TableCell
                                //       component="th"
                                //       id={labelId}
                                //       scope="row"
                                //       align="left"
                                //     >
                                //       {orderList?.id}
                                //     </TableCell>
                                //     <TableCell>
                                //       {orderList?.orderName}
                                //     </TableCell>
                                //     <TableCell>
                                //       <img
                                //         src={orderList?.image}
                                //         alt={"IMAGE"}
                                //         height={"20%"}
                                //         width={"20%"}
                                //       />
                                //     </TableCell>
                                //     <TableCell align="left">
                                //       <Barcode
                                //         value={`${orderList?.id}`}
                                //         width={1}
                                //         height={25}
                                //         displayValue={false}
                                //         format={"CODE128"}
                                //         background={"#ffffff"}
                                //         lineColor={"#000000"}
                                //         margin={0}
                                //       />
                                //     </TableCell>
                                //     <TableCell class={`badge ${cssClass}`}>
                                //       {orderList?.status}
                                //     </TableCell>
                                //     <TableCell align="left">
                                //       <Link to={``}>
                                //         <button
                                //           href={orderList?.image}
                                //           onClick={() => handleDownload(orderList?.image)}
                                //           type="button"
                                //           class="btn btn-primary m-1"
                                //           disabled={
                                //             orderList.image === null
                                //               ? true
                                //               : false
                                //           }

                                //         >
                                //           ⇩
                                //         </button>
                                //       </Link>

                                //     </TableCell>
                                //   </TableRow>
                                // );
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
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
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
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    {!datas ? (
                      <CircularProgress />
                    ) : (
                      <>
                        <SearchBar
                          value={searched}
                          onChange={(searchVal) =>
                            searchDataOrderList(searchVal)
                          }
                          onCancelSearch={() => cancelSearch()}
                          style={{ alignSelf: "flex-start", margin: "2%" }}
                        />
                        <Table
                          sx={{ minWidth: 750 }}
                          aria-labelledby="tableTitle"
                          size={dense ? "small" : "medium"}
                        >
                          <EnhancedTableHeader
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClicked}
                            onRequestSort={handleRequestSort}
                            rowCount={datas?.length}
                          />
                          <TableHead>
                            <TableRow></TableRow>
                          </TableHead>
                          <TableBody>
                            {stableSort(datas, getComparator(order, orderBy))
                              ?.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              ?.map((orderList, index) => {
                                const checked = isSelected(orderList?.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                  <TableRow>
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
                                        return <td>{item?.name}</td>;
                                      })}
                                    </TableCell>
                                    <TableCell>
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
                                      <Barcode
                                        value={`${orderList?.order_number}`}
                                        width={1}
                                        height={25}
                                        displayValue={false}
                                        format={"CODE128"}
                                        background={"#ffffff"}
                                        lineColor={"#000000"}
                                        margin={0}
                                      />
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
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={datas?.length}
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
