import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { forgotPasswordStart } from '../../Redux/Actions/usersActions';

const ForgotPassword = () => {

    const formData = {
        email: ""
    }
    
    const dispatch = useDispatch();
    const [data, setData] = useState(formData);
    const [submitted, setSubmitted] = useState(false);

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
        if (data.email) {
            dispatch(forgotPasswordStart(data))
        }
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
            <h4 class="mb-2">Forgot Password? 🔒</h4>
            <p class="mb-4">Enter your email and we'll send you instructions to reset your password</p>
            <form class="mb-3" onSubmit={handleSubmit} >
            <div class="mb-3">
                    <label class="form-label" for="basic-icon-default-fullname">
                    Enter Register Email Address<span className="error">*</span>{" "}
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
                        <i class="bx bx-user"></i>
                    </span>
                    <input
                        type="email"
                        className={
                        submitted && !data.email
                            ? `form-control invalid `
                            : `form-control`
                        }
                        id="email"
                        name="email"
                        placeholder="Enter your Email"
                        onChange={handleInput}
                    />
                    </div>
                    {submitted && !data.email && (
                    <label class="error" for="basic-icon-default-fullname">
                        Email Address is required
                    </label>
                    )}
                </div>
              <button type='submit' class="btn btn-primary d-grid w-100">Send Reset Link</button>
            </form>
            <div class="text-center">
                <Link to='/'>
                <a href="auth-login-basic.html" class="d-flex align-items-center justify-content-center">
                    <i class="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
                    Back to login
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

export default ForgotPassword;
