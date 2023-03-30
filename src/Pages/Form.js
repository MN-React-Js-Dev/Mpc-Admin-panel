import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createOrdersStart, getAllOrdersStart, updateOrderStart } from "../Redux/Actions/ordersActions";

const Form = () => {
  
  const orderData = {
    firstname: "",
    lastname  : "",
    city: "",
    province : "",
    country : "",
    orderName: "",
    address: "",
    pincode: "",
    phone: "",
    email:"",
    desing: "",
    quantity: "",
    price:"",
    image: null,
    note: "",
    status:""
  };
  const [submitted, setSubmitted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState(orderData);
  var { id } = useParams();
  const formData = new FormData()
  const dispatch = useDispatch()
  
  const ordersData = useSelector((state) => state?.orders?.orders?.ordersData?.rows)
  // console.log("SELECTOR DATA ORDER~~~>>>>", ordersData)

  const validateEmail = (email) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(String(email).toLowerCase());
};

  useEffect(() => {
      dispatch(getAllOrdersStart())
    },[]) 

    useEffect(() => {
      if (id) {
          setEditMode(true);
          // console.log("EDIT USER ID~~>>>", id)
          const singleOrder = ordersData ? ordersData.find((item) => item.id === Number(id)) : null;
          setData({...singleOrder})
        } else {
          setEditMode(false);
          setData({...data})
        }
      }, [id]);


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
      data.firstname && 
      data.lastname && 
      data.city &&
      data.province &&
      data.country &&   
      data.orderName &&
      data.address &&
      data.pincode &&
      data.phone &&
      data.desing && 
      data.quantity && 
      data.price && 
      data.status 
    ) {
      if (!editMode) {
        formData.append("firstname", data.firstname);
        formData.append("lastname", data.lastname);
        formData.append("city", data.city);
        formData.append("province ", data.province);
        formData.append("country", data.country);
        formData.append("orderName", data.orderName);
        formData.append("address", data.address);
        formData.append("pincode", data.pincode);
        formData.append("phone", data.phone);
        formData.append("desing", data.desing);
        formData.append("price", data.price);
        formData.append("image", data.image);
        dispatch(createOrdersStart(formData))
      } else {
        formData.append("id", id);
        formData.append("firstname", data.firstname);
        formData.append("lastname", data.lastname);
        formData.append("city", data.city);
        formData.append("province ", data.province);
        formData.append("country", data.country);
        formData.append("orderName", data.orderName);
        formData.append("address", data.address);
        formData.append("pincode", data.pincode);
        formData.append("phone", data.phone);
        formData.append("desing", data.desing);
        formData.append("price", data.price);
        formData.append("image", data.image);
        dispatch(updateOrderStart(formData))
      }
        
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
                First Name <span className="error">*</span>{" "}
              </label>
              <div class="input-group input-group-merge">
                <span
                  id="basic-icon-default-fullname2"
                  className={
                    submitted && !data.firstname
                      ? `input-group-text invalid `
                      : `input-group-text`
                  }
                >
                  <i class="bx bx-user"></i>
                </span>
                <input
                  type="text"
                  className={
                    submitted && !data.firstname
                      ? `form-control invalid `
                      : `form-control`
                  }
                  id="basic-icon-default-fullname"
                  name="firstname"
                  value={data.firstname || ""}
                  placeholder="John"
                  aria-label="John"
                  aria-describedby="basic-icon-default-fullname2"
                  onChange={handleInput}
                />
              </div>
              {submitted && !data.firstname && (
                <label class="error" for="basic-icon-default-fullname">
                  Firstname is required
                </label>
              )}
            </div>
            <div class="mb-3">
              <label class="form-label" for="basic-icon-default-fullname">
                Last Name <span className="error">*</span>{" "}
              </label>
              <div class="input-group input-group-merge">
                <span
                  id="basic-icon-default-fullname2"
                  className={
                    submitted && !data.lastname
                      ? `input-group-text invalid `
                      : `input-group-text`
                  }
                >
                  <i class="bx bx-user"></i>
                </span>
                <input
                  type="text"
                  className={
                    submitted && !data.lastname
                      ? `form-control invalid `
                      : `form-control`
                  }
                  id="basic-icon-default-fullname"
                  name="lastname"
                  value={data.lastname || ""}
                  placeholder="Doe"
                  aria-label="Doe"
                  aria-describedby="basic-icon-default-fullname2"
                  onChange={handleInput}
                />
              </div>
              {submitted && !data.lastname && (
                <label class="error" for="basic-icon-default-fullname">
                  Lastname is required
                </label>
              )}
            </div>
            <div class="mb-3">
              <label class="form-label" for="basic-icon-default-address">
                City <span className="error">*</span>
              </label>
              <div class="input-group input-group-merge">
                <span
                  id="basic-icon-default-address"
                  className={
                    submitted && !data.city
                      ? `input-group-text invalid `
                      : `input-group-text`
                  }
                >
                  <i class="bx bx-buildings"></i>
                </span>
                <input
                  type="text"
                  className={
                    submitted && !data.city
                      ? `form-control invalid `
                      : `form-control`
                  }
                  id="basic-icon-default-address"
                  name="city"
                  value={data.city || ""}
                  placeholder="City"
                  aria-label="City"
                  aria-describedby="basic-icon-default-fullname2"
                  onChange={handleInput}
                />
              </div>
              {submitted && !data.city && (
                <label class="error" for="basic-icon-default-fullname">
                  Enter City
                </label>
              )}
            </div>
            <div class="mb-3">
              <label class="form-label" for="basic-icon-default-address">
              Province <span className="error">*</span>
              </label>
              <div class="input-group input-group-merge">
                <span
                  id="basic-icon-default-address"
                  className={
                    submitted && !data.province
                      ? `input-group-text invalid `
                      : `input-group-text`
                  }
                >
                  <i class="bx bx-buildings"></i>
                </span>
                <input
                  type="text"
                  className={
                    submitted && !data.province
                      ? `form-control invalid `
                      : `form-control`
                  }
                  id="basic-icon-default-address"
                  name="province"
                  value={data.province || ""}
                  placeholder="..."
                  aria-label="..."
                  aria-describedby="basic-icon-default-fullname2"
                  onChange={handleInput}
                />
              </div>
              {submitted && !data.province && (
                <label class="error" for="basic-icon-default-fullname">
                  Enter Province
                </label>
              )}
            </div>
            <div class="mb-3">
              <label class="form-label" for="basic-icon-default-address">
                Country <span className="error">*</span>
              </label>
              <div class="input-group input-group-merge">
                <span
                  id="basic-icon-default-address"
                  className={
                    submitted && !data.country
                      ? `input-group-text invalid `
                      : `input-group-text`
                  }
                >
                  <i class="bx bx-buildings"></i>
                </span>
                <input
                  type="text"
                  className={
                    submitted && !data.country
                      ? `form-control invalid `
                      : `form-control`
                  }
                  id="basic-icon-default-address"
                  name="country"
                  value={data.country || ""}
                  placeholder="India"
                  aria-label="India"
                  aria-describedby="basic-icon-default-fullname2"
                  onChange={handleInput}
                />
              </div>
              {submitted && !data.country && (
                <label class="error" for="basic-icon-default-fullname">
                  Enter Country
                </label>
              )}
            </div>
            <div class="mb-3">
              <label class="form-label" for="basic-icon-default-fullname">
                Order Name <span className="error">*</span>{" "}
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
                  placeholder="..."
                  aria-label="..."
                  aria-describedby="basic-icon-default-fullname2"
                  onChange={handleInput}
                />
              </div>
              {submitted && !data.orderName && (
                <label class="error" for="basic-icon-default-fullname">
                  Ordername is required
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
                  placeholder="..."
                  aria-label="..."
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
              <label class="form-label" for="basic-icon-default-email">
                Email <span className="error">*</span>
              </label>
              <div class="input-group input-group-merge">
                <span
                  id="basic-icon-default-email"
                  className={
                    submitted && !data.email || submitted && !validateEmail(data.email)
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
                  placeholder="john@gmail.com"
                  aria-label="john@gmail.com"
                  aria-describedby="basic-icon-default-fullname2"
                  onChange={handleInput}
                />
              </div>
              {submitted && !data.email && (
                <label class="error" for="basic-icon-default-fullname">
                  Provide Email
                </label>
              ) || submitted && !validateEmail(data.email) && (
                <label class="error" for="basic-icon-default-fullname">
                  Provide Valid Email
                </label>
              ) }
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
                  Desing is required
                </label>
              )}
            </div>
            <div class="mb-3">
              <label class="form-label" for="basic-icon-default-desing">
                Quantity <span className="error">*</span>
              </label>
              <div class="input-group input-group-merge">
                <span
                  id="basic-icon-default-desing"
                  className={
                    submitted && !data.quantity
                      ? `input-group-text invalid `
                      : `input-group-text`
                  }
                >
                  <i class="bx bx-card"></i>
                </span>
                <input
                  type="text"
                  className={
                    submitted && !data.quantity
                      ? `form-control invalid `
                      : `form-control`
                  }
                  id="basic-icon-default-quantity"
                  name="quantity"
                  value={data.quantity || ""}
                  placeholder="..."
                  aria-label="..."
                  aria-describedby="basic-icon-default-fullname2"
                  onChange={handleInput}
                />
              </div>
              {submitted && !data.quantity && (
                <label class="error" for="basic-icon-default-fullname">
                Quantity is required
                </label>
              )}
            </div>
            <div class="mb-3">
              <label class="form-label" for="basic-icon-default-desing">
                Price <span className="error">*</span>
              </label>
              <div class="input-group input-group-merge">
                <span
                  id="basic-icon-default-desing"
                  className={
                    submitted && !data.price
                      ? `input-group-text invalid `
                      : `input-group-text`
                  }
                >
                  <i class="bx bx-card"></i>
                </span>
                <input
                  type="text"
                  className={
                    submitted && !data.price
                      ? `form-control invalid `
                      : `form-control`
                  }
                  id="basic-icon-default-quantity"
                  name="price"
                  value={data.price || ""}
                  placeholder="..."
                  aria-label="..."
                  aria-describedby="basic-icon-default-fullname2"
                  onChange={handleInput}
                />
              </div>
              {submitted && !data.price && (
                <label class="error" for="basic-icon-default-fullname">
                Price is required
                </label>
              )}
            </div>

            <div class="mb-3">
              <label for="formFile" class="form-label">
                photo Upload
              </label>
              <input 
               className={`form-control`} 
                name='image'
                type="file" 
                id="image" 
                accept="/image/*"
                placeholder="image"
                onChange={handleFileSelect} />
            </div>

            <div class="mb-3">
              <label class="form-label" for="basic-icon-default-description">
                Note
              </label>
              <div class="input-group input-group-merge">
                <span id="basic-icon-default-description" class="input-group-text">
                  <i class="bx bx-comment"></i>
                </span>
                <textarea
                  id="basic-icon-default-description"
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
            <div class="mb-3">
              <label class="form-label" for="basic-icon-default-description">
                Status
              </label>
              <div class="input-group input-group-merge">
                <span id="basic-icon-default-description" class="input-group-text">
                  <i class="bx bx-comment"></i>
                </span>
                <textarea
                  id="basic-icon-default-description"
                  name="status"
                  value={data.status || ""}
                  class="form-control"
                  placeholder="status"
                  aria-label="status"
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
