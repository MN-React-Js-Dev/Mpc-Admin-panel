import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@mui/material/TablePagination';
import { Link } from 'react-router-dom';
import SearchBar from "material-ui-search-bar";
import { deleteOrderStart } from '../Redux/Actions/ordersActions';
import { getAllUsersStart, getUserByRoleStart } from '../Redux/Actions/usersActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Users = () => {

    const [filterData, setFilterData] = useState()
    const [searched, setSearched] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(getAllUsersStart())
    },[])
    const classes = useStyles();
    const usersData = useSelector((state) => state?.users?.users?.data?.rows)
    const roleData = useSelector((state) => state?.users?.usersRole?.userSearch)
    
    const [manageData, setManageData] = useState(usersData);

    useEffect (() => {
      if (roleData) {
        setManageData(roleData)
      } else {
        setManageData(usersData)
      } 
    },[roleData, usersData])
    
    const handleDelete = (userList) => {
      console.log("USERLIST~~>>", userList)
      dispatch(deleteOrderStart(userList?.id))
    }

    const onFilterValueChange = (e) => {
        let name = e.target.name;
        setFilterData({
          ...filterData,
          [name] : e.target.value
        })
      }
      {
        filterData && dispatch(getUserByRoleStart(filterData))
      }

      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };


      const requestSearch = (searchedVal) => {
        const filteredRows = usersData.filter((row) => {
          // console.log('ROWS~~~~>>', row.userName)
          return row.userName?.toLowerCase().includes(searchedVal.toLowerCase());
        });
        console.log('SEARCH~~~~>>', filteredRows)
        setManageData(filteredRows)
        // setRows(filteredRows);
      };

      const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
      };
     
  return (
    <>
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4">All User</h4>
            <div class="card mb-4">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">User List</h5>
                        <div class="d-flex justify-content-between">
                          <div class="input-group input-group-merge m-1">
                              <select
                                id="exampleFormControlSelect1"
                                name="role"
                                aria-lbel="Default select example"
                                value={filterData?.role || ""}
                                onChange={(e) => onFilterValueChange(e, "filterData")}
                                className={`form-control`}
                              >
                                <option selected>Show All</option>
                                <option value="Admin">Admin</option>
                                <option value="Supervisors">Supervisors</option>
                                <option value="Agents">Agents</option>
                                <option value="Designer">Designer</option>
                                <option value="Packagers">Packagers</option>
                                <option value="Trackers">Trackers</option>
                              </select>
                            </div>
                            <Link to={`/register-user/`}>
                              <button type="button" class="btn btn-primary m-1">+ NEW</button>
                          </Link>

                        </div>
                    </div>
                    <SearchBar
                           value={searched}
                           onChange={(searchVal) => requestSearch(searchVal)}
                           onCancelSearch={() => cancelSearch()}
                    />
                    <div class="card-body">
                    <div class="table-responsive text-nowrap">
                    <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="left">Id</TableCell>
                <TableCell align="left">User Name</TableCell>
                <TableCell align="left">Email Address</TableCell>
                <TableCell align="left">Contact Number</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
             <TableBody>
              {manageData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((userList) => {
                let cssClass;
                if (userList?.role === 'Admin') {
                  cssClass = 'bg-label-success'
              } else if (userList?.role === 'Supervisors') {
                  cssClass = 'bg-label-info'
              } else if (userList?.role === 'Agents') {
                  cssClass = 'bg-label-primary'
              } else if (userList?.role === 'Designer') {
                  cssClass = 'bg-label-warning'
              } else if (userList?.role === 'Packagers') {
                cssClass = 'bg-label-danger'
              } else if (userList?.role === 'Trackers') {
                cssClass = 'bg-label-dark'
              } else {
                  cssClass = 'bg-label-secondary'
              }
                return (
                <TableRow >
                  <TableCell component="th" scope="row">{userList?.id}</TableCell>
                  <TableCell align="left">{userList?.userName}</TableCell>
                  <TableCell align="left">{userList?.email}</TableCell>
                  <TableCell align="left">{userList?.phone}</TableCell>
                  <TableCell align="left">{userList?.role}</TableCell>
                  <TableCell align="left">
                  <Link to={`/update-user/${userList.id}`}>
                                      <a class="dropdown-item">
                                        <i class="bx bx-edit-alt me-1"></i> Edit
                                      </a>
                  </Link>
                  </TableCell>
                  <TableCell align="left">
                  <a
                                      class="dropdown-item"
                                      onClick={() => handleDelete(userList)}
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
                count={manageData && manageData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
                  {/* <
                {/* <table class="table">
                    <thead>
                      <tr>
                        <th><b>ID</b></th>
                        <th><b>UserName</b></th>
                        <th><b>Email Address</b></th>
                        <th><b>Contact Number</b></th>
                        <th><b>Role</b></th>
                      </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                        {
                            manageData? manageData.map((userList) => {
                              let cssClass;

                              if (userList?.role === 'Admin') {
                                  cssClass = 'bg-label-success'
                              } else if (userList?.role === 'Supervisors') {
                                  cssClass = 'bg-label-info'
                              } else if (userList?.role === 'Agents') {
                                  cssClass = 'bg-label-primary'
                              } else if (userList?.role === 'Designer') {
                                  cssClass = 'bg-label-warning'
                              } else if (userList?.role === 'Packagers') {
                                cssClass = 'bg-label-danger'
                              } else if (userList?.role === 'Trackers') {
                                cssClass = 'bg-label-dark'
                              } else {
                                  cssClass = 'bg-label-secondary'
                              }

                                return (
                                    <>
                                        <tr class="table-light">
                                        <td><i class="fab fa-bootstrap fa-lg text-primary me-3"></i> <strong>{userList?.id}</strong></td>
                                        <td>{userList?.userName}</td>
                                        <td>{userList?.email}</td>
                                        <td>{userList?.phone}</td>
                                        <td> 
                                          <span class={`badge ${cssClass} me-1`}>{userList?.role}</span>
                                        </td>
                                        <td><Link to={`/update-user/${userList.id}`}><a class="dropdown-item">
                                                    <i class="bx bx-edit-alt me-1"></i> Edit</a></Link></td>
                                        <td>
                                          <a class="dropdown-item" onClick={() => handleDelete(userList)}>
                                                    <i class="bx bx-trash me-1"></i> Delete</a>
                                        </td>
                                        </tr>
                                    </> 
                                )
                            }) : null
                        }
                    </tbody>
                </table> */}
            </div>
            </div>
            </div>

            
        </div>
    </>
  )
}


export default Users;