import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Form } from 'react-router-dom';
import { getAllUsersStart } from '../Redux/Actions/usersActions';
import Form from './Form'
const Users = () => {

    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsersStart())
    },[])
    const usersData = useSelector((state) => state?.users?.users?.data?.rows)
    console.log("USERDATA~~~>>>", usersData)

    const handleActions = (e) => {
        e.preventDefault();
        setToggle(!toggle)
    }

  return (
    <>
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4">All User</h4>

            <div class="card mb-4">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">User List</h5>
                        <Link  to={`/register-user/`}>
                            <button type="button" class="btn btn-primary">+ NEW</button>
                        </Link>
                    </div>

                    <div class="card-body">
                    <div class="table-responsive text-nowrap">
                <table class="table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>UserName</th>
                        <th>Email Address</th>
                        <th>Contact Number</th>
                        <th>Address</th>
                        <th>Gender</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody class="table-border-bottom-0">
                        {
                            usersData? usersData.map((userList) => {
                                return (
                                    <>
                                        <tr class="table-dark">
                                        <td><i class="fab fa-bootstrap fa-lg text-primary me-3"></i> <strong>{userList?.id}</strong></td>
                                        <td>{userList?.userName}</td>
                                        <td>{userList?.email}</td>
                                        <td>{userList?.phone}</td>
                                        <td>{userList?.address}</td>
                                        <td>{userList?.gender}</td>
                                        <td><span class="badge bg-label-success me-1">{userList?.role}</span></td>
                                        <td>
                                        <div class="dropdown">
                                            <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown" onClick={handleActions}>
                                            <i class="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div class="dropdown-menu">
                                                <Link to='/register-user'>
                                                <a class="dropdown-item">
                                                    <i class="bx bx-edit-alt me-1"></i> Edit</a>
                                                </Link>
                                                
                                                <a class="dropdown-item">
                                                    <i class="bx bx-trash me-1"></i> Delete</a>
                                            </div>
                                        </div>
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