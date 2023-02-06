import React, { useState } from "react";

const RegisterUser = () => {
  const formData = {
    role: "",
    userName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    password: "",
    confirmPassword: "",
  };
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState(formData);

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

    console.log("FORM DATA~~~~>>>>>", data);
    if (
      data.role &&
      data.userName &&
      data.address &&
      data.email &&
      data.phone &&
      data.gender &&
      data.password &&
      data.confirmPassword
    ) {
      console.log("SUBMIT~~>>", data);
    }
  };

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
                    className={
                      submitted && !data.role
                        ? `form-control invalid `
                        : `form-control`
                    }
                  >
                    <option selected></option>
                    <option value="1">Admin</option>
                    <option value="2">Superwiser</option>
                    <option value="3">Agents</option>
                    <option value="4">Designer</option>
                    <option value="5">Packagers</option>
                    <option value="6">Trackers</option>
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

              <div class="mb-3">
                <label class="form-label" for="basic-icon-default-email">
                  Email Address <span className="error">*</span>
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
                    Provide email Address
                  </label>
                )}
              </div>

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
                  Address <span className="error">*</span>
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
                    type="password"
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
                    Enter Address
                  </label>
                )}
              </div>

              <div class="mb-3">
                <label
                  class="form-label"
                  name="gender"
                  value={data.gender || ""}
                  for="basic-icon-default-confirmPassword"
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
                      id="defaultRadio1"
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
                      id="defaultRadio2"
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
                    type="password"
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
                    type="password"
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
                </div>
                {submitted && !data.confirmPassword && (
                  <label class="error" for="basic-icon-default-fullname">
                    Confirm password is required
                  </label>
                )}
              </div>

              <button type="submit" class="btn btn-primary">
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
