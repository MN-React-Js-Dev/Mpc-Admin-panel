import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteOrderStart } from '../Redux/Actions/ordersActions';
import { getAllUsersStart, getUserByRoleStart } from '../Redux/Actions/usersActions';

const Users = () => {

    const [filterData, setFilterData] = useState()
    const dispatch = useDispatch();
    
    useEffect(() => {
      if(!filterData) {
        dispatch(getAllUsersStart())
      } else {
        console.log("FILTERDATA~~>>>", filterData)
        dispatch(getUserByRoleStart(filterData))
      }
    },[filterData])

    
    const usersData = useSelector((state) => state?.users?.users?.data?.rows)
    const roleData = useSelector((state) => state?.users?.usersRole?.userSearch)
    console.log("ROLEDTA~~>>", roleData)
    
    const [manageData, setManageData] = useState(usersData);
    const [filter, SetFilter] = useState("");
    
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
   
    // const onFilterValueChange = (e) => {
    //     let name = e.target.name;
    //     setFilterData({
    //       ...filterData,
    //       [name] : e.target.value
    //     })
    //   }
      // {
      //   filterData && dispatch(getUserByRoleStart(filterData))
      // }
     
  return (
    <>
        <div class="container-xxl flex-grow-1 container-p-y">
        <div>
            <div class="row">
              <div class="col-lg-2 col-md-12 col-6 mb-4">
                <div class="card" onClick={() => setFilterData("admin")}>
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
                    <span class="fw-semibold d-block mb-1">Admin</span>
                    {/* <h3 class="card-title mb-2">$12,628</h3> */}
                  </div>
                </div>
              </div>
              <div class="col-lg-2 col-md-12 col-6 mb-4">
                <div class="card" onClick={() => setFilterData("supervisors")}>
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
                    <span class="fw-semibold d-block mb-1">Supervisors</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-2 col-md-12 col-6 mb-4">
                <div class="card" onClick={() => setFilterData("Agents")}>
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
                    <span class="d-block mb-1">Agents</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-2 col-md-12 col-6 mb-4">
                <div class="card" onClick={() => setFilterData("designer")}>
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
                    <span class="fw-semibold d-block mb-1">Designers</span>
                    </div>
                </div>
              </div>
              <div class="col-lg-2 col-md-12 col-6 mb-4">
                <div class="card" onClick={() => setFilterData("Packagers")}>
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
                    <span class="fw-semibold d-block mb-1">Packagers</span>
                    </div>
                </div>
              </div>
              <div class="col-lg-2 col-md-12 col-6 mb-4">
                <div class="card" onClick={() => setFilterData("Trackers")}>
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
                        {/* <h5 class="mb-0">User List</h5> */}
                        <div class="d-flex justify-content-between">
                          {/* <div class="input-group input-group-merge m-1">
                              <select
                                id="exampleFormControlSelect1"
                                name="role"
                                aria-lbel="Default select example"
                                value={filterData?.role || ""}
                                // onChange={(e) => onFilterValueChange(e, "filterData")}
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
                            </div> */}
                            <Link to={`/register-user/`}>
                              <button type="button" class="btn btn-primary m-1">+ NEW</button>
                          </Link>

                        </div>
                    </div>

                    <div class="card-body">
                    <div class="table-responsive text-nowrap">
                <table class="table">
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
                </table>
            </div>
            </div>
            </div>

            
        </div>
    </>
  )
}


export default Users;