import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllUsersStart, registerUserStart, updateUserStart } from "../Redux/Actions/usersActions";
import { CircularProgress } from "@mui/material";

const RegisterUser = () => {
  const formData = {
    userName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    email: "",
    address: "",
    gender: "",
    role: "",
  };

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState(formData);
  var { id } = useParams();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(getAllUsersStart())
  },[])
  
  const isUserRegister = useSelector((state) => state?.users?.isLoading);
  const usersData = useSelector((state) => state?.users?.users?.data?.rows)

  useEffect(() => {
    if (id) {
        setEditMode(true);
        const singleUser = usersData ? usersData.find((item) => item.id === Number(id)) : null;
        setData({...singleUser})
      } else {
        setEditMode(false);
        setData({...data})
      }
    }, [id]);

  const handleInput = (e) => {
    e.preventDefault();
    let value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if(!editMode) {
      if (
        data.role && 
        data.userName &&
        data.email && 
        data.phone &&
        data.address &&
        data.gender &&
        data.password &&
        data.confirmPassword
      ) {
        setData(data)
        dispatch(registerUserStart(data))
      }
    } else {
      if(
        data.role &&
        data.userName &&
        data.address &&
        data.gender &&
        data.phone
      ) {
        setData(data) 
        dispatch(updateUserStart(data))
      }
    }
  };

  const handleShow = () => {
    setShow(!show)
}

const handleConfirmPass = () => {
  setShowCPass(!showCPass)
}

  return (
    <>
      <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4">Create User</h4>

        <div class="card mb-4">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Create User</h5>
          </div>
          <div class="card-body">
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label class="form-label" for="basic-icon-default-role">
                  Select Role <span className="error">*</span>{" "}
                </label>
                <div class="input-group input-group-merge">
                  <span
                    id="basic-icon-default-role"
                    className={
                      submitted && !data.role
                        ? `input-group-text invalid `
                        : `input-group-text`
                    }
                  >
                    <i class="bx bx-user"></i>
                  </span>
                  <select
                    id="exampleFormControlSelect1"
                    name="role"
                    aria-label="Default select example"
                    onChange={handleInput}
                    value={data.role || ""}
                    className={
                      submitted && !data.role
                        ? `form-control invalid `
                        : `form-control`
                    }
                  >
                    <option disabled>Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Agent">Agent</option>
                    <option value="Designer">Designer</option>
                    <option value="Packager">Packager</option>
                    <option value="Tracker">Tracker</option>
                  </select>
                </div>
                {submitted && !data.role && (
                  <label class="error" for="basic-icon-default-fullname">
                    Select Role
                  </label>
                )}
              </div>

              <div class="mb-3">
                <label class="form-label" for="basic-icon-default-fullname">
                  Full Name <span className="error">*</span>{" "}
                </label>
                <div class="input-group input-group-merge">
                  <span
                    id="basic-icon-default-fullname2"
                    className={
                      submitted && !data.userName
                        ? `input-group-text invalid `
                        : `input-group-text`
                    }
                  >
                    <i class="bx bx-user"></i>
                  </span>
                  <input
                    type="text"
                    className={
                      submitted && !data.userName
                        ? `form-control invalid `
                        : `form-control`
                    }
                    id="basic-icon-default-fullname"
                    name="userName"
                    value={data.userName || ""}
                    placeholder="John Doe"
                    aria-label="John Doe"
                    aria-describedby="basic-icon-default-fullname2"
                    onChange={handleInput}
                  />
                </div>
                {submitted && !data.userName && (
                  <label class="error" for="basic-icon-default-fullname">
                    Name is required
                  </label>
                )}
              </div>

                {!editMode && (
                  <>  
                    <div class="mb-3">
                <label class="form-label" for="basic-icon-default-email">
                  email address <span className="error">*</span>
                </label>
                <div class="input-group input-group-merge">
                  <span
                    id="basic-icon-default-email"
                    className={
                      submitted && !data.email
                        ? `input-group-text invalid `
                        : `input-group-text`
                    }
                  >
                    <i class="bx bx-globe"></i>
                  </span>
                  <input
                    type="text"
                    className={
                      submitted && !data.email
                        ? `form-control invalid `
                        : `form-control`
                    }
                    id="basic-icon-default-email"
                    name="email"
                    value={data.email || ""}
                    placeholder="email@email.com"
                    aria-label="email@email.com"
                    aria-describedby="basic-icon-default-fullname2"
                    onChange={handleInput}
                  />
                </div>
                {submitted && !data.email && (
                  <label class="error" for="basic-icon-default-fullname">
                    Provide email address
                  </label>
                )}
              </div>
                  </>
                )}
            

              <div class="mb-3">
                <label class="form-label" for="basic-icon-default-phone">
                  Phone Number <span className="error">*</span>
                </label>
                <div class="input-group input-group-merge">
                  <span
                    id="basic-icon-default-phone2"
                    className={
                      submitted && !data.phone
                        ? `input-group-text invalid `
                        : `input-group-text`
                    }
                  >
                    <i class="bx bx-phone"></i>
                  </span>
                  <input
                    type="text"
                    className={
                      submitted && !data.phone
                        ? `form-control invalid `
                        : `form-control`
                    }
                    id="basic-icon-default-phone"
                    name="phone"
                    value={data.phone || ""}
                    placeholder="123 456 4560"
                    aria-label="123 456 4560"
                    aria-describedby="basic-icon-default-fullname2"
                    onChange={handleInput}
                  />
                </div>
                {submitted && !data.phone && (
                  <label class="error" for="basic-icon-default-fullname">
                    Enter Phone number
                  </label>
                )}
              </div>

              <div class="mb-3">
                <label class="form-label" for="basic-icon-default-address">
                  address <span className="error">*</span>
                </label>
                <div class="input-group input-group-merge">
                  <span
                    id="basic-icon-default-address"
                    className={
                      submitted && !data.address 
                        ? `input-group-text invalid `
                        : `input-group-text`
                    }
                  >
                    <i class="bx bx-buildings"></i>
                  </span>
                  <input
                    type="text"
                    className={
                      submitted && !data.address
                        ? `form-control invalid `
                        : `form-control`
                    }
                    id="basic-icon-default-address"
                    name="address"
                    value={data.address || ""}
                    placeholder="Street, city"
                    aria-label="Street, city"
                    aria-describedby="basic-icon-default-fullname2" 
                    onChange={handleInput}
                  />
                </div>
                {submitted && !data.address && (
                  <label class="error" for="basic-icon-default-fullname">
                    Enter address
                  </label>
                )}
              </div>

              <div class="mb-3">
                <label
                  class="form-label"
                  name="gender"
                  value={data.gender || ""}
                  for="basic-icon-default-gender"
                >
                  Select Gender <span className="error">*</span>
                </label>
                <div>
                  <div class="form-check">
                    <input
                      name="gender"
                      class="form-check-input"
                      type="radio"
                      value="male"
                      onChange={handleInput}
                      id="male"
                      checked={data.gender === 'male' || ""}
                    />
                    <label class="form-check-label" for="defaultRadio1">
                      {" "}
                      Male{" "}
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      name="gender"
                      class="form-check-input"
                      type="radio"
                      value="female"
                      onChange={handleInput}
                      id="female"
                      checked={data.gender === 'female' || ""}
                    />
                    <label class="form-check-label" for="defaultRadio2">
                      {" "}
                      Female{" "}
                    </label>
                  </div>
                </div>
                {submitted && !data.gender && (
                  <label class="error" for="basic-icon-default-fullname">
                    Gender is required
                  </label>
                )}
              </div>

                {!editMode && (
                  <>
                      <div class="mb-3">
                    <label class="form-label" for="basic-icon-default-password">
                      password <span className="error">*</span>
                    </label>
                    <div class="input-group input-group-merge">
                      <span
                        id="basic-icon-default-password"
                        className={
                          submitted && !data.password
                            ? `input-group-text invalid `
                            : `input-group-text`
                        }
                      >
                        <i class="bx bx-card"></i>
                      </span>
                      <input
                        type={showCPass ? "text" : "password"}
                        className={
                          submitted && !data.password
                            ? `form-control invalid `
                            : `form-control`
                        }
                        id="basic-icon-default-password"
                        name="password"
                        value={data.password || ""}
                        placeholder="..."
                        aria-label="..."
                        aria-describedby="basic-icon-default-fullname2"
                        onChange={handleInput}
                      />
                   <span class="input-group-text cursor-pointer" onClick={handleConfirmPass}><i class={showCPass ? "bx bx-show" : "bx bx-hide"}></i></span>
                    </div>
                    {submitted && !data.password && (
                      <label class="error" for="basic-icon-default-fullname">
                        password is required
                      </label>
                    )}
                  </div>
    
                  <div class="mb-3">
                    <label
                      class="form-label"
                      for="basic-icon-default-confirmPassword"
                    >
                      Confirm Password <span className="error">*</span>
                    </label>
                    <div class="input-group input-group-merge">
                      <span
                        id="basic-icon-default-confirmPassword"
                        className={
                          submitted && !data.confirmPassword
                            ? `input-group-text invalid `
                            : `input-group-text`
                        }
                      >
                        <i class="bx bx-card"></i>
                      </span>
                      <input
                          type={show ? "text" : "password"}
                        className={
                          submitted && !data.confirmPassword
                            ? `form-control invalid `
                            : `form-control`
                        }
                        id="basic-icon-default-confirmPassword"
                        name="confirmPassword"
                        value={data.confirmPassword || ""}
                        placeholder="..."
                        aria-label="..."
                        aria-describedby="basic-icon-default-fullname2"
                        onChange={handleInput}
                      />
                   <span class="input-group-text cursor-pointer" onClick={handleShow}><i class={show ? "bx bx-show" : "bx bx-hide"}></i></span>
                    </div>
                    {submitted && !data.confirmPassword && (
                      <label class="error" for="basic-icon-default-fullname">
                        Confirm password is required
                      </label>
                    )}
                  </div>
                  </>

                  )
                }

                {
                  isUserRegister === true ? (
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <CircularProgress  />
                      </div>
                  ) : null
                }

              <button type="submit" class="btn btn-primary" disabled={isUserRegister} >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterUser;
