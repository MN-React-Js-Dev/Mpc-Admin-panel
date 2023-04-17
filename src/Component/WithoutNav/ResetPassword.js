import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPasswordStart } from '../../Redux/Actions/usersActions';
import { CircularProgress } from '@mui/material';
import { validatePassword } from '../../Constants/validations';

const ResetPassword = () => {
    const dispatch = useDispatch();
    let params = (new URL(document.location))?.searchParams;
    let name = params.get("email");

    const formData = {
        newPassword: "",
        confirmPassword: "",
        email: name,
    }

    const isLoading = useSelector((state) => state?.users?.isLoading)
    const [data, setData] = useState(formData);
    const [submitted, setSubmitted] = useState(false);
    const [newPasswordshow, setNewPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

    const handleInput = (e) => {
        const name = e.target.name;
        setData({
            ...data,
            [name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true)
        if(data.email && validatePassword(data.newPassword) && data.newPassword === data.confirmPassword) {
          dispatch(resetPasswordStart(data))
        }
    }

    const handleNewPasswordShow = () => {
      setNewPasswordShow(!newPasswordshow)
    }

    const handleConfirmPasswordShow = () => {
      setConfirmPasswordShow(!confirmPasswordShow)
    }

  return (
    <div class="container-xxl">
    <div class="authentication-wrapper authentication-basic container-p-y">
      <div class="authentication-inner py-4">
        {/* <!-- Forgot Password --> */}
        <div class="card">
          <div class="card-body">
            {/* <!-- Logo --> */}
            <div class="app-brand justify-content-center">
              <a href="index.html" class="app-brand-link gap-2">
                <span class="app-brand-text demo text-body fw-bolder">My Print Clothes</span>
              </a>
            </div>
            {/* <!-- /Logo --> */}
            <h4 class="mb-2">Reset Password 🔒</h4>
            <p class="mb-4">Enter your password and we'll send you instructions to reset your password</p>
            <form class="mb-3" onSubmit={handleSubmit} >

              <div class="mb-3">
              <label class="form-label" for="basic-icon-default-fullname">
                  New Password<span className="error">*</span>{" "}
                  </label>
              <div class="input-group input-group-merge">
                  <span
                      id="basic-icon-default-fullname"
                      className={
                      submitted && !data.newPassword || submitted && !validatePassword(data.newPassword)
                          ? `input-group-text invalid `
                          : `input-group-text`
                      }>
                      <i class="bx bx-user"></i>
                  </span>
                  <input
                      type={newPasswordshow ? "text" : "password"}
                      className={
                      submitted && !data.newPassword || submitted && !validatePassword(data.newPassword)
                          ? `form-control invalid `
                          : `form-control`
                      }
                      id="newPassword"
                      name="newPassword"
                      placeholder="Enter your New Password"
                      onChange={handleInput}
                  />
                   <span 
                      class="input-group-text cursor-pointer" 
                      className={
                        submitted && !data.newPassword || submitted && !validatePassword(data.newPassword)
                          ? `input-group-text invalid `
                          : `input-group-text`
                      }
                      onClick={handleNewPasswordShow}>
                        <i class={newPasswordshow ? "bx bx-show" : "bx bx-hide"}></i>
                    </span>
                  </div>
                  {(submitted && !data.newPassword && (
                  <label class="error" for="basic-icon-default-fullname">
                      New Password is required
                  </label>
                  )) || (submitted && !validatePassword(data.newPassword) && (
                    <label class="error" for="basic-icon-default-fullname">
                        Please enter strong password
                    </label>
                    ))}
              </div>

              <div class="mb-3">
              <label class="form-label" for="basic-icon-default-fullname">
                  Confirm Password<span className="error">*</span>{" "}
                  </label>
              <div class="input-group input-group-merge">
                  <span
                      id="basic-icon-default-fullname"
                      className={
                      submitted && !data.confirmPassword || submitted && data.newPassword !== data.confirmPassword 
                          ? `input-group-text invalid `
                          : `input-group-text`
                      }>
                      <i class="bx bx-user"></i>
                  </span>
                  <input
                      type={confirmPasswordShow ? "text" : "password"}
                      className={
                      submitted && !data.confirmPassword || submitted && data.newPassword !== data.confirmPassword 
                          ? `form-control invalid `
                          : `form-control`
                      }
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Enter your Confirm Password"
                      onChange={handleInput}
                  />
                   <span 
                      class="input-group-text cursor-pointer" 
                      className={
                        submitted && !data.confirmPassword || submitted && data.newPassword !== data.confirmPassword 
                          ? `input-group-text invalid `
                          : `input-group-text`
                      }
                      onClick={handleConfirmPasswordShow}>
                        <i class={confirmPasswordShow ? "bx bx-show" : "bx bx-hide"}></i>
                    </span>
                  </div>
                  {(submitted && !data.confirmPassword && (
                  <label class="error" for="basic-icon-default-fullname">
                      Confirm Password is required
                  </label>
                  )) || (submitted && data.newPassword !== data.confirmPassword && (
                    <label class="error" for="basic-icon-default-fullname">
                        Confirm password is Not Matched
                    </label>
                    ))}
              </div>
              {
                  isLoading ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CircularProgress />
                    </div>
                  ) : null
                }

              <button type='submit' class="btn btn-primary d-grid w-100" disabled={isLoading}>Change Password</button>
            </form>
            <div class="text-center">
              <Link to='/'>
              <a class="d-flex align-items-center justify-content-center">
                <i class="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                Back to Login
              </a>
              </Link>
            </div>
          </div>
        </div>
        {/* <!-- /Forgot Password --> */}
      </div>
    </div>
  </div>
  )
}

export default ResetPassword;
