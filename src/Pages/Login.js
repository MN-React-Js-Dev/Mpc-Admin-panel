import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUsersStart } from '../Redux/Actions/usersActions';

const Login = () => {

  const dispatch = useDispatch();
  const loginData = {
    email: "",
    password: ""
  };
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState(loginData);

  const handleInput = (e) => {
    e.preventDefault();
    let value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
    console.log("FORM DATA~~~~>>>>>", data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (
      data.email &&
      data.password
    ) {
      console.log("SUBMIT~~>>", data);
      dispatch(loginUsersStart(data))
      localStorage.setItem('loginVibes', 'red');
    }
  };
  return (
    <>
      <div class="container-xxl">
        <div class="authentication-wrapper authentication-basic container-p-y">
          <div class="authentication-inner">
            <div class="card mb-4">                    
              <div class="card-body">
                <h4 class="mb-2">Welcome to MPC! 👋</h4>
                <p class="mb-4">Please Login to your account and start the adventure</p>

                <form onSubmit={handleSubmit}>
                  <div class="mb-3">
                    <label class="form-label" for="basic-icon-default-fullname">
                      Email Address <span className="error">*</span>{" "}
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
                        type="text"
                        className={
                          submitted && !data.email
                            ? `form-control invalid `
                            : `form-control`
                        }
                        id="basic-icon-default-email"
                        name="email"
                        value={data.email || ""}
                        placeholder="JohnDoe@gmail.com"
                        aria-label="JohnDoe@gmail.com"
                        aria-describedby="basic-icon-default-email"
                        onChange={handleInput}
                      />
                    </div>
                    {submitted && !data.email && (
                      <label class="error" for="basic-icon-default-email">
                        Email Address is required
                      </label>
                    )}
                  </div>

                  <div class="mb-3">
                    <label class="form-label" for="basic-icon-default-password">
                      Password <span className="error">*</span>{" "}
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
                        <i class="bx bx-user"></i>
                      </span>
                      <input
                        type="password"
                        className={
                          submitted && !data.password
                            ? `form-control invalid `
                            : `form-control`
                        }
                        id="basic-icon-default-password"
                        name="password"
                        value={data.password || ""}
                        placeholder=""
                        aria-label=""
                        aria-describedby="basic-icon-default-password"
                        onChange={handleInput}
                      />
                      <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
                    </div>
                    {submitted && !data.password && (
                      <label class="error" for="basic-icon-default-password">
                        Password is required
                      </label>
                    )}
                  </div>

                  <div class="mb-3">
                    <button class="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Login;
