import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../assets/vendor/css/pages/page-auth.css'
import { changePasswordStart } from '../../Redux/Actions/usersActions';

export const ChangePassword = () => {

    const formData = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    }

    const [data, setData] = useState(formData);
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();

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
        if (data.currentPassword && data.newPassword && data.confirmPassword) {
            dispatch(changePasswordStart(data))
        }
        console.log("DATA~~~>>>>", data)
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
              <h4 class="mb-2">Change Password? 🔒</h4>
              <p class="mb-4">Enter your email and we'll send you instructions to reset your password</p>
              <form class="mb-3" onSubmit={handleSubmit} >
                
                <div class="mb-3">
                    <label class="form-label" for="basic-icon-default-fullname">
                    Current Password<span className="error">*</span>{" "}
                    </label>
                    <div class="input-group input-group-merge">
                    <span
                        id="basic-icon-default-fullname"
                        className={
                        submitted && !data.currentPassword
                            ? `input-group-text invalid `
                            : `input-group-text`
                        }>
                        <i class="bx bx-user"></i>
                    </span>
                    <input
                        type="password"
                        className={
                        submitted && !data.currentPassword
                            ? `form-control invalid `
                            : `form-control`
                        }
                        id="currentPassword"
                        name="currentPassword"
                        placeholder="Enter your Current Password"
                        onChange={handleInput}
                    />
                    </div>
                    {submitted && !data.currentPassword && (
                    <label class="error" for="basic-icon-default-fullname">
                        Current Password is required
                    </label>
                    )}
                </div>
                <div class="mb-3">
                <label class="form-label" for="basic-icon-default-fullname">
                    New Password<span className="error">*</span>{" "}
                    </label>
                <div class="input-group input-group-merge">
                    <span
                        id="basic-icon-default-fullname"
                        className={
                        submitted && !data.newPassword
                            ? `input-group-text invalid `
                            : `input-group-text`
                        }>
                        <i class="bx bx-user"></i>
                    </span>
                    <input
                        type="password"
                        className={
                        submitted && !data.newPassword
                            ? `form-control invalid `
                            : `form-control`
                        }
                        id="newPassword"
                        name="newPassword"
                        placeholder="Enter your New Password"
                        onChange={handleInput}
                    />
                    </div>
                    {submitted && !data.newPassword && (
                    <label class="error" for="basic-icon-default-fullname">
                        New Password is required
                    </label>
                    )}
                </div>
                <div class="mb-3">
                <label class="form-label" for="basic-icon-default-fullname">
                    Confirm Password<span className="error">*</span>{" "}
                    </label>
                <div class="input-group input-group-merge">
                    <span
                        id="basic-icon-default-fullname"
                        className={
                        submitted && !data.confirmPassword
                            ? `input-group-text invalid `
                            : `input-group-text`
                        }>
                        <i class="bx bx-user"></i>
                    </span>
                    <input
                        type="password"
                        className={
                        submitted && !data.confirmPassword
                            ? `form-control invalid `
                            : `form-control`
                        }
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Enter your Confirm Password"
                        onChange={handleInput}
                    />
                    </div>
                    {submitted && !data.confirmPassword && (
                    <label class="error" for="basic-icon-default-fullname">
                        Confirm Password is required
                    </label>
                    )}
                </div>

                <button type='submit' class="btn btn-primary d-grid w-100">Change Password</button>
              </form>
              <div class="text-center">
                <Link to='/home'>
                <a class="d-flex align-items-center justify-content-center">
                  <i class="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                  Back to Dashboard
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

export default ChangePassword;
