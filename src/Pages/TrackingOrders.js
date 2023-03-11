import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import { visuallyHidden } from "@mui/utils";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {
  getAllOrderListStart,
  getAllTrackersOrdersStart,
  onPageChangeStart,
} from "../Redux/Actions/ordersActions";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { BorderBottom, ChevronLeft } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const TrackerOrders = () => {
  const dispatch = useDispatch();
  const [searched, setSearched] = useState("");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [filter, setFilter] = useState('');

  const headCells = [
    {
      id: "Order Number",
      numeric: true,
      disablePadding: false,
      label: "Order Number",
    },
    {
      id: "Name",
      numeric: false,
      disablePadding: false,
      label: "Name",
    },
    {
      id: "Status",
      numeric: false,
      disablePadding: true,
      label: "Status",
    },
    {
      id: "Tracking Id",
      numeric: true,
      disablePadding: true,
      label: "Tracking Id",
    },
  ];

  useEffect(() => {
    dispatch(getAllTrackersOrdersStart());
  }, []);

  const orderListData = useSelector((state) => state?.orders?.trackerOrders);
  const [data, setData] = useState([orderListData.data]);

  useEffect(() => {
    setData(orderListData);
  }, [orderListData]);

//  {filter && data?.data?.filter((item) => {
//   console.log("ITEM~~>>>",item)
//    if(item.status == filter) {
//      console.log("DATAA>DATA~~~>>>", item)
//      return item
//     };
//   })}

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

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const handleClick = (event, name) => {
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
    dispatch(onPageChangeStart(newPage))
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
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
      <TableHead>
        <TableRow>
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
    );
  }


  const requestSearch = (searchedVal) => {
  
    // const filteredRows = data?.data?.filter((row) => {
    //   return row.products?.map((item) => {
    //     item.name?.toLowerCase().includes(searchedVal.toLowerCase());
    //   });
    // });
    // setData(filteredRows);
    // const filteredRows = data?.filter(({data}) => {
    //  const res = data.map((item) => {
    //     item.name?.toLowerCase().includes(searchedVal.toLowerCase());
    //   })
    //   console.log("ERSULT ~~~>>>",res)
    // })
    
  };


  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

 

  return (
    <>
      <div class="container-xxl flex-grow-1 container-p-y">
        {/* <div class="row">
          <div class="col-lg-3 col-md-12 col-6 mb-4">
            <div class="card" onClick={() => setFilter("NEW")}>
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
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-12 col-6 mb-4">
            <div class="card" onClick={() => setFilter("Action Requested")}>
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
            <div class="card" onClick={() => setFilter("RTO")}>
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
            <div class="card" onClick={() => setFilter("DELIVERED")}>
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
        </div> */}
        <h4 class="fw-bold py-3 mb-4">All Order</h4>
        <div class="card mb-4">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Orders List</h5>
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
                        {
                          (stableSort(
                            data?.data,
                            getComparator(order, orderBy)
                          )?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          ),
                          data?.data?.map((orderList, index) => {
                            const checked = isSelected(
                              orderList?.channel_order_id
                            );
                            const labelId = `enhanced-table-checkbox-${index}`;
                            let cssClass;

                            if (orderList?.status === "NEW") {
                              cssClass = "bg-label-success";
                            } else if (orderList?.status === "DELIVERED") {
                              cssClass = "bg-label-danger";
                            }else {
                              cssClass = "bg-label-warning";
                            }

                            return (
                              <TableRow
                                hover
                                onClick={(event) =>
                                  handleClick(
                                    event,
                                    orderList?.channel_order_id
                                  )
                                }
                                role="checkbox"
                                aria-checked={checked}
                                tabIndex={-1}
                                key={orderList.id}
                                selected={checked}
                              >
                                <TableCell
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                  align="left"
                                >
                                  {orderList.channel_order_id}
                                </TableCell>
                                <TableCell>
                                  {orderList?.products?.map((item) => {
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
                                <TableCell
                                  align="left"
                                  class={`badge ${cssClass}`}
                                >
                                  <td>{orderList?.status}</td>
                                </TableCell>
                                <TableCell align="left">
                                {orderList?.shipments?.map((item) => {
                                    return (
                                      <td
                                        align="left"
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                        }}
                                      > 
                                      <Link to={`https://shiprocket.co//tracking/${item.awb}`}>
                                          <button
                                            type="button"
                                            class="btn btn-primary m-1"
                                            disabled={
                                              item.awb === '' ? true: false
                                            }
                                          > 
                                           {item?.awb ? item.awb : "n/a"}
                                          </button>
                                        </Link>

                                      {/* <Link to={`https://shiprocket.co//tracking/${item.awb}`}>
                                        {item?.awb ? item.awb : "N/A"} 
                                      </Link> */}
                                      </td>
                                    );
                                  })}
                                </TableCell>
                              </TableRow>
                            );
                          }))
                        }
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
                rowsPerPageOptions={[15]}
                component="div"
                count={data?.meta?.pagination?.total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
