import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { Link } from "react-router-dom";
import SearchBar from "material-ui-search-bar";
import { visuallyHidden } from "@mui/utils";
import Box from "@mui/material/Box";
import TableSortLabel from "@mui/material/TableSortLabel";
import { deleteOrderStart } from "../Redux/Actions/ordersActions";
import {
  deleteUserStart,
  getAllUsersStart,
  getUserByRoleStart,
} from "../Redux/Actions/usersActions";
import Checkbox from "@mui/material/Checkbox";
import { CircularProgress } from "@mui/material";
import admin from "../assets/img/icons/unicons/admin.png";
import supervisor from "../assets/img/icons/unicons/supervisor.png";
import agent from "../assets/img/icons/unicons/agent.png";
import designer from "../assets/img/icons/unicons/designer.png";
import packager from "../assets/img/icons/unicons/package.png";
import tracker from "../assets/img/icons/unicons/location.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Users = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("ID");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [filterData, setFilterData] = useState();
  const [searched, setSearched] = useState("");
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state?.users?.isLoading);
  const deleteSuccess = useSelector((state) => state?.users?.users?.message);
  const usersData = useSelector((state) => state?.users?.users?.data?.rows);
  const roleData = useSelector((state) => state?.users?.usersRole?.userSearch);
  const classes = useStyles();
  const [manageData, setManageData] = useState(usersData);

  if (deleteSuccess == "user deleted successfully") {
    setTimeout(() => {
      window.location.reload();
    },1000)
  }

  useEffect(() => {
    if (!filterData) {
      dispatch(getAllUsersStart());
    } else {
      dispatch(getUserByRoleStart(filterData));
    }
  }, [filterData]);

  useEffect(() => {
    if (roleData) {
      setManageData(roleData);
    } else {
      setManageData(usersData);
    }
  }, [roleData, usersData]);

  const handleDelete = (userList) => {
    dispatch(deleteUserStart(userList?.id));
  };

  const requestSearch = (searchedVal) => {
    const filteredRows = usersData.filter((row) => {
      return row.userName?.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setManageData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const headCells = [
    {
      id: "ID",
      numeric: false,
      disablePadding: false,
      label: "ID",
    },
    {
      id: "UserName",
      numeric: true,
      disablePadding: false,
      label: "UserName",
    },
    {
      id: "Email Address",
      numeric: true,
      disablePadding: false,
      label: "Email Address",
    },
    {
      id: "Role",
      numeric: true,
      disablePadding: false,
      label: "Role",
    },
    {
      id: "Contact Number",
      numeric: true,
      disablePadding: false,
      label: "Contact Number",
    },
    {
      id: "",
      numeric: false,
      disablePadding: false,
      label: "Action",
    },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    const toggledOrder = isAsc ? 'desc' : 'asc';
    setOrder(toggledOrder);
    setOrderBy(property);
    
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = manageData?.map((n) => n.name);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - manageData?.length) : 0;

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
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  return (
    <>
      <div class="container-xxl flex-grow-1 container-p-y">
        <div>
          <div class="row">
            <div class="col-lg-2 col-md-12 col-6 mb-4">
              <div
                class="card cst-hover"
                onClick={() => setFilterData("Admin")}
              >
                <div class="card-body">
                  <div class="card-title d-flex align-items-start justify-content-between">
                    <div class="avatar flex-shrink-0">
                      <img src={admin} alt="Admin" class="rounded" />
                    </div>
                  </div>
                  <span class="fw-semibold d-block mb-1">Admin</span>
                  {/* <h3 class="card-title mb-2">$12,628</h3> */}
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-12 col-6 mb-4">
              <div
                class="card cst-hover"
                onClick={() => setFilterData("Supervisor")}
              >
                <div class="card-body">
                  <div class="card-title d-flex align-items-start justify-content-between">
                    <div class="avatar flex-shrink-0">
                      <img src={supervisor} alt="Credit Card" class="rounded" />
                    </div>
                  </div>
                  <span class="fw-semibold d-block mb-1">Supervisors</span>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-12 col-6 mb-4">
              <div
                class="card cst-hover"
                onClick={() => setFilterData("Agent")}
              >
                <div class="card-body">
                  <div class="card-title d-flex align-items-start justify-content-between">
                    <div class="avatar flex-shrink-0">
                      <img src={agent} alt="Credit Card" class="rounded" />
                    </div>
                  </div>
                  <span class="d-block mb-1">Agents</span>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-12 col-6 mb-4">
              <div
                class="card cst-hover"
                onClick={() => setFilterData("Designer")}
              >
                <div class="card-body">
                  <div class="card-title d-flex align-items-start justify-content-between">
                    <div class="avatar flex-shrink-0">
                      <img src={designer} alt="Credit Card" class="rounded" />
                    </div>
                  </div>
                  <span class="fw-semibold d-block mb-1">Designers</span>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-12 col-6 mb-4">
              <div
                class="card cst-hover"
                onClick={() => setFilterData("Packager")}
              >
                <div class="card-body">
                  <div class="card-title d-flex align-items-start justify-content-between">
                    <div class="avatar flex-shrink-0">
                      <img src={packager} alt="Credit Card" class="rounded" />
                    </div>
                  </div>
                  <span class="fw-semibold d-block mb-1">Packagers</span>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-12 col-6 mb-4">
              <div
                class="card cst-hover"
                onClick={() => setFilterData("Tracker")}
              >
                <div class="card-body">
                  <div class="card-title d-flex align-items-start justify-content-between">
                    <div class="avatar flex-shrink-0">
                      <img src={tracker} alt="Credit Card" class="rounded" />
                    </div>
                  </div>
                  <span class="fw-semibold d-block mb-1">Trackers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h4 class="fw-bold py-3 mb-4">All User</h4>
        <div class="card mb-4">
          <div class="card-header d-flex justify-content-between align-items-center">
            <button
              type="button"
              class="btn btn-info m-1"
              onClick={() => window.location.reload()}
            >
              ↻ See all
            </button>
            <div class="d-flex justify-content-between">
              <Link to={`/register-user/`}>
                <button type="button" class="btn btn-primary m-1">
                  + CREATE NEW USER
                </button>
              </Link>
            </div>
          </div>

          <TableContainer
            style={{
              display: isLoading ? "flex" : null,
              justifyContent: isLoading ? "center" : null,
              alignItems: isLoading ? "center" : null,
              flexDirection: isLoading ? "column" : null,
              padding: isLoading ? "5px" : null,
            }}
          >
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <SearchBar
                  value={searched}
                  onChange={(searchVal) => requestSearch(searchVal)}
                  onCancelSearch={() => cancelSearch()}
                  style={{ alignSelf: "flex-start", margin: "2%", width: 250 }}
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
                    rowCount={manageData?.length}
                  />
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox"></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {stableSort(manageData, getComparator(order, orderBy))
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      ?.map((userList, index) => {
                        const isItemSelected = isSelected(userList.id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        let cssClass;

                        if (userList?.role === "Admin") {
                          cssClass = "bg-label-success";
                        } else if (userList?.role === "Supervisor") {
                          cssClass = "bg-label-info";
                        } else if (userList?.role === "Agent") {
                          cssClass = "bg-label-primary";
                        } else if (userList?.role === "Designer") {
                          cssClass = "bg-label-warning";
                        } else if (userList?.role === "Packager") {
                          cssClass = "bg-label-danger";
                        } else if (userList?.role === "Tracker") {
                          cssClass = "bg-label-dark";
                        } else {
                          cssClass = "bg-label-secondary";
                        }

                        return (
                          <TableRow
                            hover
                            onClick={(event) =>
                              handleClick(event, userList?.name)
                            }
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={userList.name}
                            selected={isItemSelected}
                          >
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              align="left"
                            >
                              {userList.id}
                            </TableCell>
                            <TableCell align="left">
                              {userList.userName}
                            </TableCell>
                            <TableCell align="left">{userList.email}</TableCell>
                            <TableCell align="left" class={`badge ${cssClass}`}>
                              {userList.role}
                            </TableCell>
                            <TableCell align="left">{userList.phone}</TableCell>
                            <TableCell align="left">
                              <td>
                                <Link to={`/update-user/${userList.id}`}>
                                  <a class="dropdown-item">
                                    <i class="bx bx-edit-alt me-1"></i> Edit
                                  </a>
                                </Link>
                              </td>
                              <td>
                                <a
                                  class="dropdown-item"
                                  onClick={() => handleDelete(userList)}
                                >
                                  <i class="bx bx-trash me-1"></i> Delete
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

          {!isLoading ? (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={manageData?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Users;
