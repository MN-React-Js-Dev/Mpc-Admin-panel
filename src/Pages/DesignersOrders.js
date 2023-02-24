import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { getAllOrderListStart } from "../Redux/Actions/ordersActions";
import { makeStyles } from "@material-ui/core/styles";
import { visuallyHidden } from "@mui/utils";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import SearchBar from "material-ui-search-bar";
import Barcode from "react-barcode";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export const DesignersOrders = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    dispatch(getAllOrderListStart());
  }, []);

  const classes = useStyles();
  const dispatch = useDispatch();
  const orderListData = useSelector(
    (state) => state?.orders?.orderList?.ordersDetails?.orders
  );
  const [data, setData] = useState(orderListData);

  useEffect(() => {
    setData(orderListData);
  }, [orderListData]);

  const headCells = [
    {
      id: "Order Number",
      numeric: false,
      disablePadding: false,
      label: "Order Number",
    },
    {
      id: "Image",
      numeric: true,
      disablePadding: false,
      label: "Image",
    },
    {
      id: "Status",
      numeric: true,
      disablePadding: false,
      label: "Status",
    },
    {
      id: "Barcode",
      numeric: true,
      disablePadding: false,
      label: "Barcode",
    },
    {
      id: "Submit",
      numeric: true,
      disablePadding: false,
      label: "Submit",
    },
  ];

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
    const filteredRows = orderListData.filter((row) => {
      return row.line_items?.map((item) => {
        item.name?.toLowerCase().includes(searchedVal.toLowerCase());
      });
    });
    console.log("SEARCH~~~~>>", filteredRows);
    setData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

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
                            const checked = isSelected(orderList?.order_number);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                              <TableRow
                                hover
                                onClick={(event) =>
                                  handleClick(event, orderList?.id)
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
                                  {orderList.order_number}
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
                                      if (items?.name === "status") {
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
                                <TableCell align="left">{`submit`}</TableCell>
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
        </div>
      </div>
    </>
  );
};
