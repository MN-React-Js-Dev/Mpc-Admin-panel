import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import "../../assets/vendor/css/pages/page-auth.css";
import { changePasswordStart } from "../../Redux/Actions/usersActions";
import { useEffect } from "react";

export const ChangePassword = () => {
  const formData = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [data, setData] = useState(formData);
  const [submitted, setSubmitted] = useState(false);
  const [show, setShow] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const passDataSelector = useSelector((state) => state?.users?.error?.data);
  const isLoading = useSelector((state) => state?.users?.isLoading);

  useEffect(() => {
    if (passDataSelector?.status == 400) {
      setLoader(false);
    } else {
        setLoader(false);
    }
  }, [passDataSelector]);

  const handleInput = (e) => {
    const name = e.target.name;
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (data.currentPassword && data.newPassword && data.confirmPassword) {
      dispatch(changePasswordStart(data));
      setLoader(true)
    }
  };

  const handleShow = () => {
    setShow(!show);
  };

  const handleShowConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  const handleShowNew = () => {
    setShowNew(!showNew);
  };

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
                  <span class="app-brand-text demo text-body fw-bolder">
                    My Print Clothes
                  </span>
                </a>
              </div>
              {/* <!-- /Logo --> */}
              <h4 class="mb-2">Change Password? 🔒</h4>
              <p class="mb-4">
                Enter your email and we'll send you instructions to reset your
                password
              </p>
              <form class="mb-3" onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label class="form-label" for="basic-icon-default-fullname">
                    Current Password<span className="error">*</span>{" "}
                  </label>
                  <div class="input-group input-group-merge">
                    <span
                      id="basic-icon-default-password"
                      className={
                        submitted && !data.currentPassword
                          ? `input-group-text invalid `
                          : `input-group-text`
                      }
                    >
                      <i class="bx bx-user"></i>
                    </span>
                    <input
                      type={show ? "text" : "password"}
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
                    <span
                      class="input-group-text cursor-pointer"
                      onClick={handleShow}
                    >
                      <i class={show ? "bx bx-show" : "bx bx-hide"}></i>
                    </span>
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
                      id="basic-icon-default-password"
                      className={
                        submitted && !data.newPassword
                          ? `input-group-text invalid `
                          : `input-group-text`
                      }
                    >
                      <i class="bx bx-user"></i>
                    </span>
                    <input
                      type={showNew ? "text" : "password"}
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
                    <span
                      class="input-group-text cursor-pointer"
                      onClick={handleShowNew}
                    >
                      <i class={showNew ? "bx bx-show" : "bx bx-hide"}></i>
                    </span>
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
                      id="basic-icon-default-password"
                      className={
                        submitted && !data.confirmPassword
                          ? `input-group-text invalid `
                          : `input-group-text`
                      }
                    >
                      <i class="bx bx-user"></i>
                    </span>
                    <input
                      type={showConfirm ? "text" : "password"}
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
                    <span
                      class="input-group-text cursor-pointer"
                      onClick={handleShowConfirm}
                    >
                      <i class={showConfirm ? "bx bx-show" : "bx bx-hide"}></i>
                    </span>
                  </div>
                  {submitted && !data.confirmPassword && (
                    <label class="error" for="basic-icon-default-fullname">
                      Confirm Password is required
                    </label>
                  )}
                </div>

                <button class="btn btn-primary d-grid w-100" type="submit" disabled={loader ? true : false} >
                  {
                      isLoading ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress style={{ padding: '2px' }} />   Change Password
                      </div>
                      ) : (`Change Password`)
                    }
                </button>
              </form>

              <div class="text-center">
                <Link to="/home">
                  <a class="d-flex align-items-center justify-content-center">
                    <i class="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                    Back to Dashboard
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
