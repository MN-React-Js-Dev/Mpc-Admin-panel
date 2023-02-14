import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUsersStart, getUserByRoleStart } from '../Redux/Actions/usersActions';

const Users = () => {

    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [data, setData] = useState();
    
    const [filterData, setFilterData] = useState()
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(getAllUsersStart())
    },[])
    
    const usersData = useSelector((state) => state?.users?.users?.data?.rows)
    const roleData = useSelector((state) => state?.users?.usersRole?.serviceSearch)
    
    const [manageData, setManageData] = useState(usersData);
    
    useEffect (() => {
      if (roleData) {
        setManageData(roleData)
      } else {
        setManageData(usersData)
      } 
    },[roleData, usersData])
    
    // console.log("MANAGE DATA~~>>>", manageData)
    const handleDelete = (userList) => {
        setData(userList)
        // console.log("DELETE ID!~~~", userList)
        setDeleteProductDialog(true)
    }

    const onFilterValueChange = (e) => {
        let name = e.target.name;
        setFilterData({
          ...filterData,
          [name] : e.target.value
        })
        // dispatch(getUserByRoleStart(filterData))
      }
      {
        filterData && dispatch(getUserByRoleStart(filterData))
      }
     
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
                                <option value="Superwiser">Superwiser</option>
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
                              } else if (userList?.role === 'Superwiser') {
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
                                        {/* <td>{userList?.address}</td> */}   
                                        <td> 
                                          <span class={`badge ${cssClass} me-1`}>{userList?.role}</span>
                                        </td>
                                        <td><Link to={`/update-user/${userList.id}`}><a class="dropdown-item">
                                                    <i class="bx bx-edit-alt me-1"></i> Edit</a></Link></td>
                                        <td>
                                          <a class="dropdown-item" onClick={() => handleDelete(userList)}>
                                                    <i class="bx bx-trash me-1"></i> Delete</a>
                                                    {/* <button
                                                        type="button"
                                                        class="btn btn-primary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#modalCenter"
                                                      >
                                                        Launch modal
                                                      </button> */}
                                        </td>
                                        </tr>
                                    </> 
                                )
                            }) : null
                        }
                    </tbody>
                </table>


                {/* { deleteProductDialog &&
                    <div class="col-lg-4 col-md-6">
                      <div class="modal fade" aria-hidden="true"> 
                        <div class="mt-3">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalCenterTitle">Modal title</h5>
                                <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <div class="row">
                              <div class="col mb-3">
                                  <label for="nameWithTitle" class="form-label">Are you Sure You want to Delete ?</label>
                                 
                                </div>
                                <div class="modal-footer">
                              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                                Cancel
                              </button>
                              <button type="button" class="btn btn-primary">Delete</button>
                            </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                    </div>
                  </div>
                } */}

               
            </div>
            </div>
            </div>

            
        </div>
    </>
  )
}

export default Users;