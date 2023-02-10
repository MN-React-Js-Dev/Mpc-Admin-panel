import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createOrdersStart } from "../Redux/Actions/ordersActions";

const Form = () => {
  
  const orderData = {
    orderName: "",
    address: "",
    pincode: "",
    phone: "",
    desing: "",
    note: "",
    image: null,
  };
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState(orderData);
  const formData = new FormData()
  const dispatch = useDispatch()

  const handleFileSelect = (e) => {
    setData({...data,  [e.target.name]: e.target.files[0]})
}

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
    if (
      data.orderName &&
      data.address &&
      data.pincode &&
      data.phone &&
      data.desing &&
      data.note &&
      data.image
    ) {
      formData.append("orderName", data.orderName);
      formData.append("address", data.address);
      formData.append("pincode", data.pincode);
      formData.append("phone", data.phone);
      formData.append("desing", data.desing);
      formData.append("note", data.note);
      formData.append("image", data.image);
      dispatch(createOrdersStart(formData))

    }
  };

  return (
    <>
      <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4">Create Order</h4>

        <div class="card mb-4">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Create Order</h5>
          </div>
          <div class="card-body">
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label class="form-label" for="basic-icon-default-fullname">
                  Full Name <span className="error">*</span>{" "}
                </label>
                <div class="input-group input-group-merge">
                  <span
                    id="basic-icon-default-fullname2"
                    className={
                      submitted && !data.orderName
                        ? `input-group-text invalid `
                        : `input-group-text`
                    }
                  >
                    <i class="bx bx-user"></i>
                  </span>
                  <input
                    type="text"
                    className={
                      submitted && !data.orderName
                        ? `form-control invalid `
                        : `form-control`
                    }
                    id="basic-icon-default-fullname"
                    name="orderName"
                    value={data.orderName || ""}
                    placeholder="John Doe"
                    aria-label="John Doe"
                    aria-describedby="basic-icon-default-fullname2"
                    onChange={handleInput}
                  />
                </div>
                {submitted && !data.orderName && (
                  <label class="error" for="basic-icon-default-fullname">
                    Name is required
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
                    Enter Address
                  </label>
                )}
              </div>

              <div class="mb-3">
                <label class="form-label" for="basic-icon-default-pincode">
                  Pin Code <span className="error">*</span>
                </label>
                <div class="input-group input-group-merge">
                  <span
                    id="basic-icon-default-pincode"
                    className={
                      submitted && !data.pincode
                        ? `input-group-text invalid `
                        : `input-group-text`
                    }
                  >
                    <i class="bx bx-globe"></i>
                  </span>
                  <input
                    type="text"
                    className={
                      submitted && !data.pincode
                        ? `form-control invalid `
                        : `form-control`
                    }
                    id="basic-icon-default-pincode"
                    name="pincode"
                    value={data.pincode || ""}
                    placeholder="123456"
                    aria-label="123456"
                    aria-describedby="basic-icon-default-fullname2"
                    onChange={handleInput}
                  />
                </div>
                {submitted && !data.pincode && (
                  <label class="error" for="basic-icon-default-fullname">
                    Provide Pincode
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
                <label class="form-label" for="basic-icon-default-desing">
                  Design <span className="error">*</span>
                </label>
                <div class="input-group input-group-merge">
                  <span
                    id="basic-icon-default-desing"
                    className={
                      submitted && !data.desing
                        ? `input-group-text invalid `
                        : `input-group-text`
                    }
                  >
                    <i class="bx bx-card"></i>
                  </span>
                  <input
                    type="text"
                    className={
                      submitted && !data.desing
                        ? `form-control invalid `
                        : `form-control`
                    }
                    id="basic-icon-default-desing"
                    name="desing"
                    value={data.desing || ""}
                    placeholder="..."
                    aria-label="..."
                    aria-describedby="basic-icon-default-fullname2"
                    onChange={handleInput}
                  />
                </div>
                {submitted && !data.desing && (
                  <label class="error" for="basic-icon-default-fullname">
                    Desingdesing is required
                  </label>
                )}
              </div>

              <div class="mb-3">
                <label for="formFile" class="form-label">
                  photo Upload
                </label>
                <input 
                 className={
                  submitted && !data.image
                    ? `form-control invalid `
                    : `form-control`
                  } 
                  name='image'
                  type="file" 
                  id="image" 
                  accept="/image/*"
                  placeholder="image"
                  onChange={handleFileSelect} />
              </div>

              <div class="mb-3">
                <label class="form-label" for="basic-icon-default-note">
                  Note
                </label>
                <div class="input-group input-group-merge">
                  <span id="basic-icon-default-note" class="input-group-text">
                    <i class="bx bx-comment"></i>
                  </span>
                  <textarea
                    id="basic-icon-default-note"
                    name="note"
                    value={data.note || ""}
                    class="form-control"
                    placeholder="Please leave us a note if you have"
                    aria-label="Please leave us a note if you have"
                    aria-describedby="basic-icon-default-message2"
                    onChange={handleInput}
                  ></textarea>
                </div>
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

export default Form;
